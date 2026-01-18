
export interface KeyData {
  id: string; // The event.code or check key
  label: string; // English char to show
  hindi: string; // Hindi char to show
  shiftHindi?: string;
  width?: string; // CSS width class or value
  finger?: string; // Finger mapping for colors
}

export const keyboardRows: KeyData[][] = [
  // Row 1: Numbers
  [
    { id: 'Backquote', label: '`', hindi: '़', shiftHindi: '?' },
    { id: 'Digit1', label: '1', hindi: '१', shiftHindi: 'ऍ' },
    { id: 'Digit2', label: '2', hindi: '२', shiftHindi: 'ॅ' },
    { id: 'Digit3', label: '3', hindi: '३', shiftHindi: '्र' },
    { id: 'Digit4', label: '4', hindi: '४', shiftHindi: 'र्' },
    { id: 'Digit5', label: '5', hindi: '५', shiftHindi: 'ज्ञ' },
    { id: 'Digit6', label: '6', hindi: '६', shiftHindi: 'त्र' },
    { id: 'Digit7', label: '7', hindi: '७', shiftHindi: 'क्ष' },
    { id: 'Digit8', label: '8', hindi: '८', shiftHindi: 'श्र' },
    { id: 'Digit9', label: '9', hindi: '९', shiftHindi: '(' },
    { id: 'Digit0', label: '0', hindi: '०', shiftHindi: ')' },
    { id: 'Minus', label: '-', hindi: '-', shiftHindi: 'ः' },
    { id: 'Equal', label: '=', hindi: 'ृ', shiftHindi: 'ऋ' },
    { id: 'Backspace', label: '⌫', hindi: '', width: 'w-20' },
  ],
  // Row 2: Top
  [
    { id: 'Tab', label: 'Tab', hindi: '', width: 'w-20' },
    { id: 'KeyQ', label: 'Q', hindi: 'ौ', shiftHindi: 'औ', finger: 'l-pinky' },
    { id: 'KeyW', label: 'W', hindi: 'ै', shiftHindi: 'ऐ', finger: 'l-ring' },
    { id: 'KeyE', label: 'E', hindi: 'ा', shiftHindi: 'आ', finger: 'l-middle' },
    { id: 'KeyR', label: 'R', hindi: 'ी', shiftHindi: 'ई', finger: 'l-index' },
    { id: 'KeyT', label: 'T', hindi: 'ू', shiftHindi: 'ऊ', finger: 'l-index' },
    { id: 'KeyY', label: 'Y', hindi: 'ब', shiftHindi: 'भ', finger: 'r-index' },
    { id: 'KeyU', label: 'U', hindi: 'ह', shiftHindi: 'ङ', finger: 'r-index' },
    { id: 'KeyI', label: 'I', hindi: 'ग', shiftHindi: 'घ', finger: 'r-middle' },
    { id: 'KeyO', label: 'O', hindi: 'द', shiftHindi: 'ध', finger: 'r-ring' },
    { id: 'KeyP', label: 'P', hindi: 'ज', shiftHindi: 'झ', finger: 'r-pinky' },
    { id: 'BracketLeft', label: '[', hindi: 'ड', shiftHindi: 'ढ', finger: 'r-pinky' },
    { id: 'BracketRight', label: ']', hindi: '़', shiftHindi: 'ञ', finger: 'r-pinky' },
    { id: 'Backslash', label: '\\', hindi: 'ॉ', shiftHindi: 'ऑ', finger: 'r-pinky' },
  ],
  // Row 3: Home (A, S ... are mapped as requested)
  // A = ो, S = े, D = ्, F = ि
  // J = र, K = क, L = त, ; = च
  [
    { id: 'CapsLock', label: 'Caps', hindi: '', width: 'w-24' },
    { id: 'KeyA', label: 'A', hindi: 'ो', shiftHindi: 'ओ', finger: 'l-pinky' },
    { id: 'KeyS', label: 'S', hindi: 'े', shiftHindi: 'ए', finger: 'l-ring' },
    { id: 'KeyD', label: 'D', hindi: '्', shiftHindi: 'अ', finger: 'l-middle' },
    { id: 'KeyF', label: 'F', hindi: 'ि', shiftHindi: 'इ', finger: 'l-index' },
    { id: 'KeyG', label: 'G', hindi: 'ु', shiftHindi: 'उ', finger: 'l-index' },
    { id: 'KeyH', label: 'H', hindi: 'प', shiftHindi: 'फ', finger: 'r-index' },
    { id: 'KeyJ', label: 'J', hindi: 'र', shiftHindi: 'ऱ', finger: 'r-index' },
    { id: 'KeyK', label: 'K', hindi: 'क', shiftHindi: 'ख', finger: 'r-middle' },
    { id: 'KeyL', label: 'L', hindi: 'त', shiftHindi: 'थ', finger: 'r-ring' },
    { id: 'Semicolon', label: ';', hindi: 'च', shiftHindi: 'छ', finger: 'r-pinky' },
    { id: 'Quote', label: "'", hindi: 'ट', shiftHindi: 'ठ', finger: 'r-pinky' },
    { id: 'Enter', label: 'Enter', hindi: '', width: 'w-24' },
  ],
  // Row 4: Bottom
  [
    { id: 'ShiftLeft', label: 'Shift', hindi: '', width: 'w-32' },
    { id: 'KeyZ', label: 'Z', hindi: 'र्', shiftHindi: '्र', finger: 'l-pinky' },
    { id: 'KeyX', label: 'X', hindi: 'ं', shiftHindi: 'ँ', finger: 'l-ring' },
    { id: 'KeyC', label: 'C', hindi: 'म', shiftHindi: 'ण', finger: 'l-middle' },
    { id: 'KeyV', label: 'V', hindi: 'न', shiftHindi: 'ऩ', finger: 'l-index' },
    { id: 'KeyB', label: 'B', hindi: 'व', shiftHindi: 'ऑ', finger: 'l-index' },
    { id: 'KeyN', label: 'N', hindi: 'ल', shiftHindi: 'ळ', finger: 'r-index' },
    { id: 'KeyM', label: 'M', hindi: 'स', shiftHindi: 'श', finger: 'r-index' },
    { id: 'Comma', label: ',', hindi: ',', shiftHindi: 'ष', finger: 'r-middle' },
    { id: 'Period', label: '.', hindi: '.', shiftHindi: '।', finger: 'r-ring' },
    { id: 'Slash', label: '/', hindi: 'य', shiftHindi: '?', finger: 'r-pinky' },
    { id: 'ShiftRight', label: 'Shift', hindi: '', width: 'w-32' },
  ],
  // Row 5: Space
  [
     { id: 'Space', label: 'Space', hindi: '', width: 'w-96' }
  ]
];
