
import React from 'react';

interface HandsGuidanceProps {
    activeFinger?: string | null; // e.g., 'l-pinky', 'r-index'
}


interface HandSVGProps {
    mirrored?: boolean;
    prefix: string;
    activeFinger?: string | null;
    isFingerActive: (fingerId: string) => boolean;
    fingerPositions: Record<string, { cx: number; cy: number }>;
}

const HandSVG = ({ mirrored = false, prefix = 'l-', activeFinger, isFingerActive, fingerPositions }: HandSVGProps) => (
    <div className={`relative w-40 h-40 md:w-56 md:h-56 transition-all duration-500 ${activeFinger?.startsWith(prefix) ? 'opacity-100 scale-105' : 'opacity-30'}`}>
        <svg viewBox="0 0 200 200" className={`w-full h-full text-slate-900 fill-current mb-4 ${mirrored ? 'scale-x-[-1]' : ''}`}>
            <path d="M40,190 C40,190 20,170 20,130 C20,100 30,90 30,90 L35,85 C35,85 40,55 45,55 C50,55 55,65 55,80 L55,50 C55,40 65,35 75,35 C85,35 95,45 95,65 L95,45 C95,35 105,30 115,30 C125,30 135,40 135,60 L135,65 C135,55 145,50 155,50 C165,50 175,60 175,80 L175,120 C175,120 195,145 185,190 L40,190 Z" opacity="0.1" />
            <path d="M40,190 C40,190 20,170 20,130 C20,100 30,90 30,90 L35,85 C35,85 40,55 45,55 C50,55 55,65 55,80 L55,50 C55,40 65,35 75,35 C85,35 95,45 95,65 L95,45 C95,35 105,30 115,30 C125,30 135,40 135,60 L135,65 C135,55 145,50 155,50 C165,50 175,60 175,80 L175,120 C175,120 195,145 185,190 L40,190 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.2" />
        </svg>

        {Object.entries(fingerPositions).filter(([key]) => key.startsWith(prefix)).map(([key, pos]) => (
            <div
                key={key}
                className={`absolute rounded-full transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 ${isFingerActive(key)
                    ? 'bg-primary w-6 h-6 md:w-8 md:h-8 shadow-[0_0_30px_rgba(99,102,241,0.8)] z-10 scale-110'
                    : 'bg-slate-300 w-3 h-3 md:w-4 md:h-4 opacity-40'
                    }`}
                style={{
                    [mirrored ? 'right' : 'left']: `${(pos.cx / 200) * 100}%`,
                    top: `${(pos.cy / 200) * 100}%`
                }}
            >
                {isFingerActive(key) && (
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
                )}
            </div>
        ))}

        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${activeFinger?.startsWith(prefix) ? 'text-primary border-primary/20 shadow-lg -translate-y-2' : 'text-slate-400 opacity-50'}`}>
            {prefix === 'l-' ? 'Left' : 'Right'} Hand
        </div>
    </div>
);

const HandsGuidance: React.FC<HandsGuidanceProps> = ({ activeFinger }) => {
    const isFingerActive = (fingerId: string) => activeFinger === fingerId;

    const fingerPositions: Record<string, { cx: number; cy: number }> = {
        'l-pinky': { cx: 25, cy: 110 },
        'l-ring': { cx: 45, cy: 75 },
        'l-middle': { cx: 75, cy: 60 },
        'l-index': { cx: 115, cy: 75 },
        'l-thumb': { cx: 165, cy: 160 },
        'r-thumb': { cx: 35, cy: 160 },
        'r-index': { cx: 85, cy: 75 },
        'r-middle': { cx: 125, cy: 60 },
        'r-ring': { cx: 155, cy: 75 },
        'r-pinky': { cx: 175, cy: 110 },
    };

    return (
        <div className="flex justify-center gap-12 md:gap-24 mb-10 select-none pointer-events-none">
            <HandSVG prefix="l-" activeFinger={activeFinger} isFingerActive={isFingerActive} fingerPositions={fingerPositions} />
            <HandSVG prefix="r-" mirrored activeFinger={activeFinger} isFingerActive={isFingerActive} fingerPositions={fingerPositions} />
        </div>
    );
};


export default HandsGuidance;

