
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '../data/lessons';
import { keyboardRows } from '../data/keyboardLayout';
import VisualKeyboard from './VisualKeyboard';
import HandsGuidance from './HandsGuidance';
import { jsPDF } from 'jspdf';

interface TypingTutorProps {
    lesson: Lesson;
}

interface TypedChar {
    char: string;
    isCorrect: boolean;
}

// Utility to find key data for a char
const getKeyDataForChar = (char: string) => {
    for (const row of keyboardRows) {
        for (const key of row) {
            if (key.hindi === char) return { id: key.id, shift: false, finger: key.finger };
            if (key.shiftHindi === char) return { id: key.id, shift: true, finger: key.finger };
            if (key.label === char) return { id: key.id, shift: false, finger: key.finger };
        }
    }
    if (char === ' ') return { id: 'Space', shift: false, finger: 'r-thumb' };
    return { id: null, shift: false, finger: null };
};

export default function TypingTutor({ lesson }: TypingTutorProps) {
    const router = useRouter();
    const LESSON_DURATION = 300; // 5 minutes in seconds
    const [started, setStarted] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(LESSON_DURATION);
    const [typedHistory, setTypedHistory] = useState<TypedChar[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0, time: 0 });
    const [pressedKey, setPressedKey] = useState<string | null>(null);

    // Focus ref
    const inputRef = useRef<HTMLInputElement>(null);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (started && !completed) {
            interval = setInterval(() => {
                const now = Date.now();
                const elapsedSec = (now - (startTime || now)) / 1000;
                const remaining = Math.max(0, LESSON_DURATION - Math.floor(elapsedSec));

                setTimeLeft(remaining);

                // Calculate WPM: (Chars / 5) / (Minutes)
                const words = typedHistory.length / 5;
                const minutes = elapsedSec / 60;
                const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

                setStats(prev => ({
                    ...prev,
                    time: Math.round(elapsedSec),
                    wpm
                }));

                if (remaining <= 0) {
                    setCompleted(true);
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [started, completed, startTime, typedHistory.length]);

    // Utility to get Hindi char from key code
    const getCharFromKey = (code: string, shift: boolean) => {
        if (code === 'Space') return ' ';

        for (const row of keyboardRows) {
            for (const key of row) {
                if (key.id === code) {
                    return shift ? (key.shiftHindi || null) : key.hindi;
                }
            }
        }
        return null;
    };

    // Handle Input
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (completed) return;

        // Prevent default browser actions for some keys
        if (e.key === 'Backspace') {
            e.preventDefault();
            return; // Disable backspace as per rules
        }

        // Ignore modifier keys alone
        if (['Shift', 'Control', 'Alt', 'CapsLock', 'Tab'].includes(e.key)) {
            return;
        }

        if (!started) {
            setStarted(true);
            setStartTime(Date.now());
        }

        // Map physical key to Hindi char
        const mappedChar = getCharFromKey(e.code, e.shiftKey);

        // If not mapped (and not caught above), ignore
        if (!mappedChar) return;

        const inputChar = mappedChar;
        const targetChar = lesson.content[currentIndex];

        // Visual feedback
        setPressedKey(e.code);
        setTimeout(() => setPressedKey(null), 150);

        // Validation
        const isCorrect = inputChar === targetChar;
        const newHistory = [...typedHistory, { char: inputChar, isCorrect }];
        setTypedHistory(newHistory);

        // Update errors and accuracy
        if (!isCorrect) {
            setStats(prev => ({
                ...prev,
                errors: prev.errors + 1,
                accuracy: Math.round(((newHistory.length - (prev.errors + 1)) / newHistory.length) * 100)
            }));
        } else {
            setStats(prev => ({
                ...prev,
                accuracy: Math.round(((newHistory.length - prev.errors) / newHistory.length) * 100)
            }));
        }

        // Advance index or wrap if finished early
        if (currentIndex + 1 >= lesson.content.length) {
            setCurrentIndex(0); // Repeat text for the full 5 minutes
        } else {
            setCurrentIndex(prev => prev + 1);
        }

    }, [currentIndex, lesson.content, completed, started, typedHistory]);

    // Determine Active Key and Finger for Visual Guidance
    const nextTargetChar = lesson.content[currentIndex] || '';
    const { id: activeKeyId, shift: isShiftRequired, finger: activeFinger } = getKeyDataForChar(nextTargetChar);

    // Auto-focus logic
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        const handleFocus = () => inputRef.current?.focus();
        window.addEventListener('click', handleFocus);
        return () => window.removeEventListener('click', handleFocus);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add Gradient-like Header Background
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, 210, 40, 'F');

        // Add Logo/Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(99, 102, 241); // primary
        doc.text('Hindi Typing Master', 20, 25);

        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text('OFFICIAL PERFORMANCE CERTIFICATE', 20, 32);

        // Body Content
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(20);
        doc.text('Lesson Completion Report', 20, 60);

        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(20, 65, 190, 65);

        // Lesson Details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Lesson Name:`, 20, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(`${lesson.title}`, 60, 80);

        doc.setFont('helvetica', 'normal');
        doc.text(`Focus Area:`, 20, 90);
        doc.setFont('helvetica', 'bold');
        doc.text(`${lesson.description}`, 60, 90);

        doc.setFont('helvetica', 'normal');
        doc.text(`Date & Time:`, 20, 100);
        doc.setFont('helvetica', 'bold');
        doc.text(`${new Date().toLocaleString()}`, 60, 100);

        // Stats Grid
        doc.setFillColor(248, 250, 252); // slate-50
        doc.roundedRect(20, 120, 170, 80, 5, 5, 'F');

        // Stats Labels & Values
        doc.setTextColor(100, 116, 139); // slate-500
        doc.setFontSize(10);
        doc.text('TYPING SPEED', 40, 145);
        doc.text('ACCURACY', 130, 145);
        doc.text('TOTAL ERRORS', 40, 180);
        doc.text('STUDY TIME', 130, 180);

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(24);
        doc.text(`${stats.wpm} WPM`, 40, 160);
        doc.text(`${stats.accuracy}%`, 130, 160);
        doc.text(`${stats.errors}`, 40, 195);
        doc.text(`05:00`, 130, 195);

        // Encouragement
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(99, 102, 241);
        doc.text('Keep practicing to master the InScript layout!', 105, 230, { align: 'center' });

        // Footer
        doc.setDrawColor(226, 232, 240);
        doc.line(20, 270, 190, 270);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text('This is a computer-generated report from Hindi Typing Master Web Application.', 105, 280, { align: 'center' });

        doc.save(`HTM_Result_${lesson.id}.pdf`);
    };

    return (

        <div className="flex flex-col h-full max-w-7xl mx-auto p-2 md:p-4 gap-4 outline-none animate-fade-in" onKeyDown={handleKeyDown as any} tabIndex={0} ref={inputRef as any}>

            {/* Header / Stats */}
            <div className="glass-panel p-4 rounded-[1.5rem] border border-white/20 shadow-lg flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-xl shadow-md border border-white/10">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-black bg-slate-900 bg-clip-text text-transparent">{lesson.title}</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{lesson.description}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">InScript</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                    <div className="bg-slate-900 text-white min-w-[90px] p-1.5 px-3 rounded-xl shadow-md flex flex-col items-center justify-center border border-white/10">
                        <span className="text-[8px] font-black uppercase text-white/40 tracking-widest mb-0.5">Time</span>
                        <span className={`text-lg font-black tabular-nums ${timeLeft < 30 ? 'text-accent animate-pulse' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                    </div>
                    <div className="glass-card min-w-[80px] p-1.5 px-3 rounded-xl flex flex-col items-center justify-center border border-slate-200">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-0.5">WPM</span>
                        <span className="text-lg font-black text-primary tabular-nums">{stats.wpm}</span>
                    </div>
                    <div className="glass-card min-w-[80px] p-1.5 px-3 rounded-xl flex flex-col items-center justify-center border border-slate-200">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Accuracy</span>
                        <span className="text-lg font-black text-secondary tabular-nums">{stats.accuracy}%</span>
                    </div>
                    <div className="glass-card min-w-[80px] p-1.5 px-3 rounded-xl flex flex-col items-center justify-center border border-slate-200">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Errors</span>
                        <span className="text-lg font-black text-accent tabular-nums">{stats.errors}</span>
                    </div>
                </div>
            </div>

            {/* Typing Display Area */}
            <div className="glass-panel p-5 md:p-8 rounded-[2rem] shadow-xl border-white/30 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 hindi-text text-3xl md:text-4xl leading-[1.8] select-none break-words min-h-[140px]">
                    {lesson.content.split('').map((char, idx) => {
                        let colorClass = "text-slate-300";
                        if (idx < currentIndex) {
                            const historyIndex = typedHistory.length - (currentIndex - idx);
                            const historyItem = typedHistory[historyIndex];
                            if (historyItem) {
                                colorClass = historyItem.isCorrect ? "text-slate-400" : "text-accent bg-accent/10 rounded px-1";
                            }
                        } else if (idx === currentIndex) {
                            colorClass = "text-white bg-primary px-2 py-0.5 rounded-xl shadow-[0_5px_15px_rgba(99,102,241,0.4)] scale-105 inline-block ring-4 ring-primary/10 mx-0.5 transition-all duration-300";
                        }
                        return (
                            <span key={idx} className={`${colorClass} transition-all duration-200`}>
                                {char === ' ' ? ' ' : char}
                            </span>
                        );
                    })}
                </div>


                <div className="border-t border-slate-200/50 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {!started ? (
                        <div className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-xl font-black text-[10px] animate-pulse border border-primary/20">
                            START TYPING TO BEGIN
                        </div>
                    ) : (
                        <button
                            onClick={() => setCompleted(true)}
                            className="flex items-center gap-2 bg-accent/10 hover:bg-accent text-accent hover:text-white px-4 py-2 rounded-xl font-black text-[10px] transition-all border border-accent/20 active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            SUBMIT TEST NOW
                        </button>
                    )}

                    {/* Input Echo */}
                    <div className="flex items-center gap-2 bg-slate-900/5 p-1.5 px-3 rounded-xl border border-slate-200 max-w-xs w-full">
                        <span className="text-slate-400 text-[8px] font-black uppercase tracking-tighter shrink-0">Echo:</span>
                        <div className="overflow-hidden whitespace-nowrap mask-fade-right flex-1 text-slate-600 font-medium text-sm">
                            {typedHistory.slice(-15).map((item, i) => (
                                <span key={i} className={item.isCorrect ? "opacity-30" : "text-accent font-black underline"}>
                                    {item.char}
                                </span>
                            ))}
                            <span className="w-1 h-3.5 bg-primary inline-block animate-pulse ml-1 rounded-full align-middle"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Keyboard & Hands Guidance */}
            <div className="mt-2 glass-panel p-4 md:p-6 rounded-[2rem] border-white/40 shadow-lg flex flex-col items-center gap-4">
                <VisualKeyboard
                    activeKeyId={activeKeyId}
                    pressedKeyId={pressedKey}
                    isShiftRequired={isShiftRequired}
                />

                <div className="w-full max-w-3xl flex flex-col items-center gap-2">
                    <div className="w-full flex items-center gap-3 opacity-10">
                        <div className="h-[1px] flex-1 bg-slate-900"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Finger Placement</span>
                        <div className="h-[1px] flex-1 bg-slate-900"></div>
                    </div>
                    <div className="scale-75 md:scale-90 origin-top">
                        <HandsGuidance activeFinger={activeFinger} />
                    </div>
                </div>
            </div>


            {/* Result Modal */}
            {completed && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white/90 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.5)] max-w-2xl w-full text-center border border-white/40 group overflow-hidden relative">
                        {/* Decorative background for modal */}
                        <div className="absolute top-[-20%] left-[-20%] w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="absolute bottom-[-20%] right-[-20%] w-80 h-80 bg-secondary/20 rounded-full blur-[100px] -z-10 group-hover:scale-110 transition-transform duration-700"></div>

                        <div className="mb-10">
                            <div className="inline-block p-6 bg-slate-900 text-white rounded-[2rem] mb-6 shadow-2xl transform hover:rotate-6 transition-transform">
                                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Lesson Complete!</h2>
                            <p className="text-slate-500 font-medium">Outstanding work. Here is your proficiency breakdown.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-primary/30 transition-all">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2">Speed</span>
                                <div className="text-4xl font-black text-slate-900">{stats.wpm} <span className="text-sm text-slate-400">WPM</span></div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-secondary/30 transition-all">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2">Accuracy</span>
                                <div className="text-4xl font-black text-slate-900">{stats.accuracy}<span className="text-sm text-slate-400">%</span></div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-accent/30 transition-all">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2">Errors</span>
                                <div className="text-4xl font-black text-slate-900">{stats.errors}</div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:bg-slate-50">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2">Completion Time</span>
                                <div className="text-4xl font-black text-slate-900">05:00</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-4 md:py-5 px-6 rounded-2xl transition-all active:scale-95 border border-slate-200 text-sm"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={downloadPDF}
                                className="flex-1 bg-primary text-white hover:bg-primary-dark font-black py-4 md:py-5 px-6 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg>
                                <span>PDF Report</span>
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="flex-[1.5] bg-slate-900 hover:bg-black text-white font-black py-4 md:py-5 px-6 rounded-2xl shadow-xl transition-all active:scale-95 group flex items-center justify-center gap-3 text-sm"
                            >
                                <span>Dashboard</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <input
                ref={inputRef}
                type="text"
                className="opacity-0 absolute top-0 left-0 h-0 w-0"
                autoFocus
                onBlur={(e) => e.target.focus()}
            />
        </div>

    );
}
