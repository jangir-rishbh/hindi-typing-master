import React from 'react';
import { keyboardRows, KeyData } from '../data/keyboardLayout';

interface VisualKeyboardProps {
    activeKeyId?: string | null;     // The key that should be highlighted as target
    pressedKeyId?: string | null;    // The key the user JUST pressed
    isShiftRequired?: boolean;       // If true, highlight Shift keys
    activeLessonId?: string | null;  // Current lesson ID for highlighting
    lessonKeys?: string[];           // Keys for current lesson
    isWrongKey?: boolean;            // If the pressed key is wrong
}

const VisualKeyboard: React.FC<VisualKeyboardProps> = ({
    activeKeyId,
    pressedKeyId,
    isShiftRequired = false,
    activeLessonId = null,
    lessonKeys = [],
    isWrongKey = false
}) => {

    const getKeyStyle = (key: KeyData) => {
        let base = "relative flex flex-col items-center justify-center m-[4px] rounded-2xl transition-all duration-75 select-none group ";

        // Width handling
        if (key.width) {
            base += key.width + " ";
        } else {
            base += "flex-1 h-10 md:h-12 ";
        }

        const isTarget = key.id === activeKeyId;
        const isPressed = key.id === pressedKeyId;
        const isShift = key.id === 'ShiftLeft' || key.id === 'ShiftRight';
        const isSpecialKey = ['Space', 'ShiftLeft', 'ShiftRight', 'Enter', 'Tab', 'CapsLock', 'Backspace', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight'].includes(key.id);

        // Check if key belongs to current lesson
        const isLessonKey = lessonKeys.includes(key.id);

        // Premium Tactile Palettes
        const fingerStyles: Record<string, string> = {
            'l-pinky': "bg-rose-50/50 border-rose-200 text-rose-700",
            'l-ring': "bg-orange-50/50 border-orange-200 text-orange-700",
            'l-middle': "bg-emerald-50/50 border-emerald-200 text-emerald-700",
            'l-index': "bg-sky-50/50 border-sky-200 text-sky-700",
            'l-thumb': "bg-violet-50/50 border-violet-200 text-violet-700",
            'r-thumb': "bg-violet-50/50 border-violet-200 text-violet-700",
            'r-index': "bg-sky-50/50 border-sky-200 text-sky-700",
            'r-middle': "bg-emerald-50/50 border-emerald-200 text-emerald-700",
            'r-ring': "bg-orange-50/50 border-orange-200 text-orange-700",
            'r-pinky': "bg-rose-50/50 border-rose-200 text-rose-700",
        };

        // Style keys based on lesson membership
        let colorStyle = "";
        if (isSpecialKey) {
            // Special keys get unique highlighting
            colorStyle = "bg-gradient-to-br from-amber-100/80 to-orange-100/80 border-2 border-amber-400/60 shadow-[inset_0_-4px_0_rgba(251,191,36,0.2),0_6px_20px_rgba(251,191,36,0.3)] hover:from-amber-200/80 hover:to-orange-200/80 hover:border-amber-500/60 hover:scale-105";
        } else if (isLessonKey) {
            // Active lesson keys get highlighted with finger colors
            if (key.finger && fingerStyles[key.finger]) {
                colorStyle = fingerStyles[key.finger] + " border shadow-[inset_0_-4px_0_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.03)]";
            } else {
                colorStyle = "bg-yellow-100 border-yellow-300 text-yellow-800 shadow-[inset_0_-4px_0_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.03)]";
            }
        } else {
            // Non-lesson keys appear disabled/dimmed
            colorStyle = "bg-slate-50/30 border-slate-200/30 text-slate-400/50 shadow-none opacity-40";
        }

        // Active Target State
        if (isTarget) {
            return base + "bg-primary border-primary-dark text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_10px_30px_rgba(99,102,241,0.4)] scale-105 z-20 ring-4 ring-primary/10 -translate-y-1";
        }

        // Physical Animated Press Effect
        if (isPressed) {
            // Show red color for wrong key press
            if (isWrongKey) {
                return base + "bg-red-500 border-red-600 text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(239,68,68,0.4)] translate-y-1 scale-[0.97] z-20 animate-pulse";
            }
            const pressStyle = isTarget ? "bg-primary" : (isShift && isShiftRequired ? "bg-secondary" : "bg-accent");
            return base + pressStyle + " text-white border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] translate-y-1 scale-[0.97] z-20";
        }

        // Shift Guidance State
        if (isShift && isShiftRequired) {
            return base + "bg-secondary border-secondary-dark text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(14,165,233,0.3)] animate-pulse -translate-y-0.5";
        }

        return base + colorStyle + " border border-slate-300/30 hover:-translate-y-0.5 transition-transform duration-200";
    };


    return (
        <div className="w-full max-w-5xl mx-auto p-1 md:p-2 keyboard-deck rounded-[1rem] border border-white/10 shadow-[0_0_50px_-10px_rgba(99,102,241,0.3),inset_0_2px_10px_rgba(255,255,255,0.05)] relative group overflow-hidden">

            {/* Dynamic RGB Underglow / Ambient Light */}
            <div className="absolute inset-0 rounded-[3.5rem] opacity-60">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-black/40"></div>
            </div>

            {/* Keyboard Frame Decorative Elements */}
            <div className="absolute top-4 left-10 flex gap-1.5 pointer-events-none opacity-20">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>

            <div className="absolute top-4 right-10 flex items-center gap-3 opacity-30 pointer-events-none">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Unicode InScript</span>
                    <span className="text-[6px] font-bold text-primary italic">Precision Series v2.0</span>
                </div>
            </div>

            <div className="flex flex-col gap-1 relative z-10 pt-4">
                {keyboardRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex w-full justify-center">
                        {row.map((key) => {
                            const isTarget = key.id === activeKeyId;
                            const isPressed = key.id === pressedKeyId;

                            return (

                                <div
                                    key={key.id}
                                    className={`${getKeyStyle(key)} ${key.id === 'Space' ? 'h-10 md:h-12' : ''}`}
                                >
                                    {/* Physical Keycap Top Surface */}
                                    <div className={`absolute inset-0 rounded-2xl transition-opacity ${isPressed ? 'bg-black/10' : 'bg-white/5 opacity-0 group-hover:opacity-100'}`}></div>

                                    {/* Hindi Characters - Base and Shift */}
                                    <div className="flex flex-col items-center justify-center pt-2 relative z-10">
                                        {/* Shift Component (Upper Legend) */}
                                        {key.shiftHindi && (
                                            <span className={`text-[14px] md:text-[15px] hindi-text font-black transition-all transform ${isTarget || isPressed ? 'text-white drop-shadow-lg' : (isShiftRequired ? 'text-cyan-400 scale-110 drop-shadow-md' : 'text-white drop-shadow-sm')}`}>
                                                {key.shiftHindi}
                                            </span>
                                        )}

                                        {/* Main Component - Base Character */}
                                        {key.hindi ? (
                                            <span className={`text-3xl md:text-4xl font-black hindi-text -mt-1 transition-all ${isTarget || isPressed ? 'text-white drop-shadow-lg' : (isShiftRequired ? 'opacity-30 translate-y-1' : 'text-white drop-shadow-md')}`}>
                                                {key.hindi}
                                            </span>
                                        ) : (
                                            <span className="text-[12px] md:text-[13px] font-black uppercase text-white drop-shadow-md tracking-wider">
                                                {key.id === 'Space' ? 'SPACE' : 
                                                 key.id === 'CapsLock' ? 'CAPS' :
                                                 key.id === 'ShiftLeft' || key.id === 'ShiftRight' ? 'SHIFT' :
                                                 key.id === 'ControlLeft' || key.id === 'ControlRight' ? 'CTRL' :
                                                 key.id === 'AltLeft' || key.id === 'AltRight' ? 'ALT' :
                                                 key.id === 'Enter' ? 'ENTER' :
                                                 key.id === 'Backspace' ? 'BACK' :
                                                 key.id === 'Tab' ? 'TAB' :
                                                 key.label}
                                            </span>
                                        )}
                                    </div>

                                    {/* State Glow */}
                                    {isTarget && !isPressed && (
                                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse -z-10"></div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisualKeyboard;
