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
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{textShadow: 'none'}}>Typing </span>
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

          <div className="relative z-10 pt-8">
            <Link href={`/lesson/${currentLesson.id}`} className="block w-full">
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-indigo-500/30 transform transition-all duration-300 active:scale-[0.98] group flex items-center justify-center gap-3">
                <span className="text-base">Start Lesson {currentLessonIndex + 1}</span>
                <span className="group-hover:translate-x-1 transition-transform text-lg">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Single Lesson Display */}
        <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto custom-scrollbar bg-tm-bg">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Current Lesson</h2>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Lesson {currentLessonIndex + 1} of {totalLessons}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-400 uppercase tracking-tighter">{(currentLessonIndex + 1).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {currentLesson && (
            <div className="animate-slide-up">
              <Link href={`/lesson/${currentLesson.id}`} className="block group">
                <div className="flex items-center p-8 bg-white rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 hover:-translate-y-0.5">
                  <div className="h-16 w-16 flex items-center justify-center bg-primary text-white font-black text-2xl rounded-xl mr-6 group-hover:bg-primary-dark transition-all duration-300 shadow-md">
                    {currentLesson.id.toString().padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-800 group-hover:text-primary transition-colors">{currentLesson.title}</h3>
                    <p className="text-base text-slate-500 font-medium opacity-80 mt-2">{currentLesson.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <span className="text-slate-400 group-hover:text-primary transition-colors text-xl">→</span>
                  </div>
                </div>
              </Link>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 gap-4">
                <button
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-300 ${
                    currentLessonIndex === 0
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:-translate-y-0.5 active:scale-[0.98]'
                  }`}
                >
                  <span className="text-lg">←</span>
                  <span>Previous</span>
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalLessons }, (_, i) => i + 1).map((lessonNum) => (
                    <button
                      key={lessonNum}
                      onClick={() => setCurrentLessonIndex(lessonNum - 1)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        lessonNum - 1 === currentLessonIndex
                          ? 'bg-primary w-8'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to lesson ${lessonNum}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === totalLessons - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-300 ${
                    currentLessonIndex === totalLessons - 1
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 active:scale-[0.98] shadow-md'
                  }`}
                >
                  <span>Next</span>
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          )}

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

