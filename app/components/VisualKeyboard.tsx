
import React from 'react';
import { keyboardRows, KeyData } from '../data/keyboardLayout';

interface VisualKeyboardProps {
    activeKeyId?: string | null;     // The key the user SHOULD press
    pressedKeyId?: string | null;    // The key the user JUST pressed
    isShiftRequired?: boolean;       // If true, highlight Shift keys
}

const VisualKeyboard: React.FC<VisualKeyboardProps> = ({
    activeKeyId,
    pressedKeyId,
    isShiftRequired = false
}) => {

    const getKeyStyle = (key: KeyData) => {
        let base = "relative flex flex-col items-center justify-center m-1 rounded-md border shadow-sm transition-all duration-100 select-none ";

        // Width handling
        if (key.width) {
            base += key.width + " ";
        } else {
            base += "flex-1 h-14 "; // Default key size
        }

        // State Colors
        const isTarget = key.id === activeKeyId;
        const isPressed = key.id === pressedKeyId;
        const isShift = key.id === 'ShiftLeft' || key.id === 'ShiftRight';

        // Logic:
        // 1. If it's the target key -> Blue/Green pulsing
        // 2. If it's the wrong key pressed -> Red bg
        // 3. If it's Shift and Shift is needed -> Highlight

        if (isTarget) {
            return base + "bg-tm-key-target border-tm-key-target shadow-md scale-105 z-10 animate-pulse ring-2 ring-tm-key-active";
        }

        if (isPressed && !isTarget) {
            // Wrong key pressed
            return base + "bg-error text-white border-error";
        }

        if (isShift && isShiftRequired) {
            return base + "bg-yellow-100 border-yellow-400 ring-2 ring-yellow-400";
        }

        // Default
        return base + "bg-tm-key-bg border-tm-key-border text-gray-700 hover:bg-white";
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-gray-200 rounded-xl shadow-inner border border-gray-300">
            <div className="flex flex-col gap-1">
                {keyboardRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex w-full">
                        {row.map((key) => (
                            <div
                                key={key.id}
                                className={getKeyStyle(key)}
                            >
                                {/* English Label (Top Left) */}
                                <span className="absolute top-1 left-2 text-[10px] font-bold opacity-60">
                                    {key.label}
                                </span>

                                {/* Wrapper for Hindi Chars to center them */}
                                <div className="flex flex-col items-center justify-center pt-2">
                                    {/* Shift Hindi (Top) */}
                                    {key.shiftHindi && (
                                        <span className={`text-xs hindi-text ${isShiftRequired ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                                            {key.shiftHindi}
                                        </span>
                                    )}

                                    {/* Normal Hindi (Bottom/Main) */}
                                    {key.hindi && (
                                        <span className={`text-xl font-bold hindi-text -mt-1 ${!isShiftRequired ? 'text-black' : 'text-gray-500'}`}>
                                            {key.hindi}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisualKeyboard;
