
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '../data/lessons';
import { keyboardRows } from '../data/keyboardLayout';
import VisualKeyboard from './VisualKeyboard';

interface TypingTutorProps {
    lesson: Lesson;
}

interface TypedChar {
    char: string;
    isCorrect: boolean;
}

// Utility to find key ID for a char
const getKeyForChar = (char: string) => {
    for (const row of keyboardRows) {
        for (const key of row) {
            if (key.hindi === char) return { id: key.id, shift: false };
            if (key.shiftHindi === char) return { id: key.id, shift: true };
            // Handle standard English keys if lesson contains them (rare for Hindi lesson but possible)
            if (key.label === char) return { id: key.id, shift: false };
        }
    }
    // Fallback for space
    if (char === ' ') return { id: 'Space', shift: false };
    return { id: null, shift: false };
};

export default function TypingTutor({ lesson }: TypingTutorProps) {
    const router = useRouter();
    const [started, setStarted] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
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
                const durationSec = (now - (startTime || now)) / 1000;

                // Calculate WPM: (Chars / 5) / (Minutes)
                // Note: standard WPM uses 5 chars as a word.
                const words = typedHistory.length / 5;
                const minutes = durationSec / 60;
                const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

                setStats(prev => ({
                    ...prev,
                    time: Math.round(durationSec),
                    wpm
                }));
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
            // Check if we want to allow backspace?
            // The original code:
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

        // If not mapped (and not caught above), ignore (e.g. F1-F12, or unmapped keys)
        if (!mappedChar) return;

        // Use mapped char instead of e.key
        const inputChar = mappedChar;

        const targetChar = lesson.content[currentIndex];

        // Identify the key code from event for visual feedback
        const keyCode = e.code;
        setPressedKey(keyCode);

        // Reset pressed key visual after short delay
        setTimeout(() => setPressedKey(null), 200);

        // Validation
        // We compare strict char equality
        const isCorrect = inputChar === targetChar;

        const newHistory = [...typedHistory, { char: inputChar, isCorrect }];
        setTypedHistory(newHistory);
        setCurrentIndex(prev => prev + 1);

        // Update errors immediately
        if (!isCorrect) {
            setStats(prev => ({
                ...prev,
                errors: prev.errors + 1,
                // Recalc accuracy
                accuracy: Math.round(((newHistory.length - (prev.errors + 1)) / newHistory.length) * 100)
            }));
        } else {
            setStats(prev => ({
                ...prev,
                accuracy: Math.round(((newHistory.length - prev.errors) / newHistory.length) * 100)
            }));
        }

        // Check completion
        if (currentIndex + 1 >= lesson.content.length) {
            setCompleted(true);
        }

    }, [currentIndex, lesson.content, completed, started, typedHistory, stats]);

    // Determine Active Key for Visual Keyboard
    const targetChar = lesson.content[currentIndex] || '';
    const { id: activeKeyId, shift: isShiftRequired } = getKeyForChar(targetChar);

    // Auto-focus logic
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        const handleFocus = () => inputRef.current?.focus();
        window.addEventListener('click', handleFocus);
        return () => window.removeEventListener('click', handleFocus);
    }, []);

    return (
        <div className="flex flex-col h-full max-w-6xl mx-auto p-4 gap-6" onKeyDown={handleKeyDown as any} tabIndex={0} ref={inputRef as any}>

            {/* Header / Stats */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
                <div>
                    <h1 className="text-xl font-bold text-tm-header">{lesson.title}</h1>
                    <p className="text-gray-500 text-sm">{lesson.description}</p>
                </div>
                <div className="flex gap-6 text-sm font-semibold">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Time</span>
                        <span className="text-xl">{Math.floor(stats.time / 60)}:{(stats.time % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">WPM</span>
                        <span className="text-xl">{stats.wpm}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Accuracy</span>
                        <span className="text-xl text-blue-600">{stats.accuracy}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Errors</span>
                        <span className="text-xl text-red-500">{stats.errors}</span>
                    </div>
                </div>
            </div>

            {/* Typing Display Area */}
            <div className="bg-white p-8 rounded-xl shadow-md border min-h-[200px] flex flex-col gap-4 hindi-text text-2xl leading-loose">
                {/* Top: The Text to Type */}
                <div className="text-gray-400 select-none break-words relative">
                    {lesson.content.split('').map((char, idx) => {
                        let colorClass = "text-gray-400"; // Pending
                        if (idx < currentIndex) {
                            // Already typed: Use history to color
                            const historyItem = typedHistory[idx];
                            colorClass = historyItem?.isCorrect ? "text-green-600" : "text-red-500 bg-red-100 rounded";
                        } else if (idx === currentIndex) {
                            colorClass = "bg-blue-100 text-blue-800 border-b-2 border-blue-500";
                        }
                        return (
                            <span key={idx} className={`${colorClass} px-[1px] rounded-[1px]`}>
                                {char === ' ' ? '␣' : char}
                            </span>
                        );
                    })}
                </div>

                {/* Input Box (Visual Only - Echo) */}
                <div className="border-t pt-4">
                    <div className="text-sm text-gray-400 mb-2">Your Input:</div>
                    <div className="p-3 bg-gray-50 rounded border min-h-[3rem] hindi-text break-words">
                        {typedHistory.map((item, i) => (
                            <span key={i} className={item.isCorrect ? "text-green-700" : "text-red-600 bg-red-50"}>
                                {item.char}
                            </span>
                        ))}
                        <span className="animate-pulse border-l-2 border-black ml-1 h-6 inline-block align-middle"></span>
                    </div>
                </div>
            </div>

            {/* Visual Keyboard */}
            <div className="mt-auto">
                <VisualKeyboard
                    activeKeyId={activeKeyId}
                    pressedKeyId={pressedKey}
                    isShiftRequired={isShiftRequired}
                />
            </div>

            {/* Completion Modal */}
            {completed && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                        <h2 className="text-3xl font-bold mb-4 text-tm-header">Lesson Completed!</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-gray-500 text-sm">Net Speed</div>
                                <div className="text-2xl font-bold">{stats.wpm} WPM</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-gray-500 text-sm">Accuracy</div>
                                <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}

            {/* Hidden input to ensure mobile/focus capture works if div focus fails */}
            <input
                ref={inputRef}
                type="text"
                className="opacity-0 absolute top-0 left-0 h-0 w-0"
                autoFocus
                onBlur={(e) => e.target.focus()}
            // We handle logic in the div's onKeyDown to capture everything
            />
        </div>
    );
}
