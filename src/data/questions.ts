/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, MathQuestion, ClassLevel } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "number_system",
    name: "NUMBER AND NUMERIC SYSTEM",
    classLevel: 5,
    description: "Discover prime/composite numbers, place values, equivalent fractions, and decimal comparisons.",
    color: "from-emerald-500 to-teal-600",
    skills: ["Primes vs Composites", "Place Values", "Equivalent Fractions", "Comparing Decimals"]
  },
  {
    id: "simplification",
    name: "SIMPLIFICATION OF NUMERICAL EXPRESSIONS",
    classLevel: 5,
    description: "Simplify arithmetic expressions containing brackets and multiple operators using BODMAS / PEMDAS rules.",
    color: "from-violet-500 to-indigo-600",
    skills: ["Simple Brackets", "Multi-Operator Order", "BODMAS Step-by-Step", "Multiplication & Division"]
  },
  {
    id: "ratio",
    name: "RATIO",
    classLevel: 5,
    description: "Compare groups of items, discover proportions, and master the unitary recipe method.",
    color: "from-pink-500 to-rose-500",
    skills: ["Simplifying Ratios", "Proportion Checks", "Unitary Recipe Method", "Equivalent Comparisons"]
  },
  {
    id: "average",
    name: "AVERAGE",
    classLevel: 5,
    description: "Understand central tendencies and compute the average/mean value for various quantities.",
    color: "from-amber-500 to-orange-600",
    skills: ["Calculating Mean", "Sum of Data Series", "Average from Total Sum", "Average Word Problems"]
  },
  {
    id: "profit_loss",
    name: "PROFIT AND LOSS",
    classLevel: 6,
    description: "Master financial math logic. Compute Profit, Loss, Cost Price, Selling Price and percentages.",
    color: "from-fuchsia-500 to-rose-600",
    skills: ["Selling Price vs Cost Price", "Calculating Profit & Loss", "Profit / Loss Percentages"]
  },
  {
    id: "area_perimeter",
    name: "AREA AND PERIMETER",
    classLevel: 6,
    description: "Measure boundaries and regions. Calculate perimeters and areas of rectangles and squares.",
    color: "from-cyan-500 to-sky-600",
    skills: ["Perimeter Paths", "Rectangular Areas", "Square Floor Areas", "Composite Boundary Walks"]
  },
  {
    id: "measurements",
    name: "MEASUREMENTS",
    classLevel: 6,
    description: "Convert units of length, mass, and capacity. Compute weights, volumes, and distances.",
    color: "from-blue-500 to-teal-600",
    skills: ["Length (km/m/cm)", "Weight (kg/g/mg)", "Capacity (L/mL)", "Measurement Converts"]
  },
  {
    id: "data_analysis",
    name: "DATA ANALYSIS",
    classLevel: 6,
    description: "Examine datasets, interpret bar graphs, read tally charts, and solve frequency puzzles.",
    color: "from-indigo-600 to-purple-600",
    skills: ["Tally Counts", "Bar Graph Reading", "Comparing Frequencies", "Frequency Interpretation"]
  }
];

// Helper to check prime
function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Find GCF / HCF
function findHCF(a: number, b: number): number {
  let tempA = a;
  let tempB = b;
  while (tempB !== 0) {
    const temp = tempB;
    tempB = tempA % tempB;
    tempA = temp;
  }
  return tempA;
}

// Get factors of a number
function getFactors(num: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) factors.push(i);
  }
  return factors;
}

// Procedural generator to create endless questions for all 8 syllabus chapters
export function generateQuestion(chapterId: string, level: "easy" | "medium" | "hard", classLevel: ClassLevel): MathQuestion {
  const rand = Math.random();
  const id = `q_${chapterId}_${classLevel}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  switch (chapterId) {
    case "number_system": {
      // 1. Prime vs Composite, 2. Simplifying Fractions, 3. Comparing Decimals
      if (rand < 0.33) {
        // Prime vs Composite Question
        const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32];
        const askPrime = Math.random() > 0.5;

        if (askPrime) {
          const correct = primes[Math.floor(Math.random() * primes.length)];
          const wrongs: number[] = [];
          while (wrongs.length < 3) {
            const temp = composites[Math.floor(Math.random() * composites.length)];
            if (!wrongs.includes(temp)) wrongs.push(temp);
          }
          const options = [...wrongs, correct].sort(() => Math.random() - 0.5).map(String);
          return {
            id,
            chapterId,
            classLevel,
            questionText: `Which of the following belongs to the "Prime Number" family (has exactly 2 factors: 1 and itself)?`,
            type: "choice",
            options,
            correctAnswer: String(correct),
            hint: "Prime numbers cannot be divided evenly by other numbers like 2, 3, or 5.",
            explanation: `Let's inspect the factors of each number:\n` +
              options.map(o => {
                const num = parseInt(o);
                const facts = getFactors(num);
                return `• **${num}** has factors: ${facts.join(", ")} (${facts.length} factors) - ${isPrime(num) ? "PRIME" : "COMPOSITE"}.`;
              }).join("\n") + `\n\nTherefore, **${correct}** is a Prime Number because it only has factors 1 and itself.`,
            visualType: "factor_tree",
            visualData: { number: correct, isPrime: true }
          };
        } else {
          const correct = composites[Math.floor(Math.random() * composites.length)];
          const wrongs: number[] = [];
          while (wrongs.length < 3) {
            const temp = primes[Math.floor(Math.random() * primes.length)];
            if (!wrongs.includes(temp)) wrongs.push(temp);
          }
          const options = [...wrongs, correct].sort(() => Math.random() - 0.5).map(String);
          return {
            id,
            chapterId,
            classLevel,
            questionText: `Which of the following is a "Composite Number" (has more than 2 factors, meaning it can be split into smaller groups)?`,
            type: "choice",
            options,
            correctAnswer: String(correct),
            hint: "A composite number is divisible by numbers other than 1 and itself.",
            explanation: `Let's break down each option and count their factors:\n` +
              options.map(o => {
                const num = parseInt(o);
                const facts = getFactors(num);
                return `• **${num}** has factors: ${facts.join(", ")} (${facts.length} factors).`;
              }).join("\n") + `\n\nSince **${correct}** has more than 2 factors, it is a Composite Number!`,
            visualType: "factor_tree",
            visualData: { number: correct, isPrime: false }
          };
        }
      } else if (rand < 0.66) {
        // Fraction Simplest Form
        const fractions = [
          { num: 4, den: 8, rNum: 1, rDen: 2 },
          { num: 6, den: 9, rNum: 2, rDen: 3 },
          { num: 10, den: 15, rNum: 2, rDen: 3 },
          { num: 8, den: 12, rNum: 2, rDen: 3 },
          { num: 9, den: 12, rNum: 3, rDen: 4 },
          { num: 5, den: 20, rNum: 1, rDen: 4 },
          { num: 12, den: 16, rNum: 3, rDen: 4 }
        ];
        const item = fractions[Math.floor(Math.random() * fractions.length)];
        const correct = `${item.rNum}/${item.rDen}`;
        const wr1 = `${item.rNum + 1}/${item.rDen}`;
        const wr2 = `${item.rNum}/${item.rDen + 1}`;
        const wr3 = `${item.num - 1}/${item.den}`;
        const options = Array.from(new Set([wr1, wr2, wr3, correct])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Simplify the fraction **${item.num}/${item.den}** to its simplest form by dividing both the top and bottom by their HCF.`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Find the Largest common factor of the numerator and denominator and divide both by it.",
          explanation: `Let's simplify **${item.num}/${item.den}**:\n\n` +
            `1. Factors of numerator ${item.num}: ${getFactors(item.num).join(", ")}\n` +
            `2. Factors of denominator ${item.den}: ${getFactors(item.den).join(", ")}\n` +
            `3. Their Highest Common Factor (HCF) is **${findHCF(item.num, item.den)}**.\n\n` +
            `Divide the top and bottom by ${findHCF(item.num, item.den)}:\n` +
            `• ${item.num} ÷ ${findHCF(item.num, item.den)} = ${item.rNum}\n` +
            `• ${item.den} ÷ ${findHCF(item.num, item.den)} = ${item.rDen}\n\n` +
            `So, the simplest form is **${correct}**!`,
          visualType: "fraction_pizza",
          visualData: { numerator: item.num, denominator: item.den, simplifiedNumerator: item.rNum, simplifiedDenominator: item.rDen }
        };
      } else {
        // Decimal Comparison
        const sets = [
          { val1: 0.45, val2: 0.5, desc: "0.50 is greater than 0.45 because 50 hundredths is more than 45 hundredths!" },
          { val1: 0.72, val2: 0.7, desc: "0.72 is greater because 72 hundredths is more than 70 hundredths!" },
          { val1: 0.09, val2: 0.1, desc: "0.10 is greater than 0.09 because 10 hundredths is more than 9 hundredths!" },
          { val1: 0.3, val2: 0.28, desc: "0.30 is greater because 30 hundredths is more than 28 hundredths!" }
        ];
        const item = sets[Math.floor(Math.random() * sets.length)];
        const correct = item.val1 > item.val2 ? ">" : "<";
        const options = [">", "<", "="];

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Which symbol makes this mathematical comparison statement true? \n\n **${item.val1}  ____  ${item.val2}**`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Prefix or suffix zeroes to match decimal places! Compare 0.30 and 0.28 directly.",
          explanation: `Let's line up the decimals using trailing zeros to compare their values:\n\n` +
            `• Number A: **${item.val1.toFixed(2)}** (${Math.round(item.val1 * 100)} hundredths)\n` +
            `• Number B: **${item.val2.toFixed(2)}** (${Math.round(item.val2 * 100)} hundredths)\n\n` +
            `Comparing them: ${item.desc}. Thus, the statement is **${item.val1} ${correct} ${item.val2}**!`,
          visualType: "place_value",
          visualData: { valA: item.val1, valB: item.val2 }
        };
      }
    }

    case "simplification": {
      // BODMAS rule expressions
      const sets = [
        { expr: "5 + 3 × 4", steps: "Multiply first: 3 × 4 = 12. Then add: 5 + 12 = 17.", ans: "17" },
        { expr: "24 ÷ (8 - 2)", steps: "Solve inside the brackets first: 8 - 2 = 6. Then divide: 24 ÷ 6 = 4.", ans: "4" },
        { expr: "10 - 4 ÷ 2 + 3", steps: "Divide first: 4 ÷ 2 = 2. Then perform subtraction and addition left-to-right: 10 - 2 + 3 = 8 + 3 = 11.", ans: "11" },
        { expr: "(6 + 4) × 5 - 12", steps: "Solve brackets first: 6 + 4 = 10. Then multiply: 10 × 5 = 50. Lastly subtract: 50 - 12 = 38.", ans: "38" },
        { expr: "15 - 3 × 4 + 2", steps: "Multiply first: 3 × 4 = 12. Then subtract and add left-to-right: 15 - 12 + 2 = 3 + 2 = 5.", ans: "5" }
      ];
      const item = sets[Math.floor(Math.random() * sets.length)];
      const correct = item.ans;
      const parsedAns = parseInt(correct);
      const options = [correct, String(parsedAns + 4), String(parsedAns - 2 || parsedAns + 8), String(parsedAns * 2 || 20)].filter((v, i, self) => self.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `Solve using the **BODMAS / PEMDAS** order of operations: \n\n What is the value of **${item.expr}**?`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: "Remember the priority levels: Brackets first, then Orders/Exponents, then Division & Multiplication (left-to-right), and finally Addition & Subtraction (left-to-right)!",
        explanation: `Let's break down the execution steps according to the **BODMAS** rules:\n\n` +
          `Expression: **${item.expr}**\n\n` +
          `${item.steps}\n\n` +
          `Hence, the final simplified value is **${correct}**!`,
        visualType: "balance_scale",
        visualData: { leftExpr: item.expr, rightExpr: correct }
      };
    }

    case "ratio": {
      // Comparison, simplification, and unitary method
      if (rand < 0.33) {
        // Simplify ratio
        const items = [
          { a: 12, b: 18, hcf: 6, rA: 2, rB: 3 },
          { a: 8, b: 20, hcf: 4, rA: 2, rB: 5 },
          { a: 15, b: 25, hcf: 5, rA: 3, rB: 5 },
          { a: 9, b: 27, hcf: 9, rA: 1, rB: 3 },
          { a: 14, b: 21, hcf: 7, rA: 2, rB: 3 }
        ];
        const item = items[Math.floor(Math.random() * items.length)];
        const correct = `${item.rA}:${item.rB}`;
        const wr1 = `${item.rB}:${item.rA}`;
        const wr2 = `${item.rA + 1}:${item.rB}`;
        const wr3 = `${item.a - 2}:${item.b - 2}`;
        const options = Array.from(new Set([correct, wr1, wr2, wr3])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Express the ratio of red counters to blue counters **${item.a} : ${item.b}** in its simplest form.`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Find the HCF of both quantities and divide them out just like narrowing down a fraction!",
          explanation: `Let's find the simplest ratio for **${item.a} : ${item.b}**:\n\n` +
            `1. Write as a fraction: $$\\frac{${item.a}}{${item.b}}$$\n` +
            `2. The Highest Common Factor (HCF) of ${item.a} and ${item.b} is **${item.hcf}**.\n` +
            `3. Divide both values by ${item.hcf}:\n` +
            `   • Red side: ${item.a} ÷ ${item.hcf} = ${item.rA}\n` +
            `   • Blue side: ${item.b} ÷ ${item.hcf} = ${item.rB}\n\n` +
            `Thus, the simplified ratio is **${correct}**!`,
          visualType: "ratio_grid",
          visualData: { leftCount: item.a, rightCount: item.b, leftSimp: item.rA, rightSimp: item.rB }
        };
      } else if (rand < 0.66) {
        // Unitary Method
        const recipes = [
          { items: 4, cost: 20, target: 6, targetCost: 30, noun: "notebooks" },
          { items: 3, cost: 15, target: 8, targetCost: 40, noun: "pens" },
          { items: 5, cost: 250, target: 7, targetCost: 350, noun: "toy kits" },
          { items: 6, cost: 12, target: 10, targetCost: 20, noun: "donuts" }
        ];
        const item = recipes[Math.floor(Math.random() * recipes.length)];
        const correct = String(item.targetCost);
        const options = [correct, String(item.targetCost + 10), String(item.targetCost - 5), String(item.cost * 2)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `If **${item.items} ${item.noun}** cost **$${item.cost}**, how much will **${item.target} ${item.noun}** cost using the unitary method?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "First find the cost of 1 notebook/pen by dividing. Then multiply that unit price by the target quantity!",
          explanation: `Let's do the Unitary Method calculation step-by-step:\n\n` +
            `• **Step 1**: Find the cost of ONE item (Unit Price):\n` +
            `  $$Cost\\text{ of 1 unit} = \\frac{\\$${item.cost}}{${item.items}} = \\$${item.cost / item.items} \\text{ each}$$\n\n` +
            `• **Step 2**: Multiply by the target amount **${item.target}**:\n` +
            `  $$Cost\\text{ of } ${item.target} \\text{ units} = \\$${item.cost / item.items} \\times ${item.target} = \\$${correct}$$\n\n` +
            `So, the total cost for ${item.target} ${item.noun} is **$${correct}**!`,
          visualType: "ratio_grid",
          visualData: { unitValue: item.cost / item.items, originalCount: item.items, targetCount: item.target }
        };
      } else {
        // Equivalence ratios (proportion)
        const proportions = [
          { label: "3:4 and 9:12", corr: "Yes", desc: "9:12 simplifies to 3:4 by dividing both elements by 3. They are equivalent!" },
          { label: "2:5 and 4:15", corr: "No", desc: "4:15 cannot be simplified further. 2:5 is not equal to 4:15, so they are not equivalent." },
          { label: "1:3 and 5:15", corr: "Yes", desc: "5:15 simplifies to 1:3 by dividing both elements by 5. They are equivalent!" }
        ];
        const item = proportions[Math.floor(Math.random() * proportions.length)];
        const options = ["Yes", "No"];

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Are the ratios **${item.label}** equivalent (meaning they are in proportion)?`,
          type: "choice",
          options,
          correctAnswer: item.corr,
          hint: "Reduce the larger ratio by dividing. See if it becomes identical to the smaller ratio!",
          explanation: `Let's analyze the ratios:\n\n` +
            `Ratios to check: **${item.label}**\n\n` +
            `${item.desc}\n\nHence, the correct answer is **${item.corr}**!`,
          visualType: "ratio_grid",
          visualData: { label: item.label, isProportion: item.corr === "Yes" }
        };
      }
    }

    case "average": {
      // Calculating mean of values
      if (rand < 0.5) {
        // Average of three numbers
        const numbers = [
          { set: [10, 15, 20], sum: 45, count: 3, avg: 15 },
          { set: [8, 12, 16], sum: 36, count: 3, avg: 12 },
          { set: [5, 15, 25], sum: 45, count: 3, avg: 15 },
          { set: [20, 30, 40], sum: 90, count: 3, avg: 30 },
          { set: [12, 14, 16], sum: 42, count: 3, avg: 14 }
        ];
        const item = numbers[Math.floor(Math.random() * numbers.length)];
        const correct = String(item.avg);
        const options = [correct, String(item.avg + 4), String(item.avg - 3), String(item.sum)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Solve for the central average: What is the **Average** of the following list of numbers: **${item.set.join(", ")}**?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Sum all the numbers together, and then divide that total sum by the count of numbers (which is 3)!",
          explanation: `Let's compute the mathematical Average (Mean) of the numbers:\n\n` +
            `1. **Sum up all the numbers**:\n` +
            `   $$Sum = ${item.set.join(" + ")} = ${item.sum}$$\n\n` +
            `2. **Divide the Sum by Count** (3):\n` +
            `   $$Average = \\frac{\\text{Total Sum}}{\\text{Total Count}} = \\frac{${item.sum}}{3} = ${correct}$$\n\n` +
            `Thus, the Average is exactly **${correct}**!`,
          visualType: "number_line",
          visualData: { activeValue: item.avg, start: Math.min(...item.set) - 2, jump: 2, result: item.avg }
        };
      } else {
        // Sum given find average / word problem
        const wordProblems = [
          { text: "A young baker made 4 cakes. The total weight of all 4 cakes is 16 kg. What is the average weight of a cake?", sum: 16, count: 4, avg: 4, label: "kg" },
          { text: "A cricket player scores a total of 150 runs in 5 matches. What is his average runs per match?", sum: 150, count: 5, avg: 30, label: "runs" },
          { text: "Leo reads for a total of 90 minutes over 3 days. What is the average minutes he read per day?", sum: 90, count: 3, avg: 30, label: "minutes" }
        ];
        const item = wordProblems[Math.floor(Math.random() * wordProblems.length)];
        const correct = String(item.avg);
        const options = [correct, String(item.avg + 5), String(item.avg - 2), String(item.sum / 2)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `${item.text}`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Average = (Total Sum) ÷ (Number of Items/Days). Directly divide the given total by the count!",
          explanation: `Let's solve this Average word problem:\n\n` +
            `• Sum / Total accumulated = **${item.sum}**\n` +
            `• Count of units / items = **${item.count}**\n\n` +
            `Applying the Average equation:\n` +
            `  $$Average = \\frac{Total}{Count} = \\frac{${item.sum}}{${item.count}} = ${correct} \\text{ ${item.label}}$$\n\n` +
            `So, the average is **${correct} ${item.label}**!`,
          visualType: "balance_scale",
          visualData: { leftExpr: `${item.sum} ÷ ${item.count}`, rightExpr: correct }
        };
      }
    }

    case "profit_loss": {
      // Cost price vs Selling price
      const isProfit = Math.random() > 0.5;
      if (isProfit) {
        const cp = Math.floor(Math.random() * 5 + 3) * 10; // 30-70
        const gain = Math.floor(Math.random() * 3 + 1) * 5; // 5-15
        const sp = cp + gain;
        const askPct = Math.random() > 0.5;

        if (askPct) {
          // Profit percentage = (gain/cp) * 100
          // make clean factors: e.g. cp = 50, gain = 10 (20%) or cp = 40, gain = 10 (25%)
          const cleanCp = 50;
          const cleanGain = 10;
          const pct = 20;
          const options = [String(pct) + "%", "15%", "25%", "10%"].sort(() => Math.random() - 0.5);

          return {
            id,
            chapterId,
            classLevel,
            questionText: `A shopkeeper buys an educational board game for **$${cleanCp}** (Cost Price). He sells it for **$${cleanCp + cleanGain}** (Selling Price). What is his **Profit Percentage**?`,
            type: "choice",
            options,
            correctAnswer: String(pct) + "%",
            hint: "Profit % = (Profit ÷ Cost Price) × 100%. Don't divide by Selling Price!",
            explanation: `Let's compute the financial profit percentage:\n\n` +
              `1. **Find Profit**: \n` +
              `   $$Profit = SP - CP = \\$${cleanCp + cleanGain} - \\$${cleanCp} = \\$${cleanGain}$$\n\n` +
              `2. **Find Profit Percentage**:\n` +
              `   $$Profit\\% = \\left( \\frac{\\text{Profit}}{\\text{Cost Price}} \\right) \\times 100\\%$$\n` +
              `   $$Profit\\% = \\left( \\frac{${cleanGain}}{${cleanCp}} \\right) \\times 100\\% = 0.20 \\times 100\\% = ${pct}\\%$$\n\n` +
              `So, the shopkeeper made a **${pct}% Profit**!`,
            visualType: "balance_scale",
            visualData: { leftExpr: `(10 ÷ 50) × 100`, rightExpr: "20" }
          };
        } else {
          const correct = String(gain);
          const options = [correct, String(gain + 5), String(gain + 10), String(sp)].sort(() => Math.random() - 0.5);

          return {
            id,
            chapterId,
            classLevel,
            questionText: `Mia buys a box of chalks for **$${cp}** and sells it to her classmate for **$${sp}**. Calculate the exact **Profit** she made.`,
            type: "choice",
            options,
            correctAnswer: correct,
            hint: "Since Selling Price ($" + sp + ") is higher than Cost Price ($" + cp + "), subtract Cost Price from Selling Price to find the Gain!",
            explanation: `Let's check the financial formula for Profit:\n\n` +
              `• Cost Price (CP) = **$${cp}**\n` +
              `• Selling Price (SP) = **$${sp}**\n\n` +
              `Since SP is greater than CP, we have a profit:\n` +
              `  $$Profit = SP - CP = \\$${sp} - \\$${cp} = \\$${correct}$$\n\n` +
              `Therefore, Mia made a profit of **$${correct}**!`,
            visualType: "balance_scale",
            visualData: { leftExpr: `${sp} - ${cp}`, rightExpr: correct }
          };
        }
      } else {
        // Loss calculating
        const cp = Math.floor(Math.random() * 5 + 4) * 10; // 40-80
        const lossAmt = Math.floor(Math.random() * 3 + 1) * 5; // 5-15
        const sp = cp - lossAmt;
        const correct = String(lossAmt);
        const options = [correct, String(lossAmt + 5), String(lossAmt + 10), String(sp)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `A local bookstore bought journal notebooks containing maps for **$${cp}** each. Because the cover got slightly wet, they had to self-sell them at **$${sp}** each. What is the net financial **Loss** per notebook?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Since Cost Price ($" + cp + ") is higher than the Selling Price ($" + sp + "), a Loss is incurred. Subtract SP from CP!",
          explanation: `Let's calculate the financial loss amount:\n\n` +
            `• Cost Price (CP) = **$${cp}**\n` +
            `• Selling Price (SP) = **$${sp}**\n\n` +
            `Since CP > SP, a Loss occurred:\n` +
            `  $$Loss = CP - SP = \\$${cp} - \\$${sp} = \\$${correct}$$\n\n` +
            `Thus, they incurred a loss of **$${correct}** on each journal notebook.`,
          visualType: "balance_scale",
          visualData: { leftExpr: `${cp} - ${sp}`, rightExpr: correct }
        };
      }
    }

    case "area_perimeter": {
      // Rectangle or square boundaries or tiles
      const isArea = Math.random() > 0.5;
      const l = Math.floor(Math.random() * 5) + 6; // 6-10
      const w = Math.floor(Math.random() * 4) + 3; // 3-6
      const ans = isArea ? l * w : 2 * (l + w);
      const correct = String(ans);
      const label = isArea ? "sq cm" : "cm";
      const options = [
        correct,
        String(isArea ? 2 * (l + w) : l * w), // inverted formula
        String(ans + 6),
        String(ans - 2)
      ].filter((v, i, self) => self.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `Calculate the **${isArea ? "Area (total flat space inside)" : "Perimeter (total boundary distance around)"}** of a rectangular cardboard piece with length **${l} cm** and width **${w} cm**.`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: isArea ? "Area formula: Length × Width" : "Perimeter formula: 2 × (Length + Width) or add all 4 sides!",
        explanation: `Let's solve for the rectangle's boundary properties:\n\n` +
          `• Length = **${l} cm**, Width = **${w} cm**.\n\n` +
          `${isArea 
            ? `• **Area Formula**: $Area = Length \\times Width$\n  $$Area = ${l} \\times ${w} = ${ans}\\text{ sq cm}$$` 
            : `• **Perimeter Formula**: $Perimeter = 2 \\times (Length + Width)$\n  $$Perimeter = 2 \\times (${l} + ${w}) = 2 \\times ${l + w} = ${ans}\\text{ cm}$$`
          }\n\n` +
          `So, the rectangle's ${isArea ? "area is " : "perimeter is "} **${correct} ${label}**!`,
        visualType: "shape_geometry",
        visualData: { shape: "rectangle", length: l, width: w, label: isArea ? "Area" : "Perimeter" }
      };
    }

    case "measurements": {
      // Metric unit conversions: Length, weight, capacity
      const units = [
        { q: "How many meters are there in **4.5 kilometers**?", correct: "4500", rawVal: 4.5, factor: 1000, label: "meters", hint: "Multiply km by 1000 to convert to meters (since 1 km = 1000 meters)." },
        { q: "Convert **3 kilograms** into grams.", correct: "3000", rawVal: 3, factor: 1000, label: "grams", hint: "Multiply kg by 1000 to convert to grams (since 1 kg = 1000 grams)." },
        { q: "How many milliliters are in **5 Liters** of custom lemonade juice?", correct: "5000", rawVal: 5, factor: 1000, label: "milliliters", hint: "Multiply Liters by 1000 to convert to mL (since 1 Litre = 1000 mL)." },
        { q: "A ribbon is **250 centimeters** long. What is its length in meters?", correct: "2.5", rawVal: 250, factor: 0.01, label: "meters", hint: "Divide cm by 100 to get meters (since 100 cm = 1 meter)." }
      ];
      const item = units[Math.floor(Math.random() * units.length)];
      const correct = item.correct;
      const options = [correct, String(parseFloat(correct) * 10), String(parseFloat(correct) / 10), "100"].sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `${item.q}`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: item.hint,
        explanation: `Let's perform the unit conversion step-by-step:\n\n` +
          `• Original value: **${item.rawVal}**\n` +
          `• Conversion factor relation: ${item.hint}\n\n` +
          `${item.rawVal.toString().includes("km") || item.factor === 1000 
            ? `  $$${item.rawVal} \\times 1000 = ${correct} \\text{ ${item.label}}$$` 
            : `  $$${item.rawVal} \\div 100 = ${correct} \\text{ ${item.label}}$$`}\n\n` +
          `So, the answer is precisely **${correct} ${item.label}**!`,
        visualType: "balance_scale",
        visualData: { leftExpr: `${item.rawVal} combined units`, rightExpr: `${correct} ${item.label}` }
      };
    }

    case "data_analysis": {
      // Reading simple data bars / tally charts
      const dataSets = [
        { fruit: "Apples 🍎: ||||   Oranges 🍊: |||| |||", text: "Look at the tally marks. Apprentices logged Apples as 4 tallies and Oranges as 8 tallies. How many more Oranges are there than Apples?", correct: "4", steps: "Oranges count is 8. Apples count is 4. Difference is: 8 - 4 = 4." },
        { fruit: "Red Bus 🔴: 5 kids, Blue Bus 🔵: 9 kids", text: "If the Red Bus carries 5 students and the Blue Bus carries 9 students, what is the combined total of students in both buses?", correct: "14", steps: "Total = Red Bus + Blue Bus = 5 + 9 = 14 children." }
      ];
      const item = dataSets[Math.floor(Math.random() * dataSets.length)];
      const correct = item.correct;
      const options = [correct, "3", "5", "10", "12"].slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `Observe the mini dataset:\n\n **${item.fruit}**\n\nQuestion: **${item.text}**`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: "Counts items represented by tallies or descriptors and compare or sum them directly!",
        explanation: `Let's analyze the raw data to extract frequency logs:\n\n` +
          `• Dataset details:\n  ${item.fruit}\n\n` +
          `Calculations: ${item.steps}\n\n` +
          `Hence, the correct output is **${correct}**!`,
        visualType: "ratio_grid",
        visualData: { leftCount: 5, rightCount: 9 }
      };
    }

    default:
      throw new Error(`Invalid chapterId: ${chapterId}`);
  }
}

// Global list of achievements/badges
export const ACHIEVEMENTS = [
  {
    id: "apprentice",
    title: "Math Apprentice",
    description: "Welcome to the academy! Complete your first question.",
    iconName: "Compass",
    colorClass: "bg-stone-100 text-stone-800 border-stone-200",
    xpThreshold: 50
  },
  {
    id: "number_master",
    title: "Number Champion",
    description: "Earn 150 XP playing Number and Numeric System.",
    iconName: "ShieldAlert",
    colorClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    xpThreshold: 150
  },
  {
    id: "ratio_master",
    title: "Ratio Master",
    description: "Master Ratio chapters by clearing multiple unitary recipes.",
    iconName: "PieChart",
    colorClass: "bg-orange-50 text-orange-800 border-orange-200",
    xpThreshold: 300
  },
  {
    id: "average_master",
    title: "Average Guru",
    description: "Successfully calculate multiple stats averages correctly.",
    iconName: "Eye",
    colorClass: "bg-blue-50 text-blue-800 border-blue-200",
    xpThreshold: 500
  },
  {
    id: "profit_loss_master",
    title: "Profit Pioneer",
    description: "Solve business shopkeeper percentages perfectly.",
    iconName: "Scale",
    colorClass: "bg-violet-50 text-violet-800 border-violet-200",
    xpThreshold: 750
  },
  {
    id: "math_genius",
    title: "Math Prodigy",
    description: "Reach elite levels (1000+ XP) of excellence!",
    iconName: "Award",
    colorClass: "bg-yellow-50 text-yellow-800 border-yellow-200",
    xpThreshold: 1000
  }
];

// Calculate player level based on cumulative XP
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

// Get title based on Level
export function getLevelTitle(level: number): string {
  if (level <= 1) return "Novice Thinker";
  if (level === 2) return "Number Explorer";
  if (level === 3) return "Equation Climber";
  if (level === 4) return "Shape Navigator";
  if (level === 5) return "Ratio Ranger";
  if (level === 6) return "Theorem Captain";
  return "Grand Mathematician";
}

