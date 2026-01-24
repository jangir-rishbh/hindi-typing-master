export interface StructuredLesson {
    id: number;
    title: string;
    description: string;
    row: 'home' | 'upper' | 'lower';
    newCharacters: {
        key: string;
        hindi: string;
        shiftHindi: string;
        finger: string;
    }[];
    allCharacters: string[]; // Cumulative characters for practice
    content: string; // Practice text using only allowed characters
    keys: string[]; // Key IDs for highlighting
}

// Helper function to generate practice text
const generatePracticeText = (characters: string[], count: number = 20): string => {
    const words: string[] = [];
    
    // Generate simple 2-3 character words
    for (let i = 0; i < count; i++) {
        const wordLength = Math.random() > 0.5 ? 2 : 3;
        let word = '';
        
        for (let j = 0; j < wordLength; j++) {
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            word += randomChar;
        }
        
        words.push(word);
    }
    
    return words.join(' ');
};

// Character mappings from keyboard layout
const homeRowChars = [
    { key: 'KeyA', hindi: 'ो', shiftHindi: 'ओ', finger: 'l-pinky' },
    { key: 'KeyS', hindi: 'े', shiftHindi: 'ए', finger: 'l-ring' },
    { key: 'KeyD', hindi: '्', shiftHindi: 'अ', finger: 'l-middle' },
    { key: 'KeyF', hindi: 'ि', shiftHindi: 'इ', finger: 'l-index' },
    { key: 'KeyG', hindi: 'ु', shiftHindi: 'उ', finger: 'l-index' },
    { key: 'KeyH', hindi: 'प', shiftHindi: 'फ', finger: 'r-index' },
    { key: 'KeyJ', hindi: 'र', shiftHindi: 'ऱ', finger: 'r-index' },
    { key: 'KeyK', hindi: 'क', shiftHindi: 'ख', finger: 'r-middle' },
    { key: 'KeyL', hindi: 'त', shiftHindi: 'थ', finger: 'r-ring' },
    { key: 'Semicolon', hindi: 'च', shiftHindi: 'छ', finger: 'r-pinky' },
    { key: 'Quote', hindi: 'ट', shiftHindi: 'ठ', finger: 'r-pinky' },
];

const upperRowChars = [
    { key: 'KeyQ', hindi: 'ौ', shiftHindi: 'औ', finger: 'l-pinky' },
    { key: 'KeyW', hindi: 'ै', shiftHindi: 'ऐ', finger: 'l-ring' },
    { key: 'KeyE', hindi: 'ा', shiftHindi: 'आ', finger: 'l-middle' },
    { key: 'KeyR', hindi: 'ी', shiftHindi: 'ई', finger: 'l-index' },
    { key: 'KeyT', hindi: 'ू', shiftHindi: 'ऊ', finger: 'l-index' },
    { key: 'KeyY', hindi: 'ब', shiftHindi: 'भ', finger: 'r-index' },
    { key: 'KeyU', hindi: 'ह', shiftHindi: 'ङ', finger: 'r-index' },
    { key: 'KeyI', hindi: 'ग', shiftHindi: 'घ', finger: 'r-middle' },
    { key: 'KeyO', hindi: 'द', shiftHindi: 'ध', finger: 'r-ring' },
    { key: 'KeyP', hindi: 'ज', shiftHindi: 'झ', finger: 'r-pinky' },
    { key: 'BracketLeft', hindi: 'ड', shiftHindi: 'ढ', finger: 'r-pinky' },
    { key: 'BracketRight', hindi: '़', shiftHindi: 'ञ', finger: 'r-pinky' },
];

const lowerRowChars = [
    { key: 'KeyZ', hindi: 'र्', shiftHindi: '्र', finger: 'l-pinky' },
    { key: 'KeyX', hindi: 'ं', shiftHindi: 'ँ', finger: 'l-ring' },
    { key: 'KeyC', hindi: 'म', shiftHindi: 'ण', finger: 'l-middle' },
    { key: 'KeyV', hindi: 'न', shiftHindi: 'ऩ', finger: 'l-index' },
    { key: 'KeyB', hindi: 'व', shiftHindi: 'ऑ', finger: 'l-index' },
    { key: 'KeyN', hindi: 'ल', shiftHindi: 'ळ', finger: 'r-index' },
    { key: 'KeyM', hindi: 'स', shiftHindi: 'श', finger: 'r-index' },
    { key: 'Comma', hindi: ',', shiftHindi: 'ष', finger: 'r-middle' },
    { key: 'Period', hindi: '.', shiftHindi: '।', finger: 'r-ring' },
    { key: 'Slash', hindi: 'य', shiftHindi: '?', finger: 'r-pinky' },
];

export const structuredLessons: StructuredLesson[] = [
    // Lesson 1: All Home Row characters
    {
        id: 1,
        title: "Lesson 1: Home Row Mastery",
        description: "Master all home row characters with proper finger placement",
        row: 'home',
        newCharacters: homeRowChars,
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi)], 25),
        keys: homeRowChars.map(c => c.key)
    },

    // Lesson 2: Upper Row - First 2 characters (Q, W)
    {
        id: 2,
        title: "Lesson 2: Upper Row - औ ऐ",
        description: "Learn upper row characters: औ (Q) and ऐ (W)",
        row: 'upper',
        newCharacters: [upperRowChars[0], upperRowChars[1]], // Q, W
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi), 
                       upperRowChars[0].hindi, upperRowChars[0].shiftHindi, 
                       upperRowChars[1].hindi, upperRowChars[1].shiftHindi, ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi), 
                                     upperRowChars[0].hindi, upperRowChars[0].shiftHindi, 
                                     upperRowChars[1].hindi, upperRowChars[1].shiftHindi], 20),
        keys: [...homeRowChars.map(c => c.key), upperRowChars[0].key, upperRowChars[1].key]
    },

    // Lesson 3: Upper Row - Next 2 characters (E, R)
    {
        id: 3,
        title: "Lesson 3: Upper Row - आ ई",
        description: "Learn upper row characters: आ (E) and ई (R)",
        row: 'upper',
        newCharacters: [upperRowChars[2], upperRowChars[3]], // E, R
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.slice(0, 4).map(c => c.hindi), ...upperRowChars.slice(0, 4).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.slice(0, 4).map(c => c.hindi), ...upperRowChars.slice(0, 4).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.slice(0, 4).map(c => c.key)]
    },

    // Lesson 4: Upper Row - Next 2 characters (T, Y)
    {
        id: 4,
        title: "Lesson 4: Upper Row - ऊ ब",
        description: "Learn upper row characters: ऊ (T) and ब (Y)",
        row: 'upper',
        newCharacters: [upperRowChars[4], upperRowChars[5]], // T, Y
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.slice(0, 6).map(c => c.hindi), ...upperRowChars.slice(0, 6).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.slice(0, 6).map(c => c.hindi), ...upperRowChars.slice(0, 6).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.slice(0, 6).map(c => c.key)]
    },

    // Lesson 5: Upper Row - Next 2 characters (U, I)
    {
        id: 5,
        title: "Lesson 5: Upper Row - ह ग",
        description: "Learn upper row characters: ह (U) and ग (I)",
        row: 'upper',
        newCharacters: [upperRowChars[6], upperRowChars[7]], // U, I
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.slice(0, 8).map(c => c.hindi), ...upperRowChars.slice(0, 8).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.slice(0, 8).map(c => c.hindi), ...upperRowChars.slice(0, 8).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.slice(0, 8).map(c => c.key)]
    },

    // Lesson 6: Upper Row - Next 2 characters (O, P)
    {
        id: 6,
        title: "Lesson 6: Upper Row - द ज",
        description: "Learn upper row characters: द (O) and ज (P)",
        row: 'upper',
        newCharacters: [upperRowChars[8], upperRowChars[9]], // O, P
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.slice(0, 10).map(c => c.hindi), ...upperRowChars.slice(0, 10).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.slice(0, 10).map(c => c.hindi), ...upperRowChars.slice(0, 10).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.slice(0, 10).map(c => c.key)]
    },

    // Lesson 7: Upper Row - Last 2 characters ([, ])
    {
        id: 7,
        title: "Lesson 7: Upper Row - ड ़",
        description: "Learn upper row characters: ड ([) and ़ (])",
        row: 'upper',
        newCharacters: [upperRowChars[10], upperRowChars[11]], // [, ]
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi)], 25),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.map(c => c.key)]
    },

    // Lesson 8: Lower Row - First 2 characters (Z, X)
    {
        id: 8,
        title: "Lesson 8: Lower Row - र् ं",
        description: "Learn lower row characters: र् (Z) and ं (X)",
        row: 'lower',
        newCharacters: [lowerRowChars[0], lowerRowChars[1]], // Z, X
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                       lowerRowChars[0].hindi, lowerRowChars[0].shiftHindi,
                       lowerRowChars[1].hindi, lowerRowChars[1].shiftHindi, ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                                     lowerRowChars[0].hindi, lowerRowChars[0].shiftHindi,
                                     lowerRowChars[1].hindi, lowerRowChars[1].shiftHindi], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.map(c => c.key), lowerRowChars[0].key, lowerRowChars[1].key]
    },

    // Lesson 9: Lower Row - Next 2 characters (C, V)
    {
        id: 9,
        title: "Lesson 9: Lower Row - म न",
        description: "Learn lower row characters: म (C) and न (V)",
        row: 'lower',
        newCharacters: [lowerRowChars[2], lowerRowChars[3]], // C, V
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                       ...lowerRowChars.slice(0, 4).map(c => c.hindi), ...lowerRowChars.slice(0, 4).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                                     ...lowerRowChars.slice(0, 4).map(c => c.hindi), ...lowerRowChars.slice(0, 4).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.map(c => c.key), ...lowerRowChars.slice(0, 4).map(c => c.key)]
    },

    // Lesson 10: Lower Row - Next 2 characters (B, N)
    {
        id: 10,
        title: "Lesson 10: Lower Row - व ल",
        description: "Learn lower row characters: व (B) and ल (N)",
        row: 'lower',
        newCharacters: [lowerRowChars[4], lowerRowChars[5]], // B, N
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                       ...lowerRowChars.slice(0, 6).map(c => c.hindi), ...lowerRowChars.slice(0, 6).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                                     ...lowerRowChars.slice(0, 6).map(c => c.hindi), ...lowerRowChars.slice(0, 6).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.map(c => c.key), ...lowerRowChars.slice(0, 6).map(c => c.key)]
    },

    // Lesson 11: Lower Row - Next 2 characters (M, ,)
    {
        id: 11,
        title: "Lesson 11: Lower Row - स ,",
        description: "Learn lower row characters: स (M) and , (,)",
        row: 'lower',
        newCharacters: [lowerRowChars[6], lowerRowChars[7]], // M, ,
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                       ...lowerRowChars.slice(0, 8).map(c => c.hindi), ...lowerRowChars.slice(0, 8).map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                                     ...lowerRowChars.slice(0, 8).map(c => c.hindi), ...lowerRowChars.slice(0, 8).map(c => c.shiftHindi)], 20),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.map(c => c.key), ...lowerRowChars.slice(0, 8).map(c => c.key)]
    },

    // Lesson 12: Lower Row - Last 2 characters (., /)
    {
        id: 12,
        title: "Lesson 12: Lower Row - . य",
        description: "Learn lower row characters: . (.) and य (/)",
        row: 'lower',
        newCharacters: [lowerRowChars[8], lowerRowChars[9]], // ., /
        allCharacters: [...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                       ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                       ...lowerRowChars.map(c => c.hindi), ...lowerRowChars.map(c => c.shiftHindi), ' '],
        content: generatePracticeText([...homeRowChars.map(c => c.hindi), ...homeRowChars.map(c => c.shiftHindi),
                                     ...upperRowChars.map(c => c.hindi), ...upperRowChars.map(c => c.shiftHindi),
                                     ...lowerRowChars.map(c => c.hindi), ...lowerRowChars.map(c => c.shiftHindi)], 25),
        keys: [...homeRowChars.map(c => c.key), ...upperRowChars.map(c => c.key), ...lowerRowChars.map(c => c.key)]
    }
];

// Helper function to get lesson by ID
export const getStructuredLessonById = (id: number): StructuredLesson | undefined => {
    return structuredLessons.find(lesson => lesson.id === id);
};

// Helper function to get all lessons for a specific row
export const getLessonsByRow = (row: 'home' | 'upper' | 'lower'): StructuredLesson[] => {
    return structuredLessons.filter(lesson => lesson.row === row);
};
