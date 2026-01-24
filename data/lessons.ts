
export interface Lesson {
    id: number;
    title: string;
    description: string;
    content: string; // The text to type
    keys: string[]; // Keys focused on in this lesson (for highlighting)
}

export const lessons: Lesson[] = [
    {
        id: 1,
        title: "Lesson 1: Home Row Mastery",
        description: "Master all home row characters with proper finger placement",
        content: "ोो ओो एे एे ्् अअ िि इइ उु उु पप फफ रर ऱऱ कक खख तत थथ चच छछ टट ठठ ओो एे अअ इइ उु पप रर कक तत चच टट",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote']
    },
    {
        id: 2,
        title: "Lesson 2: Upper Row - औ ऐ",
        description: "Learn upper row characters: औ (Q) and ऐ (W)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ ओो एे अअ ौौ औऔ ऐै ऐऐ पप रर कक ौौ औऔ ऐै ऐऐ",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW']
    },
    {
        id: 3,
        title: "Lesson 3: Upper Row - आ ई",
        description: "Learn upper row characters: आ (E) and ई (R)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी पप रर कक तत",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR']
    },
    {
        id: 4,
        title: "Lesson 4: Upper Row - ऊ ब",
        description: "Learn upper row characters: ऊ (T) and ब (Y)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ पप रर कक",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY']
    },
    {
        id: 5,
        title: "Lesson 5: Upper Row - ह ग",
        description: "Learn upper row characters: ह (U) and ग (I)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ पप रर",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI']
    },
    {
        id: 6,
        title: "Lesson 6: Upper Row - द ज",
        description: "Learn upper row characters: द (O) and ज (P)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ पप रर कक",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP']
    },
    {
        id: 7,
        title: "Lesson 7: Upper Row - ड ़",
        description: "Learn upper row characters: ड ([) and ़ (])",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ पप रर कक तत चच टट",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight']
    },
    {
        id: 8,
        title: "Lesson 8: Lower Row - र् ं",
        description: "Learn lower row characters: र् (Z) and ं (X)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ पप रर कक",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'KeyZ', 'KeyX']
    },
    {
        id: 9,
        title: "Lesson 9: Lower Row - म न",
        description: "Learn lower row characters: म (C) and न (V)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ पप रर कक तत",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'KeyZ', 'KeyX', 'KeyC', 'KeyV']
    },
    {
        id: 10,
        title: "Lesson 10: Lower Row - व ल",
        description: "Learn lower row characters: व (B) and ल (N)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ वव ऑऑ लल ळळ ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ वव ऑऑ लल ळळ पप रर कक तत चच",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN']
    },
    {
        id: 11,
        title: "Lesson 11: Lower Row - स ,",
        description: "Learn lower row characters: स (M) and , (,)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ वव ऑऑ लल ळळ सस शश ,, षष ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ वव ऑऑ लल ळळ सस शश ,, षष पप रर कक तत चच टट",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma']
    },
    {
        id: 12,
        title: "Lesson 12: Lower Row - . य",
        description: "Learn lower row characters: . (.) and य (/)",
        content: "ोो एे अअ इइ पप रर कक तत चच टट ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ वव ऑऑ लल ळळ सस शश ,, षष .. ।। यय ?? ओो एे अअ ौौ औऔ ऐै ऐऐ आा आआ ईी ईी ऊू ऊू बब भभ हह ङङ गग घघ दद धध जज झझ डड ढढ ़़ ञञ र्र् र्र् ंं ंँ मम णण नन ऩऩ वव ऑऑ लल ळळ सस शश ,, षष .. ।। यय ?? पप रर कक तत चच टट ओो एे अअ",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash']
    }
];
