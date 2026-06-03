/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { UserProgress, Chapter, ClassLevel } from "./types";
import { CHAPTERS, calculateLevel, getLevelTitle } from "./data/questions";
import GameArea from "./components/GameArea";
import Dashboard from "./components/Dashboard";
import Scratchpad from "./components/Scratchpad";
import MathBuddy from "./components/MathBuddy";
import { 
  Compass, Award, BookOpen, Layers, Edit3, MessageCircle, 
  HelpCircle, Sparkles, User, RefreshCw, Trophy, Star
} from "lucide-react";

const LOCAL_STORAGE_KEY = "class_5_6_math_game_progress";

const defaultProgress = (name: string, grade: ClassLevel): UserProgress => ({
  displayName: name || "Math Explorer",
  classLevel: grade,
  totalXp: 0,
  level: 1,
  completedChapters: [],
  badgeIds: [],
  chapterScores: {},
  history: []
});

export default function App() {
  // Application state
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeTab, setActiveTab] = useState<"game" | "dashboard">("game");
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

  // Interface toggles
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isMathBuddyOpen, setIsMathBuddyOpen] = useState(false);

  // Personalization onboarding states
  const [tempName, setTempName] = useState("");
  const [tempGrade, setTempGrade] = useState<ClassLevel>(5);

  // Socrates ask auto trigger
  const [askEulerQuery, setAskEulerQuery] = useState<string | null>(null);
  const [currentSocratesQuestion, setCurrentSocratesQuestion] = useState<any>(null);

  // Load progress from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (err) {
        console.error("Local storage progress corrupted, loading fresh:", err);
      }
    }
  }, []);

  // Save progress changes
  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const name = tempName.trim() || "Young Wizard";
    const newProgress = defaultProgress(name, tempGrade);
    handleUpdateProgress(newProgress);
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to clear your current mathematical score logs? This resets your XP level.")) {
      const name = progress?.displayName || "Math Explorer";
      const grade = progress?.classLevel || 5;
      const fresh = defaultProgress(name, grade);
      handleUpdateProgress(fresh);
      setActiveChapterId(null);
      setActiveTab("game");
    }
  };

  const handleToggleSyllabusGrade = () => {
    if (!progress) return;
    const targetGrade: ClassLevel = progress.classLevel === 5 ? 6 : 5;
    const updated = {
      ...progress,
      classLevel: targetGrade
    };
    handleUpdateProgress(updated);
    setActiveChapterId(null);
  };

  const handleTriggerSocratesQuery = (queryText: string, currentQ: any) => {
    // Generate context formatted query
    setCurrentSocratesQuestion(currentQ);
    setAskEulerQuery(`Coach, I have a doubt: "${queryText}". Can you explain this concept in 2-3 child-friendly steps?`);
    setIsMathBuddyOpen(true);
  };

  const handleDashboardNavigateToChapter = (chapterId: string) => {
    onSetActiveChapter(chapterId);
    setActiveTab("game");
  };

  const onSetActiveChapter = (id: string | null) => {
    setActiveChapterId(id);
    // Reset question specific buddy triggers on changing chapters
    setCurrentSocratesQuestion(null);
    setAskEulerQuery(null);
  };

  // First time layout / Onboarding check
  if (!progress) {
    return (
      <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
        <div id="character-onboarding-panel" className="bg-white rounded-[40px] p-8 md:p-10 max-w-md w-full shadow-[0_12px_0_0_#312e81] border-4 border-indigo-900 flex flex-col items-center text-center space-y-6 relative">
          
          <div className="absolute -top-6 bg-pink-500 text-white px-6 py-2 rounded-full font-black text-sm shadow-md uppercase tracking-wider rotate-[-2deg]">
            Welcome Explorer!
          </div>

          {/* Onboarding animation vectors */}
          <div className="w-24 h-24 bg-yellow-400 rounded-3xl p-1 flex items-center justify-center border-4 border-yellow-700 shadow-[0_6px_0_0_#b45309]">
            <svg viewBox="0 0 100 100" className="w-18 h-18">
              {/* Golden Star Wizard Cap */}
              <circle cx="50" cy="55" r="30" fill="#fbc02d" />
              <polygon points="50,12 20,40 80,40" fill="#1e1b4b" />
              <circle cx="50" cy="40" r="5" fill="#facc15" className="animate-pulse" />
              {/* Smiley math teacher face */}
              <circle cx="38" cy="52" r="4" fill="#121212" />
              <circle cx="62" cy="52" r="4" fill="#121212" />
              <path d="M 40 70 Q 50 78 60 70" fill="none" stroke="#121212" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-1.5 pt-2">
            <h1 className="text-3xl font-black uppercase tracking-wider text-indigo-950">Math Quest</h1>
            <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest">Interactive Class 5 & 6 Playroom</p>
          </div>

          <form onSubmit={handleCreateProfile} className="w-full space-y-5">
            {/* Name Input */}
            <div className="text-left space-y-2">
              <label className="text-[11px] font-black uppercase text-indigo-900 font-sans tracking-widest" htmlFor="explorer-name">
                Your Explorer Name:
              </label>
              <input
                id="explorer-name"
                type="text"
                maxLength={18}
                required
                placeholder="E.g., Leo / Mia / Sophia"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full border-4 border-indigo-150 bg-stone-50 rounded-2xl px-4.5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 font-sans font-black text-indigo-950 transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Class Grade Level Selection */}
            <div className="text-left space-y-2">
              <label className="text-[11px] font-black uppercase text-indigo-900 font-sans tracking-widest">
                Select Study Level:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  id="select-grade-5"
                  onClick={() => setTempGrade(5)}
                  className={`p-4 rounded-3xl border-4 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer shadow-sm ${
                    tempGrade === 5
                      ? "bg-amber-100 border-amber-500 text-amber-950 scale-102 font-black shadow-[0_4px_0_0_#b45309]"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 font-bold hover:border-indigo-200"
                  }`}
                >
                  <Star fill={tempGrade === 5 ? "#d97706" : "transparent"} size={18} className="text-amber-600" />
                  <span className="text-sm font-black uppercase tracking-tight">Grade 5</span>
                  <span className="text-[9px] leading-tight opacity-80 font-medium">Pizza Fractions & Decimals</span>
                </button>

                <button
                  type="button"
                  id="select-grade-6"
                  onClick={() => setTempGrade(6)}
                  className={`p-4 rounded-3xl border-4 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer shadow-sm ${
                    tempGrade === 6
                      ? "bg-violet-100 border-violet-500 text-violet-950 scale-102 font-black shadow-[0_4px_0_0_#6d28d9]"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 font-bold hover:border-indigo-200"
                  }`}
                >
                  <Trophy fill={tempGrade === 6 ? "#7c3aed" : "transparent"} size={18} className="text-violet-600" />
                  <span className="text-sm font-black uppercase tracking-tight">Grade 6</span>
                  <span className="text-[9px] leading-tight opacity-80 font-medium">Integers, Algebra & Ratios</span>
                </button>
              </div>
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              id="btn-embark"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase text-base py-4 px-6 rounded-2xl shadow-[0_6px_0_0_#047857] hover:translate-y-[-2px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
            >
              Embark on Quest! 🚀
            </button>
          </form>

          <p className="text-[10px] font-sans font-bold text-stone-400 leading-normal">
            Your scores log resides securely in browser local storage.
          </p>
        </div>
      </div>
    );
  }

  const currentLevel = calculateLevel(progress.totalXp);
  const currentTitle = getLevelTitle(currentLevel);

  return (
    <div className="min-h-screen bg-indigo-600 text-white flex flex-col font-sans select-none pb-12">
      
      {/* Top Header Navbar */}
      <nav id="app-navigation-bar" className="bg-white/10 backdrop-blur-sm border-b-4 border-indigo-800 sticky top-0 z-30 shadow-xl rounded-3xl m-4 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-3 rounded-2xl shadow-[0_4px_0_0_#d97706] text-indigo-900 font-bold text-2xl flex items-center justify-center select-none">
              📐
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider text-white">Math Quest</h1>
              <p className="text-indigo-200 font-bold uppercase text-[10px] tracking-widest">Class 5 & 6 Practice Arena</p>
            </div>
          </div>

          {/* Quick HUD Score summary */}
          <div className="flex items-center gap-3">
            
            {/* Syllabus Grade switcher toggle */}
            <button
              id="btn-switch-syllabus"
              onClick={handleToggleSyllabusGrade}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-orange-400 bg-orange-500 text-white font-sans font-black text-xs shadow-[0_3px_0_0_#c2410c] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              title="Click to toggle between class 5 and 6 content streams"
            >
              <RefreshCw size={12} className="text-orange-100 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Syllabus: Class {progress.classLevel}</span>
            </button>

            {/* Level bubble pill */}
            <div 
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 border-indigo-400 bg-indigo-900/50 text-indigo-100 font-sans font-black text-xs shadow-md hover:bg-indigo-900/80 cursor-pointer transition"
            >
              <Trophy size={13} className="text-yellow-400 fill-yellow-400" />
              <span>Lvl {currentLevel} ({progress.totalXp} XP)</span>
            </div>

            {/* Profile Avatar click */}
            <div 
              onClick={() => setActiveTab("dashboard")}
              className="flex h-9 items-center gap-1.5 bg-indigo-950/60 border-2 border-indigo-400 rounded-full px-3 py-1 hover:bg-indigo-950/80 transition text-xs font-black font-sans text-white cursor-pointer shadow-md"
            >
              <span className="w-5 h-5 rounded-full bg-pink-500 text-[11px] text-white flex items-center justify-center font-black">
                {progress.displayName.charAt(0).toUpperCase()}
              </span>
              <span className="max-w-[100px] truncate">{progress.displayName}</span>
            </div>

          </div>

          {/* Center Tabs selectors */}
          <div className="flex items-center bg-indigo-950/40 border-2 border-indigo-800 rounded-2xl p-1 shadow-inner">
            <button
              id="tab-game"
              onClick={() => setActiveTab("game")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "game"
                  ? "bg-yellow-400 text-indigo-950 shadow-[0_3px_0_0_#d97706]"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <Compass size={14} />
              Adventure Map
            </button>
            <button
              id="tab-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-yellow-400 text-indigo-950 shadow-[0_3px_0_0_#d97706]"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <Award size={14} />
              Student Dashboard
            </button>
          </div>

          {/* Canvas Scratchpad trigger */}
          <div className="flex gap-2">
            <button
              id="btn-scratchpad-trigger"
              onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
              className={`p-2.5 rounded-2xl border-2 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                isScratchpadOpen 
                  ? "bg-pink-500 border-pink-700 text-white shadow-[0_3px_0_0_#be185d]" 
                  : "bg-white text-indigo-900 border-b-4 border-indigo-200 hover:bg-indigo-50"
              }`}
              title="Open Scratchpad"
            >
              <Edit3 size={16} />
            </button>
          </div>

        </div>
      </nav>

      {/* Main Container Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-4 w-full flex-1">
        
        {/* Render Active View depending on tab selection */}
        {activeTab === "game" ? (
          <GameArea
            chapters={CHAPTERS}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            activeChapterId={activeChapterId}
            onSetActiveChapterId={onSetActiveChapter}
            onAskSocrates={handleTriggerSocratesQuery}
          />
        ) : (
          <Dashboard
            progress={progress}
            chapters={CHAPTERS}
            onResetProgress={handleResetProgress}
            onNavigateToChapter={handleDashboardNavigateToChapter}
          />
        )}

      </main>

      {/* Rough scratchpad drawing overlay canvas */}
      <Scratchpad 
        isOpen={isScratchpadOpen} 
        onClose={() => setIsScratchpadOpen(false)} 
      />

      {/* Floating friendly chat companion */}
      <MathBuddy
        isOpen={isMathBuddyOpen}
        onToggle={() => setIsMathBuddyOpen(!isMathBuddyOpen)}
        classLevel={progress.classLevel}
        chapterName={CHAPTERS.find(c => c.id === activeChapterId)?.name}
        currentQuestion={currentSocratesQuestion}
        onAskEulerQuestion={askEulerQuery}
        onAsked={() => setAskEulerQuery(null)}
      />

    </div>
  );
}
