import React from 'react';
import Link from 'next/link';
import { lessons } from '../data/lessons';

export default function Home() {
  return (
    <main className="min-h-screen flex items-stretch justify-center p-0 md:p-0 animate-fade-in w-full overflow-x-hidden">
      <div className="max-w-7xl w-full bg-tm-panel rounded-none md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-screen md:min-h-[800px] border border-white/20 shadow-2xl relative z-10">

        {/* Sidebar / Info Panel */}
        <div className="w-full md:w-[35%] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-12 flex flex-col justify-between border-r border-slate-700 relative overflow-hidden shadow-xl">
          {/* Decorative background element */}
          <div className="absolute top-[-10%] left-[-10%] w-60 h-60 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 bg-accent/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <div className="inline-block p-2 bg-white/10 rounded-xl mb-6 backdrop-blur-sm border border-white/10">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 011-1h2" />
              </svg>
            </div>

            <h1 className="text-4xl font-black mb-3 leading-tight text-white">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent italic">Hindi</span><br />
              <span className="text-primary text-glow">Typing Master</span>
            </h1>

            <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/30"></span>
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

              <div className="mt-8 space-y-4">
                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 px-1">Key Features</h3>
                <div className="flex items-center gap-4 text-white/80">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm">Unicode InScript Layout Support</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l7.859 4.331m-7.859-4.331a18.252 18.252 0 014.286 9.473m-4.286-9.473c1.954-2.234 3.737-3.953 5.405-5.526M6.47 16.035l-3.345 5.254a1.18 1.18 0 001.381 1.649l5.859-3.411m-5.859 3.411a18.252 18.252 0 01-5.859-3.411m-5.859 3.411c-2.234 1.954-3.953 3.737-5.526 5.405M17.188 2.239l-7.859 4.331m7.859-4.331a18.252 18.252 0 01-4.286 9.473m4.286-9.473c-1.954-2.234-3.737-3.953-5.405-5.526" />
</svg>
                  <span className="text-sm">Interactive Finger Guidance</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  <span className="text-sm">Real-time WPM & Accuracy Tracking</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M3 13h2a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>
                  <span className="text-sm">Personalized Lesson Progression</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10">
            <Link href="/lesson/1" className="block w-full">
              <button className="w-full bg-primary text-white hover:bg-primary-dark font-black py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.2)] transform transition-all duration-300 active:scale-[0.98] group flex items-center justify-center gap-3">
                <span className="text-base">Get Started</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Lesson List */}
        <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto custom-scrollbar bg-tm-bg">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Learning Path</h2>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Master the InScript layout step-by-step</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Course</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {lessons.map((lesson, idx) => (
              <Link href={`/lesson/${lesson.id}`} key={lesson.id} className="block group animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center p-5 bg-white rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 hover:-translate-y-0.5">
                  <div className="h-12 w-12 flex items-center justify-center bg-primary text-white font-black text-lg rounded-xl mr-5 group-hover:bg-primary-dark transition-all duration-300 shadow-md">
                    {lesson.id.toString().padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-slate-800 group-hover:text-primary transition-colors">{lesson.title}</h3>
                    <p className="text-sm text-slate-500 font-medium opacity-80">{lesson.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <span className="text-slate-400 group-hover:text-primary transition-colors">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-slate-500">
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

