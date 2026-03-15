
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { lessonsConfig, getLessonById } from '../data/lessonsConfig';
import { keyboardRows } from '../data/keyboardLayout';
import VisualKeyboard from './VisualKeyboard';
import HandsGuidance from './HandsGuidance';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabase';

interface TypingTutorProps {
    lessonId: string;
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

export default function TypingTutor({ lessonId }: TypingTutorProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isParagraphMode = searchParams.get('mode') === 'paragraph';

    // Get lesson configuration
    const lesson = getLessonById(lessonId);

    if (!lesson) {
        return <div>Lesson not found</div>;
    }

    // Home row characters for mixing
    const homeRowCharacters = ['ो', 'ओ', 'े', 'ए', '्', 'अ', 'ि', 'इ', 'ु', 'उ', 'प', 'फ', 'र', 'ऱ', 'क', 'ख', 'त', 'थ', 'च', 'छ', 'ट', 'ठ'];

    // State for Supabase Passage
    const [supabaseParagraph, setSupabaseParagraph] = useState<string | null>(null);
    const [isLoadingPassage, setIsLoadingPassage] = useState(false);

    // Fetch Paragraph from Supabase
    useEffect(() => {
        if (isParagraphMode && lesson) {
            console.log("Fetching passage for lesson ID:", lesson.id);
            const fetchPassage = async () => {
                setIsLoadingPassage(true);
                try {
                    const { data, error } = await supabase
                        .from('paragraphs')
                        .select('text')
                        .eq('lesson_id', lesson.id)
                        .single();
                    
                    if (error) {
                        console.error("Supabase Error:", error.message);
                    }

                    if (data && !error && data.text) {
                        console.log("Successfully fetched passage from Supabase");
                        setSupabaseParagraph(data.text);
                    } else {
                        console.log("No passage found in Supabase or error occurred, using fallback.");
                        setSupabaseParagraph(null);
                    }
                } catch (e) {
                    console.error("Fetch Exception:", e);
                    setSupabaseParagraph(null);
                } finally {
                    setIsLoadingPassage(false);
                }
            };
            fetchPassage();
        }
    }, [isParagraphMode, lesson?.id]);

    // Generate typing prompt — word mode repeats each word 6x, paragraph mode uses natural text once
    const generateTypingPrompt = useCallback(() => {
        if (isParagraphMode) {
            const textToUse = supabaseParagraph || (lesson as any).paragraphText || lesson.paragraph || "Database/Config passage not found.";
            return textToUse.trim().split(/\s+/);
        }
        const rawWords = lesson.content.trim().split(/\s+/);
        const processed: string[] = [];
        rawWords.forEach(word => {
            processed.push(word, word, word, word, word, word);
        });
        return processed;
    }, [lesson.content, lesson.paragraph, isParagraphMode, supabaseParagraph, lesson]);

    // Reset typing prompt state on lesson change
    useEffect(() => {
        // Reset all typing-related state when lesson changes
        setCurrentWordIndex(0);             // Reset cursor / target index
        setCharIndexInWord(0);             // Reset character position
        setWordTypedHistory([]);           // Clear typing history
        setIncorrectChars([]);             // Clear errors
        setStats({ wpm: 0, accuracy: 100, errors: 0, totalTyped: 0 });
        setCompleted(false);
        setStarted(false);
        setPaused(false);
    }, [lessonId, lesson.content]); // Trigger on lesson change

    // Transform lesson content into typing prompt
    const words = useMemo(() => {
        return generateTypingPrompt();
    }, [generateTypingPrompt]);

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
    const [typedText, setTypedText] = useState<string>('');

    // Reset function for lesson restart/change
    const resetLesson = useCallback(() => {
        setCurrentWordIndex(0);             // Reset cursor / target index
        setCharIndexInWord(0);             // Reset character position
        setWordTypedHistory([]);           // Clear typing history
        setIncorrectChars([]);             // Clear errors
        setTypedText('');                   // Clear paragraph typed text
        setStats({ wpm: 0, accuracy: 100, errors: 0, totalTyped: 0 });
        setCompleted(false);
        setStarted(false);
        setPaused(false);
        setTimeLeft(selectedTime || 0);
    }, [selectedTime]);
    const [pressedKey, setPressedKey] = useState<string | null>(null);
    const [isWrongKey, setIsWrongKey] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const activeWordRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    // Auto-scroll logic for paragraph practice
    useEffect(() => {
        if (isParagraphMode && activeWordRef.current) {
            activeWordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentWordIndex, isParagraphMode]);

    useEffect(() => {
        if (isParagraphMode && cursorRef.current) {
            cursorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [typedText, isParagraphMode]);

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

    // Audio feedback setup
    const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null);
    const [wrongSound, setWrongSound] = useState<HTMLAudioElement | null>(null);

    // Initialize audio objects on client side only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCorrectSound(new Audio('/sounds/correct.mp3'));
            setWrongSound(new Audio('/sounds/error.mp3'));
        }
    }, []);

    // Play sound effect
    const playSound = (isCorrect: boolean) => {
        if (!started || paused) return;

        const sound = isCorrect ? correctSound : wrongSound;
        if (!sound) return;

        try {
            sound.currentTime = 0;
            sound.volume = 0.3;
            sound.play().catch((e: any) => console.log('Audio play failed:', e));
        } catch (error) {
            console.log('Audio error:', error);
        }
    };

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (isParagraphMode) {
            if (completed || !selectedTime || !started || paused) return;
            e.preventDefault();

            if (e.key === 'Backspace') {
                if (typedText.length > 0) {
                    const newText = typedText.slice(0, -1);
                    setTypedText(newText);
                    setCurrentWordIndex(newText.split(' ').length - 1);
                }
                return;
            }
            if (['Shift', 'Control', 'Alt', 'CapsLock', 'Tab'].includes(e.key)) return;
            const mappedChar = getCharFromKey(e.code, e.shiftKey);
            if (mappedChar) {
                const targetText = words.join(' ');
                const isCorrect = mappedChar === (targetText[typedText.length] || ' ');
                playSound(isCorrect);

                if (!isCorrect && mappedChar !== ' ') {
                    setIsWrongKey(true);
                    setTimeout(() => setIsWrongKey(false), 150);
                }

                const newText = typedText + mappedChar;
                setTypedText(newText);
                setCurrentWordIndex(newText.split(' ').length - 1);

                setStats(prev => ({
                    ...prev,
                    totalTyped: prev.totalTyped + 1,
                    errors: isCorrect ? prev.errors : prev.errors + 1,
                    accuracy: Math.round(((prev.totalTyped + 1 - (isCorrect ? prev.errors : prev.errors + 1)) / (prev.totalTyped + 1)) * 100)
                }));

                if (newText.length >= targetText.length) {
                    setCompleted(true);
                }
            }
            return;
        }

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

            // Play sound feedback
            playSound(isCorrect);

            // Only advance if correct key is pressed
            if (isCorrect) {
                setCharIndexInWord(prev => prev + 1);
            } else {
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
            playSound(true); // Space is always correct when finishing word

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

    if (isParagraphMode) {
        return (
            <div className="flex flex-col h-full w-full outline-none bg-slate-50 animate-fade-in" onKeyDown={handleKeyDown} tabIndex={0} onClick={() => inputRef.current?.focus()}>
                {/* Header */}
                <div className="text-center py-6 bg-white border-b border-slate-200">
                    <h1 className="text-3xl md:text-4xl text-indigo-600 font-black uppercase tracking-widest">{lesson.title.split(':')[0]}</h1>
                    <p className="text-slate-500 mt-2 text-sm">{lesson.description}</p>
                </div>

                <div className="flex flex-1 w-full gap-8 px-6 md:px-12 lg:px-16 py-8 justify-between">
                    {/* Left Sidebar */}
                    <div className="w-60 flex-shrink-0 flex flex-col gap-4 hidden md:flex">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <h3 className="font-bold text-slate-700 mb-2 text-sm tracking-wide">Test Mode</h3>
                            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">Time Mode</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <h3 className="font-bold text-slate-700 mb-2 text-sm tracking-wide">Duration</h3>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
                                value={selectedTime || 0}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setSelectedTime(val);
                                    setTimeLeft(val);
                                    if (val > 0) { setStarted(true); setStartTime(Date.now()); }
                                }}
                            >
                                <option value={0}>Select Duration...</option>
                                <option value={60}>1 min</option>
                                <option value={120}>2 min</option>
                                <option value={300}>5 min</option>
                                <option value={600}>10 min</option>
                            </select>
                        </div>
                        <div className="bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center gap-2 justify-center shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg> Backspace On
                        </div>
                        <div className="bg-slate-500 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center gap-2 justify-center shadow-sm mt-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg> Backspace Sound
                        </div>

                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col gap-6 min-w-0">
                        {/* Settings Bar above Passage */}
                        <div className="flex justify-between items-center bg-white px-5 py-3 rounded-xl border border-slate-200">
                            <div className="text-base font-bold text-slate-500 flex items-center gap-3 select-none">
                                PDF Font Size:
                                <button className="bg-slate-100 p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                                14px
                                <button className="bg-slate-100 p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors" onClick={(e) => { e.stopPropagation(); downloadPDF(); }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Download PDF
                            </button>
                        </div>

                        {/* Passage Box */}
                        <div className="bg-white border text-justify border-slate-200 rounded-2xl p-8 h-80 overflow-y-auto text-2xl leading-[2.5] hindi-text shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-r-none relative">
                            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-indigo-500 rounded-r-2xl opacity-80"></div>
                            {words.map((word, idx) => {
                                const isCurrent = idx === currentWordIndex;
                                const isPast = idx < currentWordIndex;
                                return (
                                    <span 
                                        key={idx} 
                                        ref={isCurrent ? activeWordRef : null}
                                        className={`mr-3 transition-colors ${isCurrent ? 'bg-yellow-400 text-slate-900 rounded-sm' : (isPast ? 'text-slate-800' : 'text-slate-800')}`}
                                    >
                                        {word}
                                    </span>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex-1 min-h-[220px] overflow-y-auto text-2xl leading-[2.5] hindi-text shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] relative cursor-text text-justify">
                            {(!started || !selectedTime) && <span className="text-slate-400 absolute pointer-events-none">Start typing here... Select Duration on left or right to begin.</span>}
                            {started && selectedTime && (
                                <>
                                    {typedText.split('').map((char, i) => {
                                        const targetText = words.join(' ');
                                        const isCorrect = char === targetText[i];
                                        return (
                                            <span key={i} className={isCorrect ? "text-indigo-700" : "text-red-600 bg-red-100"}>
                                                {char}
                                            </span>
                                        );
                                    })}
                                    <span ref={cursorRef} className="inline-block w-[3px] h-7 bg-slate-800 animate-[pulse_1s_ease-in-out_infinite] align-middle ml-[1px]"></span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-60 flex-shrink-0 flex flex-col gap-4 hidden lg:flex">
                        <div className="bg-slate-50 text-slate-800 border-2 border-slate-200 rounded-xl p-4 flex items-center justify-center gap-2 text-2xl font-black shadow-sm tracking-wide">
                            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {formatTime(timeLeft || selectedTime || 0)}
                        </div>
                        <div className="bg-slate-600 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg> Live Speed & Accuracy
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-1 mb-1">
                            <div className="bg-white border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                                <div className="text-xs font-bold text-slate-500 mb-1">WPM</div>
                                <div className="text-2xl font-black text-indigo-600">{stats.wpm}</div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                                <div className="text-xs font-bold text-slate-500 mb-1">ACC</div>
                                <div className="text-2xl font-black text-emerald-500">{stats.accuracy}%</div>
                            </div>
                        </div>
                        <div className="bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center gap-2 justify-center shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg> Hide Passage
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-white border border-slate-200 shadow-sm font-bold py-2.5 px-3 rounded-lg text-sm text-slate-600 flex items-center justify-center gap-1 hover:bg-slate-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path></svg> Font</button>
                            <button className="flex-1 bg-white border border-slate-200 shadow-sm font-bold py-2.5 px-3 rounded-lg text-sm text-slate-600 flex items-center justify-center gap-1 hover:bg-slate-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg> Font</button>
                        </div>
                        <button className="bg-white border border-slate-200 text-slate-600 shadow-sm font-bold py-3 px-4 rounded-lg text-sm flex items-center gap-2 justify-center hover:bg-slate-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg> Sound Off
                        </button>
                        <button className="bg-yellow-400 text-yellow-900 font-bold py-3 px-4 rounded-lg text-sm flex items-center gap-2 justify-center mt-1 shadow-sm hover:bg-yellow-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Highlight
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); resetLesson(); }} className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-md text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center gap-2 justify-center mt-6">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Restart
                        </button>
                    </div>
                </div>

                {/* Mobile Floating Back Button */}
                <div className="fixed bottom-4 left-4 md:hidden">
                    <button onClick={() => router.push('/')} className="bg-white p-3 rounded-full shadow-lg text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                </div>

                {/* Results logic (existing) */}
                {completed && selectedTime && (
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
                        {/* ... Existing results modal content */}
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-2xl w-full text-center relative overflow-hidden">
                            <h2 className="text-3xl font-black mb-8">Lesson Complete!</h2>
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <div className="bg-slate-50 p-6 rounded-3xl"><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Time Selected</span><div className="text-2xl font-black">{selectedTime / 60} min</div></div>
                                <div className="bg-slate-50 p-6 rounded-3xl"><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Characters Typed</span><div className="text-2xl font-black">{stats.totalTyped}</div></div>
                                <div className="bg-slate-50 p-6 rounded-3xl"><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Correct Characters</span><div className="text-2xl font-black">{stats.totalTyped - stats.errors}</div></div>
                                <div className="bg-slate-50 p-6 rounded-3xl"><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Errors</span><div className="text-2xl font-black">{stats.errors}</div></div>
                                <div className="bg-slate-50 p-6 rounded-3xl"><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Accuracy</span><div className="text-2xl font-black">{stats.accuracy}%</div></div>
                                <div className="bg-slate-50 p-6 rounded-3xl"><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">WPM</span><div className="text-2xl font-black">{stats.wpm} WPM</div></div>
                                {incorrectChars.length > 0 && (
                                    <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-200 col-span-3">
                                        <span className="text-[10px] font-black uppercase text-red-600 block mb-2">गलत अक्षर (Incorrect Characters)</span>
                                        <div className="flex flex-wrap gap-2">
                                            {incorrectChars.map((char, index) => (
                                                <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-lg font-bold border border-red-300">{char}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button onClick={(e) => { e.stopPropagation(); resetLesson(); }} className="flex-1 bg-slate-100 py-4 rounded-2xl font-black">Try Again</button>
                                <button onClick={() => router.push('/')} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black">Dashboard</button>
                            </div>
                        </div>
                    </div>
                )}

                <input ref={inputRef} type="text" className="opacity-0 absolute" autoFocus onBlur={(e) => e.target.focus()} />
            </div>
        );
    }

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
                            className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            {paused ? (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">Resume</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">Pause</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowTimeSelection(true)}
                            className="bg-primary hover:bg-primary-dark text-white font-black px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">Start Lesson</span>
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
                                {isCurrent && !isParagraphMode && (
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

            {/* Keyboard Guidance (Full Width) - Hidden in Paragraph Mode */}
            {!isParagraphMode && (
                <div className="glass-panel p-2 md:p-3 rounded-none border-x-0 border-white/40 shadow-lg flex flex-col items-center gap-2 w-full flex-shrink-0 animate-fade-in">
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
            )}

            {/* Time Selection Modal */}
            {showTimeSelection && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-xl w-full text-center relative overflow-hidden">
                        <h2 className="text-3xl font-black mb-8">Select Lesson Duration</h2>
                        <p className="text-slate-600 mb-8">Choose how long you want to practice this lesson</p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[1, 2, 3, 4, 5].map((minutes) => (
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
                                    resetLesson();
                                    setShowTimeSelection(true);
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
