'use client';

import React, { useRef, useState, useEffect } from 'react';
import { keyboardRows, KeyData } from '../data/keyboardLayout';

interface HandsGuidanceProps {
    activeFinger?: string | null; // e.g., 'l-pinky', 'r-index'
    pressedKeyId?: string | null; // The key that was just pressed
    activeLessonId?: string | null; // Current lesson ID
    lessonKeys?: string[]; // Keys for current lesson
}

const HandsGuidance: React.FC<HandsGuidanceProps> = ({ activeFinger, pressedKeyId, activeLessonId, lessonKeys = [] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pressedFinger, setPressedFinger] = useState<string | null>(null);

    // Helper function to get Hindi character from keyboard layout
    const getHindiCharacterForKey = (keyLabel: string): string => {
        for (const row of keyboardRows) {
            for (const key of row) {
                if (key.label === keyLabel && key.hindi) {
                    return key.hindi;
                }
            }
        }
        return keyLabel; // fallback to original label
    };

    // Helper function to get Hindi characters for multiple keys
    const getHindiCharactersForKeys = (keyLabels: string[]): string => {
        return keyLabels.map(label => getHindiCharacterForKey(label)).join(', ');
    };

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

    // Generate finger colors dynamically based on lesson keys
    const getFingerColorsForLesson = (lessonKeys: string[]) => {
        const fingerMap: Record<string, { color: string, textColor: string, name: string, keys: string[], description: string }> = {
            'l-pinky': { color: 'bg-pink-400', textColor: 'text-pink-600', name: 'Left Pinky', keys: [], description: '' },
            'l-ring': { color: 'bg-blue-400', textColor: 'text-blue-600', name: 'Left Ring', keys: [], description: '' },
            'l-middle': { color: 'bg-yellow-400', textColor: 'text-yellow-600', name: 'Left Middle', keys: [], description: '' },
            'l-index': { color: 'bg-green-400', textColor: 'text-green-600', name: 'Left Index', keys: [], description: '' },
            'l-thumb': { color: 'bg-purple-400', textColor: 'text-purple-600', name: 'Left Thumb', keys: [], description: '' },
            'r-thumb': { color: 'bg-orange-500', textColor: 'text-orange-600', name: 'Right Thumb', keys: [], description: '' },
            'r-index': { color: 'bg-green-500', textColor: 'text-green-600', name: 'Right Index', keys: [], description: '' },
            'r-middle': { color: 'bg-yellow-500', textColor: 'text-yellow-600', name: 'Right Middle', keys: [], description: '' },
            'r-ring': { color: 'bg-blue-500', textColor: 'text-blue-600', name: 'Right Ring', keys: [], description: '' },
            'r-pinky': { color: 'bg-pink-500', textColor: 'text-pink-600', name: 'Right Pinky', keys: [], description: '' },
        };

        // Group lesson keys by finger
        for (const keyId of lessonKeys) {
            for (const row of keyboardRows) {
                for (const key of row) {
                    if (key.id === keyId && key.finger && fingerMap[key.finger]) {
                        fingerMap[key.finger].keys.push(key.label);
                        fingerMap[key.finger].description = fingerMap[key.finger].keys.length > 1 
                            ? getHindiCharactersForKeys(fingerMap[key.finger].keys)
                            : getHindiCharacterForKey(key.label);
                    }
                }
            }
        }

        // Always include space for right thumb
        if (!fingerMap['r-thumb'].keys.includes('Space')) {
            fingerMap['r-thumb'].keys.push('Space');
            fingerMap['r-thumb'].description = 'Space';
        }

        return fingerMap;
    };

    const fingerColors = getFingerColorsForLesson(lessonKeys);

    // Get lesson info
    const getLessonInfo = (lessonId: string | null) => {
        switch (lessonId) {
            case 'home-row': return { title: 'Home Row Finger Guidance', subtitle: 'Learn which finger to use for A, S, D, F, G, H, J, K, L, ; and Space keys' };
            case 'upper-row-1': 
            case 'upper-row-2': 
            case 'upper-row-3': 
            case 'upper-row-4': 
            case 'upper-row-5': 
            case 'upper-row-6': return { title: 'Upper Row Finger Guidance', subtitle: 'Learn which finger to use for upper row keys and Space keys' };
            case 'lower-row-1': 
            case 'lower-row-2': 
            case 'lower-row-3': 
            case 'lower-row-4': 
            case 'lower-row-5': return { title: 'Lower Row Finger Guidance', subtitle: 'Learn which finger to use for lower row keys and Space keys' };
            default: return { title: 'Finger Guidance', subtitle: 'Learn which finger to use for each key' };
        }
    };

    const lessonInfo = getLessonInfo(activeLessonId || null);

    // Get legend items for each lesson
    const getLegendItems = (lessonId: string | null) => {
        switch (lessonId) {
            case 'home-row': // Home Row - ASDF GH JKL; + Space
                return [
                    { color: 'bg-pink-400', label: `${getHindiCharacterForKey('A')} = Left Pinky` },
                    { color: 'bg-blue-400', label: `${getHindiCharacterForKey('S')} = Left Ring` },
                    { color: 'bg-yellow-400', label: `${getHindiCharacterForKey('D')} = Left Middle` },
                    { color: 'bg-green-400', label: `${getHindiCharacterForKey('F')} = Left Index` },
                    { color: 'bg-purple-400', label: `${getHindiCharacterForKey('G')} = Left Index` },
                    { color: 'bg-orange-500', label: `${getHindiCharacterForKey('H')} = Right Index` },
                    { color: 'bg-green-500', label: `${getHindiCharacterForKey('J')} = Right Index` },
                    { color: 'bg-yellow-500', label: `${getHindiCharacterForKey('K')} = Right Middle` },
                    { color: 'bg-blue-500', label: `${getHindiCharacterForKey('L')} = Right Ring` },
                    { color: 'bg-pink-500', label: `${getHindiCharacterForKey(';')} = Right Pinky` },
                    { color: 'bg-orange-500', label: `Space = Right Thumb` }
                ];
            default: // For all other lessons, use lessonKeys
                return lessonKeys.slice(0, 10).map(keyId => {
                    for (const row of keyboardRows) {
                        for (const key of row) {
                            if (key.id === keyId) {
                                const fingerColors: Record<string, string> = {
                                    'l-pinky': 'bg-pink-400',
                                    'l-ring': 'bg-blue-400',
                                    'l-middle': 'bg-yellow-400',
                                    'l-index': 'bg-green-400',
                                    'l-thumb': 'bg-purple-400',
                                    'r-thumb': 'bg-orange-500',
                                    'r-index': 'bg-green-500',
                                    'r-middle': 'bg-yellow-500',
                                    'r-ring': 'bg-blue-500',
                                    'r-pinky': 'bg-pink-500',
                                };
                                const char = key.hindi || key.label;
                                const fingerName = key.finger ? key.finger.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown';
                                return {
                                    color: fingerColors[key.finger || ''] || 'bg-gray-400',
                                    label: `${char} = ${fingerName}`
                                };
                            }
                        }
                    }
                    return { color: 'bg-gray-400', label: 'Unknown' };
                }).filter(item => item.label !== 'Unknown = Unknown');
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
                    activeLessonId === 'home-row'
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
                            {activeLessonId === 'home-row' ? 'Home Row Keys' : 'Keys'}
                        </div>
                        <div className={`grid gap-4 text-xs text-slate-600 ${
                            activeLessonId === 'home-row'
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
