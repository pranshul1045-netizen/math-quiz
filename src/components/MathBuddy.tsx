/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, HelpCircle, AlertCircle, Loader2, Award } from "lucide-react";
import { ChatMessage, ClassLevel } from "../types";

interface MathBuddyProps {
  currentQuestion?: {
    questionText: string;
    correctAnswer: string;
    explanation: string;
    studentAnswer?: string;
    isCorrect?: boolean;
    isAnswered?: boolean;
  } | null;
  chapterName?: string;
  classLevel?: ClassLevel;
  isOpen: boolean;
  onToggle: () => void;
  onAskEulerQuestion?: string | null;
  onAsked?: () => void;
}

export default function MathBuddy({
  currentQuestion,
  chapterName,
  classLevel,
  isOpen,
  onToggle,
  onAskEulerQuestion,
  onAsked,
}: MathBuddyProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load welcome message once
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "Hoot! Hello there, young wizard! 🦉 I am Socrates, your friendly math owl coach. If any puzzle feels tricky, or if you want to explore equivalent fractions, factors, or integers, just ask me! We'll solve it using pizza slices, balance scales, or sliding stairs!",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Handle triggered questions from external actions (e.g. clicking "Explain this to me")
  useEffect(() => {
    if (onAskEulerQuestion) {
      handleSend(onAskEulerQuestion);
      if (onAsked) onAsked();
    }
  }, [onAskEulerQuestion]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    if (!customText) {
      setInputText("");
    }

    setApiError(null);

    // Save user message
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build previous history (sliced to last 10 messages to save token count)
      const chatHistory = messages
        .filter(m => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      // Gather current math problem context
      const context = currentQuestion && chapterName ? {
        classLevel,
        chapterName,
        questionText: currentQuestion.questionText,
        correctAnswer: currentQuestion.correctAnswer,
        studentAnswer: currentQuestion.studentAnswer,
        isCorrect: currentQuestion.isCorrect,
        isAnswered: currentQuestion.isAnswered,
        explanation: currentQuestion.explanation,
      } : null;

      const response = await fetch("/api/math-coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error("Socrates is offline taking a short nap. Try again in a tick!");
      }

      const data = await response.json();
      
      const modelMsg: ChatMessage = {
        id: `mod_${Date.now()}`,
        role: "model",
        text: data.text || "I was thinking, but my mind wandered to tasty berries! Could you ask that again?",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Math Buddy service failure:", err);
      setApiError(err.message || "Oops! Socket hoot timed out.");
    } finally {
      setIsLoading(false);
    }
  };

  // Simple parser to structure bold `**` and items safely
  const formatTextAsHtml = (text: string) => {
    // Escape standard angles to prevent browser rendering them as HTML tags
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Convert bold blocks **bold**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "<strong class='font-bold text-stone-900'>$1</strong>");

    // Convert equations or numbers $7$ or $x$
    formatted = formatted.replace(/\$([^$]+)\$/g, "<code class='bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold text-xs'>$1</code>");

    // Convert bullet points
    formatted = formatted.replace(/•\s*([^\n]+)/g, "<li class='ml-3 list-disc pl-1 text-[13px] text-stone-700 font-sans my-1'>$1</li>");

    // Line breaks
    return formatted.split("\n").map((line, idx) => {
      if (line.includes("class='ml-3")) return <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />;
      return <p key={idx} className="my-1 leading-relaxed text-[13px]" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="math-buddy-toggle-button"
        onClick={onToggle}
        className="fixed bottom-4 left-4 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4 shadow-xl hover:from-blue-700 hover:to-indigo-700 transition duration-150 flex items-center gap-2 border-4 border-white cursor-pointer group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="font-sans font-bold text-sm pr-1 hidden sm:inline">Ask Coach Socrates</span>
        {currentQuestion && !currentQuestion.isCorrect && currentQuestion.isAnswered && (
          <span className="absolute -top-1.5 -right-1.5 w-5.5 h-5.5 bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full animate-bounce">
            !
          </span>
        )}
      </button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="math-buddy-panel-wrapper"
            initial={{ opacity: 0, scale: 0.9, y: 100, x: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100, x: -50 }}
            className="fixed bottom-22 left-4 w-[360px] max-w-[calc(100vw-32px)] h-[520px] bg-white rounded-2xl shadow-2xl border-4 border-blue-100 flex flex-col overflow-hidden z-50 shadow-blue-950/20"
          >
            {/* Owl Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3.5 flex items-center justify-between border-b-2 border-indigo-700">
              <div className="flex items-center gap-2.5">
                {/* Custom SVG Cute Owl Avatar */}
                <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center border-2 border-amber-300">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Owl Body */}
                    <ellipse cx="50" cy="55" rx="35" ry="32" fill="#5c6bc0" />
                    <ellipse cx="50" cy="55" rx="27" ry="25" fill="#9fa8da" />
                    {/* Eyeballs */}
                    <circle cx="35" cy="40" r="14" fill="#ffffff" />
                    <circle cx="65" cy="40" r="14" fill="#ffffff" />
                    <circle cx="35" cy="40" r="7" fill="#121212" />
                    <circle cx="65" cy="40" r="7" fill="#121212" />
                    {/* Beak */}
                    <polygon points="50,45 44,57 56,57" fill="#ffa726" />
                    {/* Tiny Owl Horns */}
                    <polygon points="20,28 30,15 35,25" fill="#3f51b5" />
                    <polygon points="80,28 70,15 65,25" fill="#3f51b5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-[15px] tracking-tight leading-none">Coach Socrates</h3>
                  <span className="text-[10px] text-blue-100 font-sans font-medium">Your Math Owl Buddy • Active</span>
                </div>
              </div>
              <button
                id="btn-close-math-buddy"
                onClick={onToggle}
                className="hover:bg-blue-600/50 p-1.5 rounded-lg text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Context Strip */}
            {currentQuestion && (
              <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <HelpCircle size={13} className="text-amber-600 flex-shrink-0" />
                  <p className="text-[11px] text-amber-800 truncate font-sans font-medium">
                    Question: "{currentQuestion.questionText}"
                  </p>
                </div>
                {currentQuestion.isAnswered && !currentQuestion.isCorrect && (
                  <button
                    id="btn-buddy-auto-ask"
                    onClick={() => handleSend("Can you explain why I got this question wrong and show me the pizza slices/scale rules?")}
                    className="flex-shrink-0 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm transition"
                  >
                    Auto Ask Euler!
                  </button>
                )}
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 p-3.5 overflow-y-auto bg-stone-50 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm text-stone-800 ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white border border-stone-200 rounded-bl-none font-medium text-[13px]"
                    }`}
                  >
                    {m.role === "user" ? (
                      <p className="text-[13px] leading-relaxed font-sans font-medium">{m.text}</p>
                    ) : (
                      <div className="space-y-1 font-sans">{formatTextAsHtml(m.text)}</div>
                    )}
                    <span
                      className={`block text-[8px] mt-1.5 text-right ${
                        m.role === "user" ? "text-blue-200" : "text-stone-400"
                      }`}
                    >
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-150 rounded-2xl p-3 shadow-sm rounded-bl-none flex items-center gap-2">
                    <Loader2 size={14} className="text-blue-500 animate-spin" />
                    <span className="text-[11px] text-stone-500 font-sans font-bold">Socrates is calculating...</span>
                  </div>
                </div>
              )}

              {apiError && (
                <div className="mx-2 p-2.5 bg-rose-50 border border-rose-150 rounded-xl flex items-center gap-2 text-rose-800">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <p className="text-[10px] font-medium leading-normal">{apiError}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Helper Suggestion */}
            <div className="p-1 px-3 bg-stone-100 border-t border-stone-200 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                id="buddy-suggest-1"
                onClick={() => handleSend("Explain with a funny story why fractions need common denominators!")}
                className="text-[10px] bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full px-2.5 py-1 text-center font-bold font-sans flex-shrink-0 cursor-pointer"
              >
                🍰 Slice story
              </button>
              <button
                id="buddy-suggest-2"
                onClick={() => handleSend("Show me values of negative integers, how can negative numbers be bigger?")}
                className="text-[10px] bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full px-2.5 py-1 text-center font-bold font-sans flex-shrink-0 cursor-pointer"
              >
                🏔️ Negative values
              </button>
              <button
                id="buddy-suggest-3"
                onClick={() => handleSend("Can you give me a simple math riddle to solve?")}
                className="text-[10px] bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full px-2.5 py-1 text-center font-bold font-sans flex-shrink-0 cursor-pointer"
              >
                🦉 Math riddle
              </button>
            </div>

            {/* Input Footer */}
            <div className="p-2 border-t border-stone-200 bg-white flex items-center gap-1.5">
              <input
                id="math-buddy-input-field"
                type="text"
                placeholder="Ask Socrates a math hoot..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-stone-200 bg-stone-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
              />
              <button
                id="btn-buddy-send"
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-blue-600 text-white rounded-xl p-2 hover:bg-blue-700 transition disabled:opacity-50 flex-shrink-0 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
