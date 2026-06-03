/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Chapter, MathQuestion, ClassLevel, UserProgress } from "../types";
import { generateQuestion, calculateLevel, getLevelTitle } from "../data/questions";
import VisualAids from "./VisualAids";
import { 
  ArrowRight, Sparkles, Award, Compass, HelpCircle, 
  Lightbulb, RotateCcw, Check, X, LogIn, ChevronRight, Play, Info
} from "lucide-react";

interface GameAreaProps {
  chapters: Chapter[];
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  activeChapterId: string | null;
  onSetActiveChapterId: (id: string | null) => void;
  onAskSocrates: (questionText: string, currentQuestion: any) => void;
}

export default function GameArea({
  chapters,
  progress,
  onUpdateProgress,
  activeChapterId,
  onSetActiveChapterId,
  onAskSocrates,
}: GameAreaProps) {
  // Gameplay States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<boolean[]>([]);
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);

  // Initialize questions when starting a chapter
  const startChapterMission = (chapterId: string, infinite = false) => {
    setIsInfiniteMode(infinite);
    const count = infinite ? 1 : 5; // sets of 5 for quests
    const initialQuestions: MathQuestion[] = [];
    
    // Generate questions
    for (let i = 0; i < count; i++) {
      const difficulty = i < 2 ? "easy" : i < 4 ? "medium" : "hard";
      initialQuestions.push(generateQuestion(chapterId, difficulty, progress.classLevel));
    }
    
    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setCorrectCount(0);
    setStreak(0);
    setScoreHistory([]);
    setIsPlaying(true);
    onSetActiveChapterId(chapterId);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (isAnswered || !selectedOption) return;

    const question = questions[currentQuestionIndex];
    const isAnsCorrect = selectedOption.trim() === question.correctAnswer.trim();
    
    setIsCorrect(isAnsCorrect);
    setIsAnswered(true);

    const xpForThisAttempt = isAnsCorrect ? (showHint ? 10 : 15) : 5;
    
    if (isAnsCorrect) {
      setStreak((s) => s + 1);
      setCorrectCount((c) => c + 1);
      setScoreHistory((h) => [...h, true]);
    } else {
      setStreak(0);
      setScoreHistory((h) => [...h, false]);
    }

    // Prepare updated progress state
    const attemptLog = {
      timestamp: new Date().toISOString(),
      questionId: question.id,
      chapterId: question.chapterId,
      questionText: question.questionText,
      studentAnswer: selectedOption,
      correctAnswer: question.correctAnswer,
      isCorrect: isAnsCorrect,
      xpEarned: xpForThisAttempt,
    };

    const chapterScoresCopy = { ...progress.chapterScores };
    const curChapterScore = chapterScoresCopy[question.chapterId] || { correct: 0, total: 0, xp: 0 };
    
    chapterScoresCopy[question.chapterId] = {
      correct: curChapterScore.correct + (isAnsCorrect ? 1 : 0),
      total: curChapterScore.total + 1,
      xp: curChapterScore.xp + xpForThisAttempt
    };

    const nextXp = progress.totalXp + xpForThisAttempt;
    const nextLevel = calculateLevel(nextXp);

    // Achievement triggers
    const badgeIdsUpdated = [...progress.badgeIds];
    if (nextXp >= 50 && !badgeIdsUpdated.includes("apprentice")) {
      badgeIdsUpdated.push("apprentice");
    }
    if (question.chapterId === "number_system" && chapterScoresCopy["number_system"]?.xp >= 150 && !badgeIdsUpdated.includes("number_master")) {
      badgeIdsUpdated.push("number_master");
    }
    if (question.chapterId === "ratio" && chapterScoresCopy["ratio"]?.xp >= 200 && !badgeIdsUpdated.includes("ratio_master")) {
      badgeIdsUpdated.push("ratio_master");
    }
    if (question.chapterId === "average" && chapterScoresCopy["average"]?.xp >= 250 && !badgeIdsUpdated.includes("average_master")) {
      badgeIdsUpdated.push("average_master");
    }
    if (question.chapterId === "profit_loss" && chapterScoresCopy["profit_loss"]?.xp >= 250 && !badgeIdsUpdated.includes("profit_loss_master")) {
      badgeIdsUpdated.push("profit_loss_master");
    }
    if (nextXp >= 1000 && !badgeIdsUpdated.includes("math_genius")) {
      badgeIdsUpdated.push("math_genius");
    }

    const updatedProgress: UserProgress = {
      ...progress,
      totalXp: nextXp,
      level: nextLevel,
      badgeIds: badgeIdsUpdated,
      chapterScores: chapterScoresCopy,
      history: [...progress.history, attemptLog]
    };

    onUpdateProgress(updatedProgress);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (isInfiniteMode) {
      // Infinite mode generates a new randomized question instantly
      const nextQ = generateQuestion(activeChapterId!, "medium", progress.classLevel);
      setQuestions([nextQ]);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else if (nextIndex < questions.length) {
      // Move to next question in the standard mission
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Completed the 5-question chapter mission!
      onCompleteMission();
    }
  };

  const onCompleteMission = () => {
    // Standard mission completed
    // Add completion XP bonus!
    const chapterId = activeChapterId!;
    const bonusXp = 50 + (correctCount * 10);
    const nextXp = progress.totalXp + bonusXp;

    const completedChats = progress.completedChapters.includes(chapterId) 
      ? progress.completedChapters 
      : [...progress.completedChapters, chapterId];

    const updatedProgress: UserProgress = {
      ...progress,
      totalXp: nextXp,
      level: calculateLevel(nextXp),
      completedChapters: completedChats,
    };

    onUpdateProgress(updatedProgress);
    setIsPlaying(false);
    onSetActiveChapterId(null);
  };

  const handleForceQuit = () => {
    setIsPlaying(false);
    onSetActiveChapterId(null);
  };

  const activeChapter = chapters.find((ch) => ch.id === activeChapterId);
  const currentQuestion = questions[currentQuestionIndex];

  // Render Syllabus Navigation Map
  if (!isPlaying) {
    const activeChapters = chapters.filter((c) => c.classLevel === progress.classLevel);

    return (
      <div id="syllabus-map" className="space-y-8 text-white">
        <div className="flex justify-between items-center bg-indigo-950/40 p-6 border-3 border-indigo-400/35 rounded-[30px] shadow-lg backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6 text-9xl font-black select-none pointer-events-none">
            📐
          </div>
          <div className="relative z-10">
            <h3 className="font-sans font-black text-2xl uppercase tracking-wider text-yellow-300">Quest Guide Map</h3>
            <p className="text-xs text-indigo-100 font-bold max-w-lg mt-1">
              Select an educational study sector below to launch a 5-question quest or enter the unlimited Sandbox!
            </p>
          </div>
          <div className="relative z-10 shrink-0 bg-pink-500 text-white font-black text-xs px-4 py-2 border-2 border-pink-700/60 rounded-full shadow-md uppercase tracking-wider rotate-[-1deg]">
            Lvl {progress.level} • {getLevelTitle(progress.level)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeChapters.map((ch) => {
            const score = progress.chapterScores[ch.id] || { correct: 0, total: 0 };
            const isCompleted = progress.completedChapters.includes(ch.id);

            return (
              <div
                key={ch.id}
                id={`chapter-${ch.id}`}
                className="bg-white text-indigo-950 rounded-[40px] border-4 border-indigo-900 shadow-[0_12px_0_0_#312e81] hover:shadow-[0_16px_0_0_#312e81] hover:-translate-y-1.5 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Banner */}
                <div className={`bg-gradient-to-r ${ch.color} p-6 text-white space-y-2 relative border-b-4 border-indigo-900`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase text-yellow-300 tracking-widest leading-none bg-indigo-950/40 px-2.5 py-1 rounded-full">
                      Class {ch.classLevel} Syllabus
                    </span>
                    {isCompleted && (
                      <span className="bg-emerald-400 text-indigo-950 border-2 border-indigo-950 text-[10px] font-black px-3 py-1 rounded-full uppercase leading-none font-sans rotate-2 shadow-sm">
                        Mastered ✓
                      </span>
                    )}
                  </div>
                  <h4 className="text-2xl font-black font-sans leading-none tracking-tight pt-1">{ch.name}</h4>
                  <p className="text-xs text-white/90 leading-relaxed font-bold font-sans">{ch.description}</p>
                </div>

                {/* Body details */}
                <div className="p-6 space-y-5">
                  {/* Skills Grid */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-indigo-900 font-sans block opacity-60">Skills to Unlock:</span>
                    <div className="flex flex-wrap gap-2">
                      {ch.skills.map((sk) => (
                        <span key={sk} className="text-[10px] font-black bg-indigo-50 text-indigo-950 border-2 border-indigo-200 px-3 py-1.5 rounded-xl font-sans shadow-sm">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="pt-5 border-t-2 border-indigo-50 flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-xs font-black text-indigo-900 font-sans">
                      {score.total > 0 ? (
                        <span className="bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100">
                          XP Score: <strong className="text-indigo-650">{score.correct}/{score.total} solved</strong>
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-black">Quest pays <strong>+100 XP Bonus!</strong></span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-infinite-${ch.id}`}
                        onClick={() => startChapterMission(ch.id, true)}
                        className="px-4 py-2.5 bg-white hover:bg-stone-50 border-3 border-indigo-900 text-indigo-950 text-xs font-black rounded-2xl shadow-[0_3px_0_0_#1e1b4b] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                        title="Randomized single puzzle practice Sandbox"
                      >
                        Sandbox
                      </button>
                      <button
                        id={`btn-start-quest-${ch.id}`}
                        onClick={() => startChapterMission(ch.id, false)}
                        className={`px-5 py-2.5 bg-gradient-to-r ${ch.color} text-white text-xs font-black rounded-2xl border-2 border-indigo-950 transition shadow-[0_5px_0_0_#1e1b4b] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 cursor-pointer`}
                      >
                        <Play size={12} fill="white" className="text-white" />
                        Quest Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active quiz board view
  return (
    <div id="active-math-board" className="bg-white text-indigo-950 rounded-[40px] border-4 border-indigo-900 p-6 md:p-8 space-y-8 shadow-[0_16px_0_0_#1e1b4b] relative">
      
      {/* Quiz Top Metadata HUD */}
      <div className="flex items-center justify-between bg-indigo-50/75 p-4.5 border-3 border-indigo-200 rounded-3xl flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            id="btn-quit-mission"
            onClick={handleForceQuit}
            className="px-4 py-2 bg-rose-500 text-white font-black hover:bg-rose-600 rounded-2xl border-2 border-rose-700 shadow-[0_3px_0_0_#9f1239] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all text-xs cursor-pointer"
          >
            Quit Mission
          </button>
          
          <div className="h-8 w-[2px] bg-indigo-200" />
 
          <div>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest font-sans leading-none block">
              Active Category:
            </span>
            <span className="text-base font-black text-indigo-950 font-sans leading-none">{activeChapter?.name}</span>
          </div>
        </div>

        {/* Quest Progression Dots */}
        {!isInfiniteMode && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-black text-indigo-900/60 font-sans uppercase tracking-wider">
              Quest Progress:
            </span>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const isActive = i === currentQuestionIndex;
                const isLogged = i < scoreHistory.length;
                const wasCorrect = scoreHistory[i];

                return (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-xl border-3 flex items-center justify-center transition-all text-xs font-extrabold ${
                      isActive 
                        ? "bg-yellow-300 border-yellow-600 text-yellow-950 ring-4 ring-yellow-200 animate-pulse scale-105" 
                        : isLogged 
                          ? wasCorrect 
                            ? "bg-emerald-500 border-emerald-700 text-white shadow-[0_2px_0_0_#047857]" 
                            : "bg-rose-500 border-rose-700 text-white shadow-[0_2px_0_0_#be185d]"
                          : "bg-white border-indigo-100 text-indigo-200"
                    }`}
                  >
                    {isLogged ? (wasCorrect ? "✓" : "✗") : i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isInfiniteMode && (
          <span className="bg-yellow-400 text-indigo-950 border-3 border-indigo-950 px-4 py-1.5 rounded-full text-xs font-black font-sans uppercase rotate-[-1deg] shadow-sm">
            Practice Sandbox
          </span>
        )}
      </div>

      {/* Main Question Display Card */}
      <div className="space-y-5 px-1">
        {/* Animated Badge for current score streaks */}
        {streak >= 2 && (
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-indigo-950 text-xs font-black px-4 py-2 border-3 border-indigo-950 rounded-full uppercase tracking-wider animate-bounce font-sans shadow-md">
            <Sparkles size={13} fill="#1e1b4b" />
            STREAK IS ON FIRE! ({streak} in a row)
          </div>
        )}

        <h3 className="text-2xl md:text-3xl font-black font-sans text-indigo-950 tracking-tight leading-none text-left">
          {currentQuestion?.questionText}
        </h3>

        {/* Visual AID panel */}
        {currentQuestion?.visualType && (
          <VisualAids type={currentQuestion.visualType} data={currentQuestion.visualData} />
        )}
      </div>

      {/* Options Clicking Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion?.options?.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCurrentAnswer = option.trim() === currentQuestion.correctAnswer.trim();
          
          let btnStyle = "bg-white border-4 border-indigo-100/80 shadow-[0_4px_0_0_#e0e7ff] text-indigo-950 hover:bg-slate-50 hover:border-indigo-300";
          if (isSelected) {
            btnStyle = "bg-indigo-50 border-4 border-indigo-600 shadow-[0_4px_0_0_#c7d2fe] text-indigo-950 scale-[1.01]";
          }
          if (isAnswered) {
            if (isCurrentAnswer) {
              btnStyle = "bg-emerald-50 border-4 border-emerald-500 text-emerald-950 shadow-[0_4px_0_0_#a7f3d0] pointer-events-none scale-[1.01]";
            } else if (isSelected) {
              btnStyle = "bg-rose-50 border-4 stroke-rose-500 border-rose-500 text-rose-950 shadow-[0_4px_0_0_#fecaca] pointer-events-none scale-[1.01] animate-shake";
            } else {
              btnStyle = "bg-stone-50 border border-stone-200 text-stone-300 pointer-events-none opacity-40";
            }
          }

          return (
            <button
              key={option}
              id={`option-${option.replace(/\s+/g, '-')}`}
              onClick={() => handleOptionSelect(option)}
              className={`${btnStyle} p-5 rounded-3xl font-sans font-black text-base transition-all text-left flex justify-between items-center cursor-pointer active:translate-y-1 active:shadow-none`}
            >
              <div className="flex items-center">
                {/* 3D Option Index Identifier */}
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs mr-4 shadow-sm border ${
                  isAnswered && isCurrentAnswer 
                    ? "bg-emerald-500 text-white border-emerald-600" 
                    : isAnswered && isSelected 
                      ? "bg-rose-500 text-white border-rose-600" 
                      : isSelected 
                        ? "bg-indigo-650 text-white border-indigo-700" 
                        : "bg-indigo-50 text-indigo-800 border-indigo-100"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="leading-tight">{option}</span>
              </div>
              
              {isAnswered && isCurrentAnswer && (
                <span className="bg-emerald-500 text-white p-1 rounded-full flex items-center justify-center shadow-md">
                  <Check size={12} strokeWidth={4} />
                </span>
              )}
              {isAnswered && isSelected && !isCurrentAnswer && (
                <span className="bg-rose-500 text-white p-1 rounded-full flex items-center justify-center shadow-md animate-shake">
                  <X size={12} strokeWidth={4} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Button controls: Submit or Next */}
      <div className="pt-6 border-t-3 border-indigo-50 flex justify-between items-center flex-wrap gap-4">
        
        {/* Support Buttons Left */}
        <div className="flex items-center gap-3">
          {/* Hint button */}
          {!isAnswered && (
            <button
              id="btn-trigger-hint"
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className={`px-4.5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                showHint 
                  ? "bg-amber-100 text-amber-950 border-3 border-amber-400 shadow-none ml-1" 
                  : "bg-white hover:bg-stone-50 border-3 border-indigo-900 text-indigo-950 shadow-[0_3px_0_0_#1e1b4b] active:translate-y-0.5 active:shadow-none"
              }`}
            >
              <Lightbulb size={13} className={showHint ? "text-amber-600 fill-amber-300 animate-pulse" : "text-indigo-900"} />
              {showHint ? "Hint Active!" : "Get Hint (-5 XP)"}
            </button>
          )}

          {/* Socrates Ask button */}
          <button
            id="btn-game-ask-socrates"
            onClick={() => onAskSocrates(currentQuestion.questionText, currentQuestion)}
            className="px-4.5 py-3 bg-white hover:bg-indigo-50 border-3 border-indigo-900 text-indigo-950 text-xs font-black uppercase tracking-wider rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_3px_0_0_#1e1b4b] active:translate-y-0.5 active:shadow-none"
          >
            <span>💬 Ask Socrates</span>
          </button>
        </div>

        {/* Command Buttons Right */}
        <div>
          {!isAnswered ? (
            <button
              id="btn-submit-answer"
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className="px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-indigo-950 text-sm font-black uppercase tracking-wider rounded-2xl border-3 border-indigo-950 transition-all shadow-[0_5px_0_0_#1e1b4b] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              Submit Check ✓
            </button>
          ) : (
            <button
              id="btn-next-puzzle"
              onClick={handleNextQuestion}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-black uppercase tracking-wider rounded-2xl border-3 border-indigo-950 transition-all shadow-[0_5px_0_0_#1e1b4b] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 cursor-pointer"
            >
              <span>
                {isInfiniteMode ? "Repeat Sandbox" : (currentQuestionIndex < questions.length - 1 ? "Next Puzzle" : "Complete Mission!")}
              </span>
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          )}
        </div>

      </div>

      {/* Expanded Hint and Lesson Sections */}
      {showHint && !isAnswered && (
        <div id="hint-display" className="p-5 bg-amber-50 border-3 border-amber-500 rounded-3xl space-y-1 shadow-sm">
          <div className="flex items-center gap-1 text-amber-950 font-black text-xs font-sans uppercase">
            <Lightbulb size={13} fill="#b45309" className="text-amber-600 animate-bounce" />
            <span>Clue Hint:</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-sans font-bold">{currentQuestion?.hint}</p>
        </div>
      )}

      {isAnswered && (
        <div 
          id="explanation-display" 
          className={`p-6 rounded-[32px] border-4 ${
            isCorrect 
              ? "bg-emerald-50/50 border-emerald-450 text-indigo-950" 
              : "bg-indigo-50/60 border-indigo-250 text-indigo-950"
          } space-y-3.5 shadow-sm`}
        >
          <div className="flex items-center gap-2">
            <Info size={18} className={isCorrect ? "text-emerald-600" : "text-indigo-650"} />
            <h4 className={`text-xs font-black font-sans uppercase tracking-widest ${isCorrect ? 'text-emerald-800' : 'text-indigo-900'}`}>
              {isCorrect ? "STUPENDOUS OUTCOME! ✓" : "ENRICH PATHS & KNOWLEDGE:"}
            </h4>
          </div>

          <div className="prose prose-sm font-sans max-w-none text-indigo-950 text-xs leading-relaxed space-y-1.5 font-bold">
            {currentQuestion?.explanation.split("\n").map((line, idx) => {
              if (line.startsWith("•") || line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
                return <p key={idx} className="my-1 text-indigo-900 font-extrabold ml-2">{line}</p>;
              }
              return <p key={idx} className="my-1.5 leading-snug">{line}</p>;
            })}
          </div>
        </div>
      )}

    </div>
  );
}
