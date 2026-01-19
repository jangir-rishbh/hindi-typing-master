'use client';

import React from 'react';
import Image from 'next/image';

interface HandsGuidanceProps {
    activeFinger?: string | null; // e.g., 'l-pinky', 'r-index'
}

const HandsGuidance: React.FC<HandsGuidanceProps> = ({ activeFinger }) => {
    const isFingerActive = (fingerId: string) => activeFinger === fingerId;

    // Precisely adjusted positions for chatgpt.png (Realistic Hands)
    const fingerPositions: Record<string, { x: number; y: number }> = {
        'l-pinky': { x: 23.5, y: 55 },
        'l-ring': { x: 26.5, y: 38 },
        'l-middle': { x: 33, y: 32 },
        'l-index': { x: 40.5, y: 38 },
        'l-thumb': { x: 42, y: 67 },
        'r-thumb': { x: 58, y: 67 },
        'r-index': { x: 60, y: 38 },
        'r-middle': { x: 67, y: 32 },
        'r-ring': { x: 73.5, y: 38 },
        'r-pinky': { x: 77.5, y: 55 },
    };

    return (
        <div className="w-full mx-auto select-none pointer-events-none mb-8 group">
            {/* Main Relative Container for Image + Dots */}
            <div className="relative w-full overflow-hidden rounded-[2rem] shadow-xl border border-slate-100 bg-white" style={{ height: '300px' }}>
                <img
                    src="/images/chatgpt.png"
                    alt="Realistic Hands"
                    className="w-full h-full object-contain"
                />

                {/* Finger Dots Overlay */}
                {Object.entries(fingerPositions).map(([key, pos]) => (
                    <div
                        key={key}
                        className={`absolute rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 z-30 ${isFingerActive(key)
                            ? 'bg-primary w-4 h-4 md:w-5 md:h-5 shadow-[0_0_20px_rgba(99,102,241,1)] scale-110'
                            : 'bg-slate-300 w-1.5 h-1.5 md:w-2 md:h-2 opacity-40'
                            }`}
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`
                        }}
                    >
                        {isFingerActive(key) && (
                            <>
                                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-40"></div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded-full shadow-lg border border-white/20">
                                    {key.split('-')[1].toUpperCase()}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HandsGuidance;
