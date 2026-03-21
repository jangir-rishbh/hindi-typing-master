'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { lessonsConfig, getAllLessons } from '../data/lessonsConfig';

function HomeContent() {
  const allLessons = getAllLessons();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize from URL search param if available
  const initialIndex = parseInt(searchParams.get('index') || '0', 10);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(initialIndex);
  
  // Update state if URL param changes
  useEffect(() => {
    const urlIndex = parseInt(searchParams.get('index') || '0', 10);
    if (urlIndex !== currentLessonIndex && urlIndex >= 0 && urlIndex < allLessons.length) {
      setCurrentLessonIndex(urlIndex);
    }
  }, [searchParams, allLessons.length]);

  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const totalLessons = allLessons.length;

  const updateUrlIndex = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('index', index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      const newIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(newIndex);
      updateUrlIndex(newIndex);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      const newIndex = currentLessonIndex - 1;
      setCurrentLessonIndex(newIndex);
      updateUrlIndex(newIndex);
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
          <div className="mb-4 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-2">Choose Your Lesson</h2>
                <p className="text-sm md:text-base text-slate-600 font-medium">Master Hindi typing step by step</p>
              </div>
            </div>
          </div>

          {/* Single Lesson Display */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl px-2 md:px-0">
              <div
                className="group relative overflow-hidden flex flex-col p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 border-2 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 border-indigo-400 shadow-[0_25px_50px_-20px_rgba(99,102,241,0.25)] scale-[1.02] ring-4 ring-indigo-400/20"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-100"></div>
                
                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-bl-full opacity-20 scale-100"></div>
                
                <div className="flex flex-col md:flex-row items-center relative z-10 gap-4 md:gap-8">
                  <div className="h-20 w-20 md:h-28 md:w-28 flex items-center justify-center bg-gradient-to-br transition-all duration-500 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl flex-shrink-0 text-center p-3 md:p-4 leading-[1.1] transform group-hover:scale-110 group-hover:rotate-3 from-indigo-500 via-purple-500 to-pink-500 shadow-indigo-500/40 ring-4 ring-white/50">
                    <span className="text-[10px] md:text-[12px] font-black uppercase tracking-tighter whitespace-pre-line text-white drop-shadow-lg">
                      {currentLesson.id.replace(/row-/g, 'row\n').replace(/-/g, ' ')}
                    </span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg md:text-2xl font-black transition-all duration-300 text-slate-900">
                        {currentLesson.title}
                      </h3>
                      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-black text-xs md:text-sm transition-all duration-500 transform group-hover:scale-110 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                        {(currentLessonIndex + 1).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <p className="text-xs md:text-sm font-medium transition-all duration-300 text-slate-600">
                      {currentLesson.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 w-3/4"></div>
                      </div>
                      <span className="text-xs font-black transition-all duration-300 text-indigo-600">
                        75%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Practice Buttons */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 transition-all duration-700 ease-out overflow-hidden max-h-48 mt-6 md:mt-8 opacity-100">
                  <Link href={`/lesson/${currentLesson.id}`} className="block transform transition-all duration-300 hover:scale-105">
                    <button className="w-full h-full flex items-center justify-center gap-3 px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-black rounded-xl md:rounded-2xl text-sm md:text-base transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 group/btn">
                      <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h12M4 14h8" /></svg>
                      <span>Word Practice</span>
                      <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </Link>
                  <Link href={`/lesson/${currentLesson.id}?mode=paragraph`} className="block transform transition-all duration-300 hover:scale-105">
                    <button className="w-full h-full flex items-center justify-center gap-3 px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black rounded-xl md:rounded-2xl text-sm md:text-base transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 group/btn">
                      <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="text-xs md:text-sm">{currentLesson.title.includes(' - ') ? currentLesson.title.split(' - ')[1] : currentLesson.title.split(': ')[1]?.replace(' Mastery', '') || 'Paragraph'} Paragraph</span>
                      <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 relative z-20">
            <div className="flex items-center gap-3 md:gap-6 bg-white/60 backdrop-blur-sm p-2 rounded-[1.5rem] border border-slate-200 shadow-sm">
                <button 
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className="p-3 md:px-5 md:py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-bold hidden sm:inline text-sm md:text-base">Previous</span>
                </button>
                <div className="px-4 md:px-6 py-2 md:py-3 bg-indigo-50 rounded-xl md:rounded-2xl border-2 border-indigo-100 min-w-[80px] md:min-w-[120px] text-center">
                  <span className="text-sm md:text-base font-black text-indigo-900 tracking-wider">
                    {(currentLessonIndex + 1).toString().padStart(2, '0')} <span className="text-indigo-300 mx-1">/</span> {allLessons.length.toString().padStart(2, '0')}
                  </span>
                </div>
                <button 
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className="p-3 md:px-6 md:py-3.5 rounded-2xl bg-indigo-600 border-2 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                >
                  <span className="font-bold hidden sm:inline text-sm md:text-base">Next</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
            </div>
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-black text-2xl animate-pulse">LOADING LESSONS...</div>}>
      <HomeContent />
    </Suspense>
  );
}

