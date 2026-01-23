'use client';

import React, { useRef, useState, useEffect } from 'react';
import { keyboardRows, KeyData } from '../data/keyboardLayout';

interface HandsGuidanceProps {
    activeFinger?: string | null; // e.g., 'l-pinky', 'r-index'
    pressedKeyId?: string | null; // The key that was just pressed
    activeLessonId?: number | null; // Current lesson ID (1=home, 2=upper, 3=lower)
}

const HandsGuidance: React.FC<HandsGuidanceProps> = ({ activeFinger, pressedKeyId, activeLessonId }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pressedFinger, setPressedFinger] = useState<string | null>(null);

    // Get finger for pressed key
    const getFingerForKey = (keyId: string): string | null => {
        for (const row of keyboardRows) {
            for (const key of row) {
                if (key.id === keyId) {
                    return key.finger || null;
                }
            }
        }
        return null;
    };

    // Finger color mappings for different lessons
    const getFingerColorsForLesson = (lessonId: number | null) => {
        switch (lessonId) {
            case 1: // Home Row - ASDF GH JKL; + Space
                return {
                    'l-pinky': { color: 'bg-pink-400', textColor: 'text-pink-600', name: 'Left Pinky', keys: ['A'], description: 'A key' },
                    'l-ring': { color: 'bg-blue-400', textColor: 'text-blue-600', name: 'Left Ring', keys: ['S'], description: 'S key' },
                    'l-middle': { color: 'bg-yellow-400', textColor: 'text-yellow-600', name: 'Left Middle', keys: ['D'], description: 'D key' },
                    'l-index': { color: 'bg-green-400', textColor: 'text-green-600', name: 'Left Index', keys: ['F', 'G'], description: 'F, G keys' },
                    'r-index': { color: 'bg-green-500', textColor: 'text-green-600', name: 'Right Index', keys: ['H', 'J'], description: 'H, J keys' },
                    'r-middle': { color: 'bg-yellow-500', textColor: 'text-yellow-600', name: 'Right Middle', keys: ['K'], description: 'K key' },
                    'r-ring': { color: 'bg-blue-500', textColor: 'text-blue-600', name: 'Right Ring', keys: ['L'], description: 'L key' },
                    'r-pinky': { color: 'bg-pink-500', textColor: 'text-pink-600', name: 'Right Pinky', keys: [';'], description: '; key' },
                    'r-thumb': { color: 'bg-orange-500', textColor: 'text-orange-600', name: 'Right Thumb', keys: ['Space'], description: 'Space key' }
                };

            case 2: // Upper Row + Space
                return {
                    'l-pinky': { color: 'bg-pink-400', textColor: 'text-pink-600', name: 'Left Pinky', keys: ['Q'], description: 'Q key' },
                    'l-ring': { color: 'bg-blue-400', textColor: 'text-blue-600', name: 'Left Ring', keys: ['W'], description: 'W key' },
                    'l-middle': { color: 'bg-yellow-400', textColor: 'text-yellow-600', name: 'Left Middle', keys: ['E'], description: 'E key' },
                    'l-index': { color: 'bg-green-400', textColor: 'text-green-600', name: 'Left Index', keys: ['R', 'T'], description: 'R, T keys' },
                    'r-index': { color: 'bg-green-500', textColor: 'text-green-600', name: 'Right Index', keys: ['Y', 'U'], description: 'Y, U keys' },
                    'r-middle': { color: 'bg-yellow-500', textColor: 'text-yellow-600', name: 'Right Middle', keys: ['I'], description: 'I key' },
                    'r-ring': { color: 'bg-blue-500', textColor: 'text-blue-600', name: 'Right Ring', keys: ['O'], description: 'O key' },
                    'r-pinky': { color: 'bg-pink-500', textColor: 'text-pink-600', name: 'Right Pinky', keys: ['P'], description: 'P key' },
                    'r-thumb': { color: 'bg-orange-500', textColor: 'text-orange-600', name: 'Right Thumb', keys: ['Space'], description: 'Space key' }
                };

            case 3: // Lower Row + Space
                return {
                    'l-pinky': { color: 'bg-pink-400', textColor: 'text-pink-600', name: 'Left Pinky', keys: ['Z'], description: 'Z key' },
                    'l-ring': { color: 'bg-blue-400', textColor: 'text-blue-600', name: 'Left Ring', keys: ['X'], description: 'X key' },
                    'l-middle': { color: 'bg-yellow-400', textColor: 'text-yellow-600', name: 'Left Middle', keys: ['C'], description: 'C key' },
                    'l-index': { color: 'bg-green-400', textColor: 'text-green-600', name: 'Left Index', keys: ['V', 'B'], description: 'V, B keys' },
                    'r-index': { color: 'bg-green-500', textColor: 'text-green-600', name: 'Right Index', keys: ['N', 'M'], description: 'N, M keys' },
                    'r-middle': { color: 'bg-yellow-500', textColor: 'text-yellow-600', name: 'Right Middle', keys: [','], description: ', key' },
                    'r-ring': { color: 'bg-blue-500', textColor: 'text-blue-600', name: 'Right Ring', keys: ['.'], description: '. key' },
                    'r-pinky': { color: 'bg-pink-500', textColor: 'text-pink-600', name: 'Right Pinky', keys: ['/'], description: '/ key' },
                    'r-thumb': { color: 'bg-orange-500', textColor: 'text-orange-600', name: 'Right Thumb', keys: ['Space'], description: 'Space key' }
                };

            default: // Default to home row - ASDF GH JKL; + Space
                return {
                    'l-pinky': { color: 'bg-pink-400', textColor: 'text-pink-600', name: 'Left Pinky', keys: ['A'], description: 'A key' },
                    'l-ring': { color: 'bg-blue-400', textColor: 'text-blue-600', name: 'Left Ring', keys: ['S'], description: 'S key' },
                    'l-middle': { color: 'bg-yellow-400', textColor: 'text-yellow-600', name: 'Left Middle', keys: ['D'], description: 'D key' },
                    'l-index': { color: 'bg-green-400', textColor: 'text-green-600', name: 'Left Index', keys: ['F', 'G'], description: 'F, G keys' },
                    'r-index': { color: 'bg-green-500', textColor: 'text-green-600', name: 'Right Index', keys: ['H', 'J'], description: 'H, J keys' },
                    'r-middle': { color: 'bg-yellow-500', textColor: 'text-yellow-600', name: 'Right Middle', keys: ['K'], description: 'K key' },
                    'r-ring': { color: 'bg-blue-500', textColor: 'text-blue-600', name: 'Right Ring', keys: ['L'], description: 'L key' },
                    'r-pinky': { color: 'bg-pink-500', textColor: 'text-pink-600', name: 'Right Pinky', keys: [';'], description: '; key' },
                    'r-thumb': { color: 'bg-orange-500', textColor: 'text-orange-600', name: 'Right Thumb', keys: ['Space'], description: 'Space key' }
                };
        }
    };

    const fingerColors = getFingerColorsForLesson(activeLessonId || null);

    // Get lesson info
    const getLessonInfo = (lessonId: number | null) => {
        switch (lessonId) {
            case 1: return { title: 'Home Row Finger Guidance', subtitle: 'Learn which finger to use for A, S, D, F, G, H, J, K, L, ; and Space keys' };
            case 2: return { title: 'Upper Row Finger Guidance', subtitle: 'Learn which finger to use for Q, W, E, R, T, Y, U, I, O, P and Space keys' };
            case 3: return { title: 'Lower Row Finger Guidance', subtitle: 'Learn which finger to use for Z, X, C, V, B, N, M, ,, ., / and Space keys' };
            default: return { title: 'Finger Guidance', subtitle: 'Learn which finger to use for each key' };
        }
    };

    const lessonInfo = getLessonInfo(activeLessonId || null);

    // Get legend items for each lesson
    const getLegendItems = (lessonId: number | null) => {
        switch (lessonId) {
            case 1: // Home Row - ASDF GH JKL; + Space
                return [
                    { color: 'bg-pink-400', label: 'A = Left Pinky' },
                    { color: 'bg-blue-400', label: 'S = Left Ring' },
                    { color: 'bg-yellow-400', label: 'D = Left Middle' },
                    { color: 'bg-green-400', label: 'F, G = Left Index' },
                    { color: 'bg-green-500', label: 'H, J = Right Index' },
                    { color: 'bg-yellow-500', label: 'K = Right Middle' },
                    { color: 'bg-blue-500', label: 'L = Right Ring' },
                    { color: 'bg-pink-500', label: '; = Right Pinky' },
                    { color: 'bg-orange-500', label: 'Space = Right Thumb' }
                ];
            case 2: // Upper Row + Space
                return [
                    { color: 'bg-pink-400', label: 'Q = Left Pinky' },
                    { color: 'bg-blue-400', label: 'W = Left Ring' },
                    { color: 'bg-yellow-400', label: 'E = Left Middle' },
                    { color: 'bg-green-400', label: 'R, T = Left Index' },
                    { color: 'bg-green-500', label: 'Y, U = Right Index' },
                    { color: 'bg-yellow-500', label: 'I = Right Middle' },
                    { color: 'bg-blue-500', label: 'O = Right Ring' },
                    { color: 'bg-pink-500', label: 'P = Right Pinky' },
                    { color: 'bg-orange-500', label: 'Space = Right Thumb' }
                ];
            case 3: // Lower Row + Space
                return [
                    { color: 'bg-pink-400', label: 'Z = Left Pinky' },
                    { color: 'bg-blue-400', label: 'X = Left Ring' },
                    { color: 'bg-yellow-400', label: 'C = Left Middle' },
                    { color: 'bg-green-400', label: 'V, B = Left Index' },
                    { color: 'bg-green-500', label: 'N, M = Right Index' },
                    { color: 'bg-yellow-500', label: ', = Right Middle' },
                    { color: 'bg-blue-500', label: '. = Right Ring' },
                    { color: 'bg-pink-500', label: '/ = Right Pinky' },
                    { color: 'bg-orange-500', label: 'Space = Right Thumb' }
                ];
            default: // Default to home row - ASDF GH JKL; + Space
                return [
                    { color: 'bg-pink-400', label: 'A = Left Pinky' },
                    { color: 'bg-blue-400', label: 'S = Left Ring' },
                    { color: 'bg-yellow-400', label: 'D = Left Middle' },
                    { color: 'bg-green-400', label: 'F, G = Left Index' },
                    { color: 'bg-green-500', label: 'H, J = Right Index' },
                    { color: 'bg-yellow-500', label: 'K = Right Middle' },
                    { color: 'bg-blue-500', label: 'L = Right Ring' },
                    { color: 'bg-pink-500', label: '; = Right Pinky' },
                    { color: 'bg-orange-500', label: 'Space = Right Thumb' }
                ];
        }
    };

    const legendItems = getLegendItems(activeLessonId || null);



    // Handle finger press animation
    useEffect(() => {
        if (pressedKeyId) {
            const finger = getFingerForKey(pressedKeyId);
            if (finger) {
                setPressedFinger(finger);
                // Reset after animation
                const timer = setTimeout(() => {
                    setPressedFinger(null);
                }, 300);
                return () => clearTimeout(timer);
            }
        }
    }, [pressedKeyId]);


    // Get finger info for active finger
    const getActiveFingerInfo = () => {
        if (!activeFinger) return null;
        return fingerColors[activeFinger as keyof typeof fingerColors];
    };

    const activeFingerInfo = getActiveFingerInfo();

    return (
        <div className="w-full mx-auto select-none pointer-events-none mb-8 group">
            <div ref={containerRef} className="w-full overflow-hidden rounded-[2rem] shadow-xl border border-slate-100 bg-white p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{lessonInfo.title}</h3>
                    <p className="text-sm text-slate-600">{lessonInfo.subtitle}</p>
                </div>

                {/* Active Finger Highlight */}
                {activeFinger && activeFingerInfo && (
                    <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 text-center">
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${activeFingerInfo.color} text-white font-bold text-sm mb-2`}>
                            <span>Use your</span>
                            <span className="text-lg">{activeFingerInfo.name.toUpperCase()}</span>
                            <span>finger</span>
                        </div>
                        <div className="text-sm text-slate-600">
                            Key: {activeFingerInfo.description}
                        </div>
                    </div>
                )}

                {/* Finger Color Guide */}
                <div className={`grid gap-4 ${
                    activeLessonId === 1
                        ? 'grid-cols-3 md:grid-cols-5 lg:grid-cols-9'
                        : Object.keys(fingerColors).length <= 5
                        ? 'grid-cols-2 md:grid-cols-5'
                        : 'grid-cols-3 md:grid-cols-5 lg:grid-cols-9'
                }`}>
                    {Object.entries(fingerColors).map(([fingerKey, fingerInfo]) => {
                        const isActive = activeFinger === fingerKey;
                        const isPressed = pressedFinger === fingerKey;

                        return (
                            <div
                                key={fingerKey}
                                className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
                                    isActive
                                        ? `${fingerInfo.color} border-white shadow-lg scale-105`
                                        : `bg-slate-50 border-slate-200 hover:border-slate-300`
                                } ${isPressed ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                            >
                                {/* Finger Color Indicator */}
                                <div className={`w-full h-8 rounded-md mb-2 ${fingerInfo.color} ${
                                    isActive ? 'ring-2 ring-white ring-offset-2' : ''
                                }`}></div>

                                {/* Finger Name */}
                                <div className={`text-xs font-bold text-center mb-1 ${
                                    isActive ? 'text-white' : fingerInfo.textColor
                                }`}>
                                    {fingerInfo.name}
                                </div>

                                {/* Key Assignment */}
                                <div className={`text-xs text-center font-medium ${
                                    isActive ? 'text-white' : 'text-slate-600'
                                }`}>
                                    {fingerInfo.description}
                                </div>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="text-center">
                        <div className="text-sm font-semibold text-slate-700 mb-2">
                            {activeLessonId === 1 ? 'Home Row Keys' : activeLessonId === 2 ? 'Upper Row Keys' : activeLessonId === 3 ? 'Lower Row Keys' : 'Keys'}
                        </div>
                        <div className={`grid gap-4 text-xs text-slate-600 ${
                            activeLessonId === 1
                                ? 'grid-cols-3 md:grid-cols-5 lg:grid-cols-9'
                                : legendItems.length <= 5
                                ? 'grid-cols-2 md:grid-cols-5'
                                : 'grid-cols-3 md:grid-cols-5 lg:grid-cols-9'
                        }`}>
                            {legendItems.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <div className={`w-4 h-4 ${item.color} rounded`}></div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandsGuidance;
