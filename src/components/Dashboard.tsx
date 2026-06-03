/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UserProgress, Chapter } from "../types";
import { ACHIEVEMENTS, getLevelTitle, calculateLevel } from "../data/questions";
import { Calendar, Award, Star, History, Check, X, Shield, BookOpen, AlertCircle, Trophy } from "lucide-react";

interface DashboardProps {
  progress: UserProgress;
  chapters: Chapter[];
  onResetProgress: () => void;
  onNavigateToChapter: (chapterId: string) => void;
}

export default function Dashboard({ progress, chapters, onResetProgress, onNavigateToChapter }: DashboardProps) {
  const currentLevel = calculateLevel(progress.totalXp);
  const currentLevelTitle = getLevelTitle(currentLevel);

  // Experience math
  const xpBase = (currentLevel - 1) * (currentLevel - 1) * 50; // XP threshold for current lvl start
  const xpNext = currentLevel * currentLevel * 50; // XP threshold for next lvl
  const xpRequiredForLvlUpgrade = xpNext - xpBase;
  const currentLevelProgressXp = progress.totalXp - xpBase;
  const progressPercentage = Math.min(
    100,
    Math.max(0, (currentLevelProgressXp / xpRequiredForLvlUpgrade) * 100)
  );

  return (
    <div id="student-dashboard" className="space-y-8">
      {/* Profile Header Card */}
      <div className="bg-indigo-950/40 p-6 md:p-8 rounded-[40px] border-4 border-indigo-900 text-white shadow-xl flex flex-col md:flex-row gap-6 items-center justify-between backdrop-blur-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5 translate-x-12 translate-y-12 text-9xl font-black select-none pointer-events-none">
          🔮
        </div>
        
        <div className="flex items-center gap-5 flex-col sm:flex-row text-center sm:text-left relative z-10">
          {/* Avatar SVG */}
          <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center border-4 border-indigo-950 shadow-[0_5px_0_0_#1e1b4b]">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              {/* Cute Math Student Wizard Hat Avatar */}
              <circle cx="50" cy="55" r="30" fill="#fbc02d" />
              {/* Glasses */}
              <circle cx="40" cy="50" r="10" fill="none" stroke="#263238" strokeWidth="3" />
              <circle cx="60" cy="50" r="10" fill="none" stroke="#263238" strokeWidth="3" />
              <line x1="48" y1="50" x2="52" y2="50" stroke="#263238" strokeWidth="3" />
              {/* Face smile */}
              <path d="M 43 72 Q 50 78 57 72" fill="none" stroke="#263238" strokeWidth="3.5" strokeLinecap="round" />
              {/* Wizard Hat block */}
              <polygon points="50,15 25,40 75,40" fill="#1e1b4b" />
              <ellipse cx="50" cy="40" rx="30" ry="4" fill="#0ea5e9" />
              {/* Star on hat */}
              <polygon points="50,18 52,24 58,24 53,28 55,34 50,30 45,34 47,28 42,24 48,24" fill="#facc15" />
            </svg>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start flex-wrap">
              <h2 className="text-3xl font-black uppercase tracking-wide leading-none">{progress.displayName}</h2>
              <span className="bg-yellow-400 text-indigo-950 font-black text-[10px] px-3 py-1.5 border-2 border-indigo-950 rounded-full shadow-sm uppercase tracking-wider font-sans">
                Grade {progress.classLevel} Quest
              </span>
            </div>
            <p className="text-yellow-300 font-sans font-black text-sm uppercase tracking-widest">
              {currentLevelTitle} (Lvl {currentLevel})
            </p>
            <div className="flex gap-4 text-xs font-black text-indigo-200 font-sans mt-2">
              <span className="flex items-center gap-1.5 bg-indigo-900/50 px-2.5 py-1 rounded-lg border border-indigo-850">⭐ {progress.totalXp} XP</span>
              <span className="flex items-center gap-1.5 bg-indigo-900/50 px-2.5 py-1 rounded-lg border border-indigo-850">🧩 {progress.history.length} Solved</span>
              <span className="flex items-center gap-1.5 bg-indigo-900/50 px-2.5 py-1 rounded-lg border border-indigo-850">🏅 {progress.badgeIds.length} Medals</span>
            </div>
          </div>
        </div>

        {/* XP Progress Slider */}
        <div className="w-full md:w-80 space-y-2.5 bg-indigo-900/50 p-5 rounded-3xl border-2 border-indigo-800 relative z-10 shadow-inner">
          <div className="flex justify-between items-center text-xs font-black font-sans text-indigo-200">
            <span>LVL {currentLevel}</span>
            <span className="text-yellow-300">{progress.totalXp} / {xpNext} XP</span>
            <span>LVL {currentLevel + 1}</span>
          </div>
          <div className="w-full h-4 bg-indigo-950 rounded-full p-0.5 border border-indigo-900">
            <div 
              style={{ width: `${progressPercentage}%` }}
              className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 rounded-full transition-all duration-500"
            />
          </div>
          <p className="text-[10px] text-indigo-200 text-center font-sans tracking-tight leading-normal">
            Acquire <strong>{xpNext - progress.totalXp} more XP</strong> to unlock level {currentLevel + 1}!
          </p>
        </div>
      </div>

      {/* Chapters Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Achievements Column */}
        <div className="bg-white text-indigo-950 rounded-[40px] border-4 border-indigo-900 shadow-[0_12px_0_0_#312e81] p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Award className="text-amber-500" size={20} />
            <h3 className="font-sans font-black text-sm uppercase tracking-wider text-indigo-950">Medals & Milestones</h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-1">
            {ACHIEVEMENTS.map((b) => {
              const isUnlocked = progress.badgeIds.includes(b.id) || progress.totalXp >= b.xpThreshold;
              return (
                <div 
                  key={b.id}
                  className={`flex gap-3 items-center p-3.5 rounded-2xl border-2 transition-all ${
                    isUnlocked 
                      ? `${b.colorClass} border-amber-400 shadow-sm` 
                      : "bg-stone-50 border-stone-200/60 opacity-60 ml-0.5"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl bg-white shadow-sm border-2 ${isUnlocked ? 'border-amber-300' : 'border-stone-200'}`}>
                    <Star className={isUnlocked ? "text-amber-500 fill-amber-300" : "text-stone-300"} size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-indigo-950 leading-none">{b.title}</p>
                    <p className="text-[10px] text-stone-500 mt-1 leading-tight font-sans font-semibold">{b.description}</p>
                    <p className="text-[9px] font-bold font-mono text-indigo-400 mt-0.5 uppercase">Lvl Target: {b.xpThreshold} XP</p>
                  </div>
                  {isUnlocked && (
                    <div className="ml-auto w-5 h-5 bg-emerald-500 border border-emerald-600 rounded-full text-white shadow-sm flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance & Score boards */}
        <div className="lg:col-span-2 bg-white text-indigo-950 rounded-[40px] border-4 border-indigo-900 shadow-[0_12px_0_0_#312e81] p-6">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="text-indigo-500" size={20} />
            <h3 className="font-sans font-black text-sm uppercase tracking-wider text-indigo-950">Syllabus Subject Cards</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {chapters
              .filter(ch => ch.classLevel === progress.classLevel)
              .map((ch) => {
                const score = progress.chapterScores[ch.id] || { correct: 0, total: 0, xp: 0 };
                const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

                return (
                  <div 
                    key={ch.id} 
                    className="p-5 rounded-[28px] bg-indigo-50/50 border-3 border-indigo-100/85 flex flex-col justify-between hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all active:translate-y-0.5"
                    onClick={() => onNavigateToChapter(ch.id)}
                  >
                    <div>
                      <span className={`inline-block text-[9px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${ch.color} text-white uppercase font-sans mb-3`}>
                        Grade {ch.classLevel} Core
                      </span>
                      <h4 className="text-base font-black text-indigo-950 tracking-tight leading-snug">{ch.name}</h4>
                      <p className="text-[11px] text-stone-500 font-sans font-medium mt-1 leading-snug truncate">{ch.description}</p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t-2 border-indigo-100/50 flex justify-between items-center flex-wrap gap-2 text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-indigo-950/50 font-black uppercase tracking-wider block">XP earned</span>
                        <span className="text-xs font-black text-indigo-950 font-sans bg-yellow-300 px-2.5 py-1 rounded-lg border border-yellow-400">⭐ {score.xp} XP</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-indigo-950/50 font-black uppercase tracking-wider block">Syllabus Accuracy</span>
                        <span className="text-xs font-black text-teal-600 bg-teal-50 px-2 py-1 rounded-lg border border-teal-200 font-sans">
                          {score.correct}/{score.total} Correct ({percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Olympiad Arena Prominent Section */}
          <div 
            id="olympiad-dashboard-card"
            onClick={() => onNavigateToChapter("olympiad_arena")}
            className="mt-6 p-6 rounded-[32px] bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 border-4 border-yellow-300 text-indigo-950 flex flex-col sm:flex-row justify-between items-center gap-4 hover:brightness-105 active:scale-[0.995] transition-all cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 text-7xl font-black select-none pointer-events-none">
              🏆
            </div>
            <div className="space-y-1 relative z-10 text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black px-3 py-1 bg-yellow-400 text-amber-950 border-2 border-indigo-950 rounded-full uppercase font-sans tracking-wide">
                <Trophy size={10} fill="currentColor" /> ⭐ ELITE OLYMPIAD CHALLENGE ARENA ⭐
              </span>
              <h4 className="text-xl font-black tracking-tight leading-snug text-indigo-950 pt-1">Olympiad Champions Practice</h4>
              <p className="text-[11px] text-indigo-900 font-bold font-sans leading-snug">
                Extremely difficult logical, geometric, average, and profit/loss problems for advanced minds.
              </p>
            </div>
            
            <div className="shrink-0 bg-indigo-950 text-white px-4 py-3 border border-yellow-400/30 rounded-2xl flex flex-col items-center gap-1 min-w-[120px] relative z-10 text-center shadow-md">
              <span className="text-[9px] text-yellow-300 font-extrabold uppercase font-sans">Olympiad Score</span>
              <strong className="text-sm font-sans font-black text-white">
                ⭐ {(progress.chapterScores["olympiad_arena"]?.xp || 0)} XP
              </strong>
              <span className="text-[9px] opacity-75 font-sans font-bold">
                {(progress.chapterScores["olympiad_arena"]?.correct || 0)}/{(progress.chapterScores["olympiad_arena"]?.total || 0)} Accurate
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-900/5 backdrop-blur-sm border-3 border-indigo-100 rounded-3xl flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-2.5">
              <Shield className="text-indigo-650 shrink-0" size={18} />
              <p className="text-[11px] font-bold text-indigo-950 leading-normal font-sans">
                You can toggle levels at the top main menu at any point to master older modules or challenge yourself with higher grade chapters!
              </p>
            </div>
            <button
              id="btn-switch-syllabus-dashboard"
              onClick={onResetProgress}
              className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 border-2 border-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-[0_3px_0_0_#9f1239] active:translate-y-0.5 active:shadow-none cursor-pointer shrink-0"
            >
              Reset Score Logs
            </button>
          </div>

        </div>
      </div>

      {/* Historical Attempt Logs */}
      <div className="bg-white text-indigo-950 rounded-[40px] border-4 border-indigo-900 shadow-[0_12px_0_0_#312e81] p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <History className="text-indigo-500" size={20} />
          <h3 className="font-sans font-black text-sm uppercase tracking-wider text-indigo-950">Problem Attempt Solutions Log</h3>
        </div>

        {progress.history.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-2.5 text-center text-stone-400">
            <AlertCircle size={32} className="text-indigo-200" />
            <p className="text-xs font-bold font-sans text-stone-500 uppercase tracking-wider">No completed arithmetic quests recorded yet</p>
            <p className="text-[10px] font-bold text-stone-400">Launch a guide map mission to accumulate historical records!</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[24px] border-2 border-indigo-50 shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-indigo-50/50 border-b-2 border-indigo-100 text-indigo-950 font-black uppercase tracking-wider">
                  <th className="p-4">Status</th>
                  <th className="p-4">Chapter</th>
                  <th className="p-4">Syllabus Puzzle</th>
                  <th className="p-4">Your Answer</th>
                  <th className="p-4">Correct Answer</th>
                  <th className="p-4">Points</th>
                  <th className="p-4">Attempt Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50">
                {progress.history.slice(-15).reverse().map((log, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/35 font-sans transition-all">
                    <td className="p-4">
                      {log.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300/60 shadow-sm">
                          CORRECT
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-100/80 px-2.5 py-1 rounded-full border border-rose-300/60 shadow-sm">
                          LEARN
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-black text-indigo-950">
                      {chapters.find(c => c.id === log.chapterId)?.name || log.chapterId}
                    </td>
                    <td className="p-4 text-indigo-900 max-w-sm truncate font-semibold" title={log.questionText}>
                      {log.questionText}
                    </td>
                    <td className="p-4 font-bold font-mono text-indigo-950">{log.studentAnswer}</td>
                    <td className="p-4 font-bold font-mono text-emerald-600">{log.correctAnswer}</td>
                    <td className="p-4 font-black font-mono text-indigo-650">+{log.xpEarned} XP</td>
                    <td className="p-4 text-[10px] font-bold text-stone-400">
                      {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
