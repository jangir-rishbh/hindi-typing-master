import React from 'react';
import Link from 'next/link';
import { lessons } from '../data/lessons';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl w-full glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-white/20 shadow-2xl">

        {/* Sidebar / Info Panel */}
        <div className="w-full md:w-[35%] bg-slate-900/40 backdrop-blur-xl text-white p-10 flex flex-col justify-between border-r border-white/10 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-[-10%] left-[-10%] w-60 h-60 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 bg-accent/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <div className="inline-block p-3 bg-white/10 rounded-2xl mb-8 backdrop-blur-md border border-white/10">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 011-1h2" />
              </svg>
            </div>

            <h1 className="text-5xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent italic">Hindi</span><br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Typing Master</span>
            </h1>

            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-12 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20"></span>
              InScript Layout Specialist
            </p>

            <div className="space-y-6">
              <div className="group transition-all duration-300">
                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 px-1">Current Mastery</h3>
                <div className="glass-card p-5 rounded-2xl border border-white/5 group-hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold">Newbie Mode</span>
                    <span className="text-primary text-xs font-black">0% Done</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[5%] h-full bg-gradient-to-r from-primary to-secondary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10">
            <Link href="/lesson/1" className="block w-full">
              <button className="w-full bg-white text-slate-900 hover:bg-primary hover:text-white font-black py-5 px-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transform transition-all duration-300 active:scale-[0.98] group flex items-center justify-center gap-3">
                <span className="text-lg">Get Started</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Lesson List */}
        <div className="w-full md:w-[65%] p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Learning Path</h2>
              <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Master the InScript layout step-by-step</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-slate-100 uppercase tracking-tighter">Course</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {lessons.map((lesson, idx) => (
              <Link href={`/lesson/${lesson.id}`} key={lesson.id} className="block group animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center p-6 bg-white/40 border border-slate-200/50 rounded-2xl hover:border-primary/50 hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <div className="h-14 w-14 flex items-center justify-center bg-slate-900 text-white font-black text-xl rounded-2xl mr-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    {lesson.id.toString().padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors">{lesson.title}</h3>
                    <p className="text-sm text-slate-500 font-medium opacity-80">{lesson.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <span className="text-slate-300 group-hover:text-primary transition-colors">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 italic">InScript Unicode Enabled</div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 italic">Finger Guidance Pro</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

