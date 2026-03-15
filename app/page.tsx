'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { lessonsConfig, getAllLessons } from '../data/lessonsConfig';

export default function Home() {
  const allLessons = getAllLessons();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLesson = allLessons[currentLessonIndex];
  const totalLessons = allLessons.length;

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };
  return (
    <main className="min-h-[143vh] flex items-stretch justify-center p-0 md:p-0 animate-fade-in w-full overflow-x-hidden">
      <div className="w-full bg-tm-panel overflow-hidden flex flex-col md:flex-row min-h-[143vh] relative z-10">

        {/* Sidebar / Info Panel */}
        <div className="w-full md:w-[35%] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 md:p-12 flex flex-col justify-between border-r border-white/10 relative overflow-hidden shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-[-5%] left-[-10%] w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-5%] right-[-10%] w-72 h-72 bg-pink-500/15 rounded-full blur-[100px]"></div>
          <div className="absolute top-[40%] left-[50%] w-40 h-40 bg-sky-500/10 rounded-full blur-[60px]"></div>

          <div className="relative z-10">
            {/* App Badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">InScript Tutor</span>
              </div>
            </div>

            {/* App Name */}
            <div className="mb-10">
              <h1 className="text-3xl font-black leading-none mb-2 whitespace-nowrap">
                <span className="text-white/90">Hindi </span>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ textShadow: 'none' }}>Typing </span>
                <span className="text-white/90">Master</span>
              </h1>
              <p className="text-white/40 text-xs font-semibold mt-4 tracking-widest uppercase">
                अभ्यास करें • सीखें • माहिर बनें
              </p>
            </div>

            {/* Key Features - Card Style */}
            <div className="space-y-3">
              <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.25em] mb-4">Key Features</p>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-green-400/20 hover:border-green-400/40 hover:bg-white/8 transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-500/20 flex-shrink-0 group-hover:bg-green-500/30 transition-all">
                  <svg className="w-4.5 h-4.5 text-green-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-bold">Unicode InScript Layout</p>
                  <p className="text-white/40 text-[10px]">मानक हिंदी कीबोर्ड समर्थन</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-sky-400/20 hover:border-sky-400/40 hover:bg-white/8 transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-sky-500/20 flex-shrink-0 group-hover:bg-sky-500/30 transition-all">
                  <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-bold">Interactive Finger Guidance</p>
                  <p className="text-white/40 text-[10px]">उंगली मार्गदर्शन प्रणाली</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-purple-400/20 hover:border-purple-400/40 hover:bg-white/8 transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-purple-500/20 flex-shrink-0 group-hover:bg-purple-500/30 transition-all">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-bold">Live WPM & Accuracy</p>
                  <p className="text-white/40 text-[10px]">रियल-टाइम प्रदर्शन ट्रैकिंग</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-rose-400/20 hover:border-rose-400/40 hover:bg-white/8 transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-rose-500/20 flex-shrink-0 group-hover:bg-rose-500/30 transition-all">
                  <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm font-bold">Structured Lessons</p>
                  <p className="text-white/40 text-[10px]">व्यक्तिगत पाठ प्रगति</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 flex flex-col gap-3">
            <Link href={`/lesson/${currentLesson.id}`} className="block w-full">
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/30 transform transition-all duration-300 active:scale-[0.98] group flex items-center justify-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h12M4 14h8" /></svg>
                <span className="text-sm">Word Practice</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
            <Link href={`/lesson/${currentLesson.id}?mode=paragraph`} className="block w-full">
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-500/30 transform transition-all duration-300 active:scale-[0.98] group flex items-center justify-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="text-sm">
                  {currentLesson.title.includes(' - ') ? currentLesson.title.split(' - ')[1] : currentLesson.title.split(': ')[1]?.replace(' Mastery', '') || 'Paragraph'} Paragraph
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* All Lessons List */}
        <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto custom-scrollbar bg-tm-bg">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Choose a Lesson</h2>
            <p className="text-slate-500 font-medium opacity-70">Select a lesson to start your practice</p>
          </div>

          <div className="flex flex-col gap-4">
            {allLessons.map((lesson, index) => {
              const isSelected = currentLessonIndex === index;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`group relative overflow-hidden flex flex-col p-6 rounded-[2rem] transition-all duration-300 cursor-pointer border-2 ${isSelected
                      ? "bg-white border-primary shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] scale-[1.02]"
                      : "bg-white/50 border-slate-100 hover:border-slate-300 hover:bg-white"
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`h-24 w-24 flex items-center justify-center bg-gradient-to-br transition-all duration-500 rounded-[2rem] mr-8 shadow-lg flex-shrink-0 text-center p-4 leading-[1.1] ${isSelected ? "from-primary to-indigo-600 shadow-primary/30" : "from-slate-200 to-slate-300 shadow-slate-200 grayscale"
                      }`}>
                      <span className={`text-[13px] font-black uppercase tracking-tighter whitespace-pre-line ${isSelected ? "text-white" : "text-slate-600"}`}>
                        {lesson.id.replace(/row-/g, 'row\n').replace(/-/g, ' ')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-xl font-black transition-colors ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                          {lesson.title}
                        </h3>
                        <span className={`text-sm font-black tracking-widest ${isSelected ? "text-primary/40" : "text-slate-300"}`}>
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <p className={`text-sm font-medium transition-colors ${isSelected ? "text-slate-500" : "text-slate-400 opacity-80"}`}>
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  {/* Row-wise Practice Buttons (Visible only when selected) */}
                  <div className={`grid grid-cols-2 gap-4 transition-all duration-500 ease-out overflow-hidden ${isSelected ? "max-h-40 mt-8 opacity-100" : "max-h-0 mt-0 opacity-0 pointer-events-none"
                    }`}>
                    <Link href={`/lesson/${lesson.id}`} className="block">
                      <button className="w-full h-full flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h12M4 14h8" /></svg>
                        Word Practice
                      </button>
                    </Link>
                    <Link href={`/lesson/${lesson.id}?mode=paragraph`} className="block">
                      <button className="w-full h-full flex items-center justify-center gap-3 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        {lesson.title.includes(' - ') ? lesson.title.split(' - ')[1] : lesson.title.split(': ')[1]?.replace(' Mastery', '') || 'Paragraph'} Paragraph
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500">
            <div className="flex items-center justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600 italic">InScript Unicode Enabled</div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600 italic">Finger Guidance Pro</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

