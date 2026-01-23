'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { keyboardRows, KeyData } from '../data/keyboardLayout';

interface HandsGuidanceProps {
    activeFinger?: string | null; // e.g., 'l-pinky', 'r-index'
    pressedKeyId?: string | null; // The key that was just pressed
}

const HandsGuidance: React.FC<HandsGuidanceProps> = ({ activeFinger, pressedKeyId }) => {
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

    // Precise finger coordinates relative to each hand container
    // Calibrated for the scaled (0.8) and centered hand images
    const fingerCoordinates = {
        left: {
            pinky: { x: 18, y: 48 },    // A key - calibrated position
            ring: { x: 32, y: 38 },     // S key
            middle: { x: 48, y: 33 },   // D key
            index: { x: 62, y: 38 },    // F key
            thumb: { x: 57, y: 58 }     // Space helper
        },
        right: {
            index: { x: 38, y: 38 },    // J key
            middle: { x: 52, y: 33 },   // K key
            ring: { x: 68, y: 38 },     // L key
            pinky: { x: 82, y: 48 },    // ; key
            thumb: { x: 43, y: 58 }     // Space helper
        }
    };


    // Determine which hand a finger belongs to
    const getHandForFinger = (finger: string): 'left' | 'right' => {
        return finger.startsWith('l-') ? 'left' : 'right';
    };

    // Get coordinates for a finger from the fingerCoordinates map
    const getFingerPosition = (finger: string) => {
        const hand = getHandForFinger(finger);
        const fingerKey = finger.split('-')[1] as keyof typeof fingerCoordinates.left;
        return fingerCoordinates[hand][fingerKey] || { x: 50, y: 50 };
    };

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


    return (
        <div className="w-full mx-auto select-none pointer-events-none mb-8 group">
            {/* Flex wrapper for side-by-side hands */}
            <div ref={containerRef} className="flex w-full gap-4 overflow-hidden rounded-[2rem] shadow-xl border border-slate-100 bg-white p-4" style={{ height: '250px' }}>
                {/* Left Hand Container */}
                <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-200">
                    <Image
                        src="/images/left-hand.png"
                        alt="Left Hand"
                        fill
                        className="object-contain"
                        style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
                    />

                    {/* Left Hand Finger Indicators (Home Position) */}
                    {Object.entries(fingerCoordinates.left).map(([fingerName, pos]) => (
                        <div
                            key={`home-l-${fingerName}`}
                            className="absolute w-3 h-3 border-2 border-slate-400/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`
                            }}
                        />
                    ))}

                    {/* Finger Dot for Left Hand */}
                    <div
                        className={`finger-dot absolute w-4 h-4 bg-primary rounded-full z-30 transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
                            activeFinger && getHandForFinger(activeFinger) === 'left' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        } ${pressedFinger === activeFinger ? 'ring-2 ring-primary/50' : ''}`}
                        style={{
                            left: activeFinger && getHandForFinger(activeFinger) === 'left' ? `${getFingerPosition(activeFinger).x}%` : '50%',
                            top: activeFinger && getHandForFinger(activeFinger) === 'left' ? `${getFingerPosition(activeFinger).y}%` : '50%'
                        }}
                    >
                        {activeFinger && getHandForFinger(activeFinger) === 'left' && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-primary text-white text-xs font-bold rounded shadow-lg">
                                {activeFinger.split('-')[1].toUpperCase()}
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Hand Container */}
                <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-200">
                    <Image
                        src="/images/right-hand.png"
                        alt="Right Hand"
                        fill
                        className="object-contain"
                        style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
                    />

                    {/* Right Hand Finger Indicators (Home Position) */}
                    {Object.entries(fingerCoordinates.right).map(([fingerName, pos]) => (
                        <div
                            key={`home-r-${fingerName}`}
                            className="absolute w-3 h-3 border-2 border-slate-400/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`
                            }}
                        />
                    ))}

                    {/* Finger Dot for Right Hand */}
                    <div
                        className={`finger-dot absolute w-4 h-4 bg-primary rounded-full z-30 transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
                            activeFinger && getHandForFinger(activeFinger) === 'right' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        } ${pressedFinger === activeFinger ? 'ring-2 ring-primary/50' : ''}`}
                        style={{
                            left: activeFinger && getHandForFinger(activeFinger) === 'right' ? `${getFingerPosition(activeFinger).x}%` : '50%',
                            top: activeFinger && getHandForFinger(activeFinger) === 'right' ? `${getFingerPosition(activeFinger).y}%` : '50%'
                        }}
                    >
                        {activeFinger && getHandForFinger(activeFinger) === 'right' && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-primary text-white text-xs font-bold rounded shadow-lg">
                                {activeFinger.split('-')[1].toUpperCase()}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HandsGuidance;
