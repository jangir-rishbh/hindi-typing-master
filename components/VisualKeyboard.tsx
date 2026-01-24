
import React from 'react';
import { keyboardRows, KeyData } from '../data/keyboardLayout';

interface VisualKeyboardProps {
    activeKeyId?: string | null;     // The key the user SHOULD press
    pressedKeyId?: string | null;    // The key the user JUST pressed
    isShiftRequired?: boolean;       // If true, highlight Shift keys
    activeLessonId?: number | null;  // New: Current lesson ID for highlighting rows
}

const VisualKeyboard: React.FC<VisualKeyboardProps> = ({
    activeKeyId,
    pressedKeyId,
    isShiftRequired = false,
    activeLessonId = null
}) => {

    const getKeyStyle = (key: KeyData) => {
        let base = "relative flex flex-col items-center justify-center m-[4px] rounded-2xl transition-all duration-75 select-none group ";

        // Width handling
        if (key.width) {
            base += key.width + " ";
        } else {
            base += "flex-1 h-12 md:h-14 ";
        }

        const isTarget = key.id === activeKeyId;
        const isPressed = key.id === pressedKeyId;
        const isShift = key.id === 'ShiftLeft' || key.id === 'ShiftRight';

        // Define key sets for different lessons
        const homeRowKeys = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Space'];
        const upperRowKeys = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Space'];
        const lowerRowKeys = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'Space'];

        let isLessonKey = false;
        if (activeLessonId === 1) {
            isLessonKey = homeRowKeys.includes(key.id);
        } else if (activeLessonId === 2) {
            isLessonKey = upperRowKeys.includes(key.id);
        } else if (activeLessonId === 3) {
            isLessonKey = lowerRowKeys.includes(key.id);
        }

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

        const defaultStyle = "bg-white/80 border-slate-200 text-slate-700 shadow-[inset_0_-4px_0_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.03)]";
        let colorStyle = defaultStyle;

        if (isLessonKey) {
            colorStyle = "bg-yellow-100 border-yellow-300 text-yellow-800 shadow-[inset_0_-4px_0_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.03)]";
        } else if (key.finger && fingerStyles[key.finger]) {
            colorStyle = fingerStyles[key.finger] + " border shadow-[inset_0_-4px_0_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.03)]";
        }

        // Active Target State
        if (isTarget) {
            return base + "bg-primary border-primary-dark text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_10px_30px_rgba(99,102,241,0.4)] scale-105 z-20 ring-4 ring-primary/10 -translate-y-1";
        }

        // Physical Animated Press Effect
        if (isPressed) {
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
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6 keyboard-deck rounded-[3.5rem] border border-white/10 shadow-[0_0_80px_-20px_rgba(99,102,241,0.3),inset_0_2px_20px_rgba(255,255,255,0.05)] relative group overflow-hidden">

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

            <div className="flex flex-col gap-2 relative z-10 pt-8">
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
                                            <span className={`text-[13px] md:text-[14px] hindi-text font-bold transition-all transform ${isTarget || isPressed ? 'text-white' : (isShiftRequired ? 'text-primary scale-110 opacity-100' : 'text-slate-600 opacity-80')}`}>
                                                {key.shiftHindi}
                                            </span>
                                        )}

                                        {/* Main Component - Base Character */}
                                        {key.hindi && (
                                            <span className={`text-2xl md:text-3xl font-bold hindi-text -mt-1 transition-all ${isTarget || isPressed ? 'text-white scale-110' : (isShiftRequired ? 'opacity-20 translate-y-1' : 'text-slate-800')}`}>
                                                {key.hindi}
                                            </span>
                                        )}

                                        {/* Special Keys - Show label if no Hindi character */}
                                        {!key.hindi && (
                                            <span className="text-[10px] md:text-[11px] font-black uppercase opacity-60 tracking-[.25em]">
                                                {key.id === 'Space' ? 'SPACE' : 
                                                 key.id === 'CapsLock' ? 'CAPS' :
                                                 key.id === 'ShiftLeft' || key.id === 'ShiftRight' ? 'SHIFT' :
                                                 key.id === 'ControlLeft' || key.id === 'ControlRight' ? 'CTRL' :
                                                 key.id === 'AltLeft' || key.id === 'AltRight' ? 'ALT' :
                                                 key.id === 'Enter' ? 'ENTER' :
                                                 key.id === 'Backspace' ? 'BACKSPACE' :
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
