import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Lazy-initialized Gemini API client to prevent crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Math Buddy chatbot endpoint
  app.post("/api/math-coach/chat", async (req, res) => {
    try {
      const { message, history, context } = req.body;
      const ai = getAiClient();

      // Formulate a robust system instruction for general class 5 & 6 math students
      const systemInstruction = `You are "Socrates the Owl" (or "Pi-Bot"), a cheerful, kind, and extremely patient math companion for class 5 and class 6 school children (ages 9 to 12).
Your goal is to explain mathematics concepts intuitively, using engaging real-world analogies suitable for kids:
- Fractions: Pizza slices, birthday cakes, dividing chocolate bars.
- Decimals: Dividing dollar bills, cents, looking at tenths and hundredths of a meter.
- Factors and Multiples: Building blocks, arranging marching bands into rows of equal sizes.
- Integers: Stairs, elevators going below ground (basement is negative, ground levels positive), submarines under the sea.
- Algebra: A balanced play-ground seesaw or balance scale. To keep it level, you must do same operation on both sides!
- Geometry: Slices of pie (angles), walking the perimeter of a playground fence, or tiling a bedroom floor with square tiles (area).
- Ratio and Proportion: Mixing recipes (e.g., 2 cups of sugar for 3 cups of flour).

Never give raw, dry formulas directly without explaining the 'why' behind them in an exciting way. Keep sentences short, warm, and highly engaging. Use emojis appropriately (not excessively).
If the user provides a specific math question context (problem description, correct answer, student's answer), tailor your response to gently guide them to understand how to solve it step-by-step rather than just telling them the answer.
Remember, speak directly to the student. Be supportive, celebrate their work, and offer a mini practice riddle if they ask for one!`;

      // Structure contents from history
      const formattedContents = [];
      
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }],
          });
        }
      }

      // Add context inside the current prompt if available
      let promptText = message;
      if (context) {
        promptText = `[MATH MISSION CONTEXT]
Syllabus: Class ${context.classLevel}
Topic: ${context.chapterName}
Current Question being solved: "${context.questionText}"
Is it answered yet? ${context.isAnswered ? "Yes" : "No"}
Did the student get it correct? ${context.isAnswered ? (context.isCorrect ? "Yes" : "No, they picked '" + context.studentAnswer + "' instead of correct '" + context.correctAnswer + "'") : "Not answered yet"}
Explanatory breakdown: ${context.explanation || "N/A"}
[END OF CONTEXT]

User's message: ${message}`;
      }

      formattedContents.push({
        role: "user",
        parts: [{ text: promptText }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini math-coach API error:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred while consulting your math buddy.",
        isConfigError: !process.env.GEMINI_API_KEY 
      });
    }
  });

  // Serve Vite app in development vs production
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static dist assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Class 5 & 6 Math Game Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Initialization failure:", err);
});
