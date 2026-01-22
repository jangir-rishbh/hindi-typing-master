'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface HandsGuidanceProps {
    activeFinger?: string | null; // e.g., 'l-pinky', 'r-index'
}

const HandsGuidance: React.FC<HandsGuidanceProps> = ({ activeFinger }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Precisely adjusted positions for chatgpt.png (Realistic Hands)
    const fingerPositions: Record<string, { x: number; y: number }> = {
        'l-pinky': { x: 23.5, y: 55 },
        'l-ring': { x: 27, y: 38 },
        'l-middle': { x: 33.5, y: 32 },
        'l-index': { x: 41, y: 38 },
        'l-thumb': { x: 42.5, y: 67 },
        'r-thumb': { x: 57.5, y: 67 },
        'r-index': { x: 59, y: 38 },
        'r-middle': { x: 66.5, y: 32 },
        'r-ring': { x: 73, y: 38 },
        'r-pinky': { x: 77.5, y: 55 },
    };


    return (
        <div className="w-full mx-auto select-none pointer-events-none mb-8 group">
            {/* Main Relative Container for Image + Dots */}
            <div ref={containerRef} className="relative w-full overflow-hidden rounded-[2rem] shadow-xl border border-slate-100 bg-white" style={{ height: '300px' }}>
                <img
                    src="/images/rishbh jnaigif.png"
                    alt="Realistic Hands"
                    className="w-full h-full object-contain"
                />

                {/* Invisible Finger Anchor Elements */}
                {Object.entries(fingerPositions).map(([key, pos]) => (
                    <div
                        key={key}
                        data-finger={key}
                        className="absolute w-0 h-0 pointer-events-none"
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}

                {/* Dynamic Guidance Dot */}
                {activeFinger && (
                    <div
                        className="absolute w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full shadow-[0_0_20px_rgba(99,102,241,1)] scale-110 z-30 transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${fingerPositions[activeFinger]?.x}%`,
                            top: `${fingerPositions[activeFinger]?.y}%`
                        }}
                    >
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-40"></div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded-full shadow-lg border border-white/20">
                            {activeFinger.split('-')[1].toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Static Finger Position Indicators (subtle dots) */}
                {Object.entries(fingerPositions).map(([key, pos]) => (
                    <div
                        key={`indicator-${key}`}
                        className="absolute bg-slate-300 w-1.5 h-1.5 md:w-2 md:h-2 opacity-40 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HandsGuidance;
