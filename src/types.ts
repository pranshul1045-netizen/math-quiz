/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ClassLevel = 5 | 6;

export interface Chapter {
  id: string;
  name: string;
  classLevel: ClassLevel;
  description: string;
  color: string;
  skills: string[];
}

export type QuestionType = "choice" | "input" | "true_false";

export interface MathQuestion {
  id: string;
  chapterId: string;
  classLevel: ClassLevel;
  questionText: string;
  type: QuestionType;
  options?: string[]; // for choice
  correctAnswer: string; // string-based for general match, e.g. "12", "A", "True"
  explanation: string; // Step-by-step breakdown
  hint: string; // Tiny visual or text clue
  visualType?: "fraction_pizza" | "number_line" | "balance_scale" | "place_value" | "shape_geometry" | "ratio_grid" | "factor_tree";
  visualData?: any; // any extra configuration needed for custom visual component
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string; // name of Lucide icon to render
  colorClass: string;
  xpThreshold: number;
}

export interface UserProgress {
  displayName: string;
  classLevel: ClassLevel;
  totalXp: number;
  level: number;
  completedChapters: string[]; // List of chapter IDs completed
  badgeIds: string[]; // List of unlocked badge IDs
  chapterScores: Record<string, { correct: number; total: number; xp: number }>;
  history: AttemptLog[];
}

export interface AttemptLog {
  timestamp: string;
  questionId: string;
  chapterId: string;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  xpEarned: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
