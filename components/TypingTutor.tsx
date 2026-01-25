
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
    // Custom finger mappings for home row keys
    const customFingerMappings: Record<string, string> = {
        'े': 'l-ring',  // S key (े)
        '्': 'l-middle', // D key (्) - corrected to middle finger
        'ि': 'l-index', // F key (ि)
        ' ': 'r-thumb'  // Space
    };

    // Check if this character has a custom finger mapping
    if (customFingerMappings[char]) {
        for (const row of keyboardRows) {
            for (const key of row) {
                if (key.hindi === char) return { id: key.id, shift: false, finger: customFingerMappings[char] };
                if (key.shiftHindi === char) return { id: key.id, shift: true, finger: customFingerMappings[char] };
                if (key.label === char) return { id: key.id, shift: false, finger: customFingerMappings[char] };
            }
        }
        if (char === ' ') return { id: 'Space', shift: false, finger: customFingerMappings[char] };
    }

    // Default behavior for other keys
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

    // Transform lesson content into unique words repeated 3 times
    const words = useMemo(() => {
        const rawWords = lesson.content.trim().split(/\s+/);
        // Get unique words only to ensure "ak font sirf tin baar aaye" (each word only 3 times)
        const uniqueWords = Array.from(new Set(rawWords));
        const processed: string[] = [];
        uniqueWords.forEach(word => {
            processed.push(word, word, word);
        });
        return processed;
    }, [lesson.content]);

    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [pauseTime, setPauseTime] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [showTimeSelection, setShowTimeSelection] = useState(false);
    const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0, totalTyped: 0 });

    // New Progression State
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [charIndexInWord, setCharIndexInWord] = useState(0);
    const [wordTypedHistory, setWordTypedHistory] = useState<TypedChar[]>([]);
    const [incorrectChars, setIncorrectChars] = useState<string[]>([]);
    const [pressedKey, setPressedKey] = useState<string | null>(null);
    const [isWrongKey, setIsWrongKey] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (started && !completed && !paused && selectedTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const elapsedSec = (now - (startTime || now)) / 1000;
                const remaining = Math.max(0, selectedTime - Math.floor(elapsedSec));

                setTimeLeft(remaining);

                // Calculate WPM
                const wordsTyped = stats.totalTyped / 5;
                const minutes = elapsedSec / 60;
                const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

                setStats(prev => ({ ...prev, wpm }));

                if (remaining <= 0) {
                    setCompleted(true);
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [started, completed, paused, startTime, selectedTime, stats.totalTyped]);

    const getCharFromKey = (code: string, shift: boolean) => {
        if (code === 'Space') return ' ';
        for (const row of keyboardRows) {
            for (const key of row) {
                if (key.id === code) return shift ? (key.shiftHindi || null) : key.hindi;
            }
        }
        return null;
    };

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (completed || !selectedTime || !started || paused) return;
        if (e.key === 'Backspace') { e.preventDefault(); return; }
        if (['Shift', 'Control', 'Alt', 'CapsLock', 'Tab'].includes(e.key)) return;

        const mappedChar = getCharFromKey(e.code, e.shiftKey);
        if (!mappedChar) return;

        const currentWord = words[currentWordIndex];
        const targetChar = charIndexInWord < currentWord.length ? currentWord[charIndexInWord] : ' ';
        const isCorrect = mappedChar === targetChar;

        // Visual feedback
        setPressedKey(e.code);
        
        // Check if this is a wrong key press
        const isWrongKeyPressed = !isCorrect && mappedChar !== ' ';
        setIsWrongKey(isWrongKeyPressed);
        
        setTimeout(() => {
            setPressedKey(null);
            setIsWrongKey(false);
        }, 150);

        // Validation & Progress
        if (charIndexInWord < currentWord.length) {
            // Typing characters of the word
            setWordTypedHistory(prev => [...prev, { char: mappedChar, isCorrect }]);
            setCharIndexInWord(prev => prev + 1);
            if (!isCorrect) {
                setIncorrectChars(prev => [...prev, mappedChar]);
            }
            setStats(prev => ({
                ...prev,
                totalTyped: prev.totalTyped + 1,
                errors: isCorrect ? prev.errors : prev.errors + 1,
                accuracy: Math.round(((prev.totalTyped + 1 - (isCorrect ? prev.errors : prev.errors + 1)) / (prev.totalTyped + 1)) * 100)
            }));
        } else if (charIndexInWord === currentWord.length && mappedChar === ' ') {
            // Finished word, user pressed space
            if (currentWordIndex + 1 >= words.length) {
                setCompleted(true);
            } else {
                setCurrentWordIndex(prev => prev + 1);
                setCharIndexInWord(0);
                setWordTypedHistory([]);
            }
            setStats(prev => ({ ...prev, totalTyped: prev.totalTyped + 1 }));
        }

    }, [currentWordIndex, charIndexInWord, words, completed, started, paused]);

    // Active Guidance
    const currentWord = words[currentWordIndex] || '';
    const activeChar = charIndexInWord < currentWord.length ? currentWord[charIndexInWord] : ' ';
    const { id: activeKeyId, shift: isShiftRequired, finger: activeFinger } = getKeyDataForChar(activeChar);

    // Auto-focus logic
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        const handleFocus = () => inputRef.current?.focus();
        window.addEventListener('click', handleFocus);
        return () => window.removeEventListener('click', handleFocus);
    }, []);

    const handlePauseResume = () => {
        if (paused) {
            // Resume: adjust start time to account for pause duration
            if (pauseTime && startTime) {
                const pauseDuration = Date.now() - pauseTime;
                setStartTime(startTime + pauseDuration);
            }
            setPaused(false);
            setPauseTime(null);
        } else {
            // Pause: record pause time
            setPaused(true);
            setPauseTime(Date.now());
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(99, 102, 241);
        doc.text('Hindi Typing Master', 20, 25);
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text('OFFICIAL PERFORMANCE CERTIFICATE', 20, 32);
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(20);
        doc.text('Lesson Completion Report', 20, 60);
        doc.setDrawColor(226, 232, 240);
        doc.line(20, 65, 190, 65);
        doc.setFontSize(12);
        doc.text(`Lesson: ${lesson.title}`, 20, 80);
        doc.text(`WPM: ${stats.wpm}`, 20, 95);
        doc.text(`Accuracy: ${stats.accuracy}%`, 20, 110);
        doc.text(`Errors: ${stats.errors}`, 20, 125);
        doc.save(`HTM_Result_${lesson.id}.pdf`);
    };

    return (
        <div className="flex flex-col h-full w-full outline-none animate-fade-in" onKeyDown={handleKeyDown} tabIndex={0}>
            {/* Stats Header (Flushed to Top) */}
            <div className="glass-panel p-1 rounded-none border-x-0 border-t-0 border-white/20 shadow-lg flex flex-wrap justify-between items-center gap-2 w-full flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-xl shadow-md border border-white/10">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-black bg-slate-900 bg-clip-text text-transparent">{lesson.title}</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{lesson.description}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs items-center">
                    <div className="bg-slate-900 text-white min-w-[90px] p-1.5 px-3 rounded-xl flex flex-col items-center border border-white/10">
                        <span className="text-[8px] font-black uppercase text-white/40 mb-0.5">Time</span>
                        <span className="text-base font-black">
                            {selectedTime ? formatTime(timeLeft) : "--:--"}
                        </span>
                    </div>
                    <div className="glass-card min-w-[80px] p-1.5 px-3 rounded-xl flex flex-col items-center border border-slate-200">
                        <span className="text-[8px] font-black uppercase text-slate-400 mb-0.5">WPM</span>
                        <span className="text-base font-black text-primary">{stats.wpm}</span>
                    </div>
                    <div className="glass-card min-w-[80px] p-1.5 px-3 rounded-xl flex flex-col items-center border border-slate-200">
                        <span className="text-[8px] font-black uppercase text-slate-400 mb-0.5">Accuracy</span>
                        <span className="text-base font-black text-secondary">{stats.accuracy}%</span>
                    </div>
                    {started ? (
                        <button
                            onClick={handlePauseResume}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-black px-4 py-2 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            {paused ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs">Resume</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs">Pause</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowTimeSelection(true)}
                            className="bg-primary hover:bg-primary-dark text-white font-black px-4 py-2 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs">Start Lesson</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Word Display Area (Compact) */}
            <div className="glass-panel p-2 md:p-3 rounded-[1rem] shadow-xl border-white/30 flex flex-col items-center gap-2 relative overflow-hidden min-h-[100px] justify-center flex-shrink-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex flex-wrap justify-center gap-6 relative z-10">
                    {words.slice(currentWordIndex, currentWordIndex + 3).map((word, idx) => {
                        const isCurrent = idx === 0;
                        const currentWord = words[currentWordIndex];
                        const isSameWord = word === currentWord;
                        
                        if (!isSameWord) return null;
                        
                        return (
                            <div key={`${currentWordIndex}-${idx}`} className={`flex flex-col items-center transition-all duration-500 ${isCurrent ? 'scale-110' : 'scale-90 opacity-60'}`}>
                                <div className={`hindi-text text-3xl md:text-4xl font-bold p-4 rounded-2xl transition-all ${isCurrent ? 'bg-primary/10 text-primary shadow-[0_10px_30px_-10px_rgba(99,102,241,0.4)] border-2 border-primary/20' : 'bg-slate-100 text-slate-600 border-2 border-slate-200'}`}>
                                    {word.split('').map((char, cIdx) => {
                                        if (isCurrent) {
                                            let charColor = "text-slate-800"; // Default
                                            if (cIdx < charIndexInWord) {
                                                charColor = wordTypedHistory[cIdx]?.isCorrect ? "text-emerald-500" : "text-rose-500";
                                            }
                                            return <span key={cIdx} className={charColor}>{char}</span>;
                                        } else {
                                            return <span key={cIdx} className="text-slate-600">{char}</span>;
                                        }
                                    })}
                                </div>
                                {isCurrent && (
                                    <div className="mt-4 flex gap-1.5 animate-fade-in">
                                        {Array.from({ length: word.length }).map((_, i) => (
                                            <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i === charIndexInWord ? 'bg-primary animate-pulse w-9' : (i < charIndexInWord ? 'bg-emerald-500/30' : 'bg-slate-200')}`}></div>
                                        ))}
                                        <div className={`h-1.5 w-6 rounded-full border-2 border-dashed border-primary/40 ${charIndexInWord === word.length ? 'bg-primary animate-bounce' : 'bg-transparent'}`}></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {!selectedTime && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex items-center justify-center rounded-[2rem]">
                        <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest animate-pulse shadow-2xl">
                            CLICK "START LESSON" TO SELECT TIME
                        </div>
                    </div>
                )}

                {selectedTime && !started && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex items-center justify-center rounded-[2rem]">
                        <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest animate-pulse shadow-2xl">
                            START TYPING THE FIRST WORD TO BEGIN
                        </div>
                    </div>
                )}

                {started && paused && (
                    <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-sm z-30 flex items-center justify-center rounded-[2rem]">
                        <div className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest animate-pulse shadow-2xl flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            LESSON PAUSED - CLICK RESUME TO CONTINUE
                        </div>
                    </div>
                )}
            </div>

            {/* Keyboard Guidance (Full Width) */}
            <div className="glass-panel p-2 md:p-3 rounded-none border-x-0 border-white/40 shadow-lg flex flex-col items-center gap-2 w-full flex-shrink-0">
                <VisualKeyboard 
                    activeKeyId={activeKeyId} 
                    pressedKeyId={pressedKey} 
                    isShiftRequired={isShiftRequired} 
                    activeLessonId={lesson.id} 
                    lessonKeys={lesson.keys}
                    isWrongKey={isWrongKey}
                />
                <div className="w-full">
                    <HandsGuidance 
                        activeFinger={activeFinger} 
                        pressedKeyId={pressedKey} 
                        activeLessonId={lesson.id} 
                        lessonKeys={lesson.keys} 
                    />
                </div>
            </div>

            {/* Time Selection Modal */}
            {showTimeSelection && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-xl w-full text-center relative overflow-hidden">
                        <h2 className="text-3xl font-black mb-8">Select Lesson Duration</h2>
                        <p className="text-slate-600 mb-8">Choose how long you want to practice this lesson</p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[5, 10, 15, 20, 30].map((minutes) => (
                                <button
                                    key={minutes}
                                    onClick={() => {
                                        setSelectedTime(minutes * 60);
                                        setTimeLeft(minutes * 60);
                                        setShowTimeSelection(false);
                                        setStarted(true);
                                        setStartTime(Date.now());
                                    }}
                                    className="bg-slate-50 hover:bg-primary hover:text-white p-6 rounded-3xl transition-all duration-300 border-2 border-slate-200 hover:border-primary"
                                >
                                    <div className="text-2xl font-black">{minutes}</div>
                                    <div className="text-xs font-bold uppercase text-slate-400">Minutes</div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowTimeSelection(false)}
                            className="bg-slate-100 hover:bg-slate-200 px-8 py-3 rounded-2xl font-black transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Results Modal */}
            {completed && selectedTime && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-2xl w-full text-center relative overflow-hidden">
                        <h2 className="text-3xl font-black mb-8">Lesson Complete!</h2>

                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Time Selected</span>
                                <div className="text-2xl font-black">{selectedTime / 60} min</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Characters Typed</span>
                                <div className="text-2xl font-black">{stats.totalTyped}</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Correct Characters</span>
                                <div className="text-2xl font-black">{stats.totalTyped - stats.errors}</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Errors</span>
                                <div className="text-2xl font-black">{stats.errors}</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Accuracy</span>
                                <div className="text-2xl font-black">{stats.accuracy}%</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">WPM / CPM</span>
                                <div className="text-2xl font-black">{stats.wpm} WPM</div>
                            </div>
                            {incorrectChars.length > 0 && (
                                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-200 col-span-3">
                                    <span className="text-[10px] font-black uppercase text-red-600 block mb-2">गलत अक्षर (Incorrect Characters)</span>
                                    <div className="flex flex-wrap gap-2">
                                        {incorrectChars.map((char, index) => (
                                            <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-lg font-bold border border-red-300">
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setStarted(false);
                                    setPaused(false);
                                    setStartTime(null);
                                    setPauseTime(null);
                                    setSelectedTime(null);
                                    setTimeLeft(0);
                                    setCompleted(false);
                                    setCurrentWordIndex(0);
                                    setCharIndexInWord(0);
                                    setWordTypedHistory([]);
                                    setIncorrectChars([]);
                                    setStats({ wpm: 0, accuracy: 100, errors: 0, totalTyped: 0 });
                                }}
                                className="flex-1 bg-slate-100 py-4 rounded-2xl font-black"
                            >
                                Try Again
                            </button>
                            <button onClick={() => router.push('/')} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black">Dashboard</button>
                        </div>
                    </div>
                </div>
            )}

            <input ref={inputRef} type="text" className="opacity-0 absolute" autoFocus onBlur={(e) => e.target.focus()} />
        </div>
    );
}
