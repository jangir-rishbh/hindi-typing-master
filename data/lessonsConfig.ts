export interface LessonConfig {
    id: string;
    title: string;
    description: string;
    content: string;
    keys: string[];
    category: 'home-row' | 'upper-row' | 'lower-row';
    guidance: {
        title: string;
        subtitle: string;
    };
}

export const lessonsConfig: LessonConfig[] = [
    {
        id: 'home-row',
        title: "Lesson 1: Home Row Mastery",
        description: "Master all home row characters with proper finger placement",
        content: "ोो ओो एे एे ्् अअ िि इइ उु उु पप फफ रर ऱऱ कक खख तत थथ चच छछ टट ठठ ओो एे अअ इइ उु पप रर कक तत चच टट",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'home-row',
        guidance: {
            title: 'Home Row Finger Guidance',
            subtitle: 'Learn which finger to use for A, S, D, F, G, H, J, K, L, ; and Space keys'
        }
    },
    {
        id: 'upper-row-1',
        title: "Lesson 2: Upper Row - औ ऐ",
        description: "Learn upper row characters: औ (Q) and ऐ (W)",
        content: "ौौ औऔ ऐै ऐऐ ौौ औऔ ऐै ऐऐ ौौ औऔ ऐै ऐऐ ौौ औऔ ऐै ऐऐ ौौ औऔ ऐै ऐऐ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyQ', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'upper-row',
        guidance: {
            title: 'Upper Row Finger Guidance',
            subtitle: 'Learn which finger to use for upper row keys and Space keys'
        }
    },
    {
        id: 'upper-row-2',
        title: "Lesson 3: Upper Row - आ ई",
        description: "Learn upper row characters: आ (E) and ई (R)",
        content: "आा आआ ईी ईी आा आआ ईी ईी आा आआ ईी ईी आा आआ ईी ईी ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyE', 'KeyR', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'upper-row',
        guidance: {
            title: 'Upper Row Finger Guidance',
            subtitle: 'Learn which finger to use for upper row keys and Space keys'
        }
    },
    {
        id: 'upper-row-3',
        title: "Lesson 4: Upper Row - ऊ ब",
        description: "Learn upper row characters: ऊ (T) and ब (Y)",
        content: "ऊू ऊू बब भभ ऊू ऊू बब भभ ऊू ऊू बब भभ ऊू ऊू बब भभ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyT', 'KeyY', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'upper-row',
        guidance: {
            title: 'Upper Row Finger Guidance',
            subtitle: 'Learn which finger to use for upper row keys and Space keys'
        }
    },
    {
        id: 'upper-row-4',
        title: "Lesson 5: Upper Row - ह ग",
        description: "Learn upper row characters: ह (U) and ग (I)",
        content: "हह ङङ गग घघ हह ङङ गग घघ हह ङङ गग घघ हह ङङ गग घघ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyU', 'KeyI', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'upper-row',
        guidance: {
            title: 'Upper Row Finger Guidance',
            subtitle: 'Learn which finger to use for upper row keys and Space keys'
        }
    },
    {
        id: 'upper-row-5',
        title: "Lesson 6: Upper Row - द ज",
        description: "Learn upper row characters: द (O) and ज (P)",
        content: "दद धध जज झझ दद धध जज झझ दद धध जज झझ दद धध जज झझ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'upper-row',
        guidance: {
            title: 'Upper Row Finger Guidance',
            subtitle: 'Learn which finger to use for upper row keys and Space keys'
        }
    },
    {
        id: 'upper-row-6',
        title: "Lesson 7: Upper Row - ड ़",
        description: "Learn upper row characters: ड ([) and ़ (])",
        content: "डड ढढ ़़ ञञ डड ढढ ़़ ञञ डड ढढ ़़ ञञ डड ढढ ़़ ञञ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['BracketLeft', 'BracketRight', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'upper-row',
        guidance: {
            title: 'Upper Row Finger Guidance',
            subtitle: 'Learn which finger to use for upper row keys and Space keys'
        }
    },
    {
        id: 'lower-row-1',
        title: "Lesson 8: Lower Row - र् ं",
        description: "Learn lower row characters: र् (Z) and ं (X)",
        content: "र्र् र्र् ंं ंँ र्र् र्र् ंं ंँ र्र् र्र् ंं ंँ र्र् र्र् ंं ंँ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyZ', 'KeyX', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'lower-row',
        guidance: {
            title: 'Lower Row Finger Guidance',
            subtitle: 'Learn which finger to use for lower row keys and Space keys'
        }
    },
    {
        id: 'lower-row-2',
        title: "Lesson 9: Lower Row - म न",
        description: "Learn lower row characters: म (C) and न (V)",
        content: "मम णण नन ऩऩ मम णण नन ऩऩ मम णण नन ऩऩ मम णण नन ऩऩ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyC', 'KeyV', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'lower-row',
        guidance: {
            title: 'Lower Row Finger Guidance',
            subtitle: 'Learn which finger to use for lower row keys and Space keys'
        }
    },
    {
        id: 'lower-row-3',
        title: "Lesson 10: Lower Row - व ल",
        description: "Learn lower row characters: व (B) and ल (N)",
        content: "वव ऑऑ लल ळळ वव ऑऑ लल ळळ वव ऑऑ लल ळळ वव ऑऑ लल ळळ ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyB', 'KeyN', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'lower-row',
        guidance: {
            title: 'Lower Row Finger Guidance',
            subtitle: 'Learn which finger to use for lower row keys and Space keys'
        }
    },
    {
        id: 'lower-row-4',
        title: "Lesson 11: Lower Row - स ,",
        description: "Learn lower row characters: स (M) and , (,)",
        content: "सस शश ,, षष सस शश ,, षष सस शश ,, षष सस शश ,, षष ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['KeyM', 'Comma', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'lower-row',
        guidance: {
            title: 'Lower Row Finger Guidance',
            subtitle: 'Learn which finger to use for lower row keys and Space keys'
        }
    },
    {
        id: 'lower-row-5',
        title: "Lesson 12: Lower Row - . य",
        description: "Learn lower row characters: . (.) and य (/)",
        content: ".. ।। यय ?? .. ।। यय ?? .. ।। यय ?? .. ।। यय ?? ओो एे अअ इइ पप रर कक तत चच टट ओो एे अअ इइ पप रर कक तत चच टट",
        keys: ['Period', 'Slash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
        category: 'lower-row',
        guidance: {
            title: 'Lower Row Finger Guidance',
            subtitle: 'Learn which finger to use for lower row keys and Space keys'
        }
    }
];

// Helper functions
export const getLessonById = (id: string): LessonConfig | undefined => {
    return lessonsConfig.find(lesson => lesson.id === id);
};

export const getLessonsByCategory = (category: 'home-row' | 'upper-row' | 'lower-row'): LessonConfig[] => {
    return lessonsConfig.filter(lesson => lesson.category === category);
};

export const getAllLessons = (): LessonConfig[] => {
    return lessonsConfig;
};
