
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
        title: "Lesson 1: Home Row",
        description: "Learn the base keys: क त च र and matras ो े ् ि",
        // Practice: kaka rara tata chacha, matras usage
        content: "कक कक रर रर तत तत चच चच कि कि कु कु के के को को करा करा चा चा चित चित रति रति केत केत कोको कोको चिकी चिकी कुकु कुकु",
        keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote']
    },
    {
        id: 2,
        title: "Lesson 2: Upper Row",
        description: "Learn the upper row keys: ौ ै ा ी ू and ब ह ग द ज ड",
        content: "बब हह गग दद जज डड ौौ ैै ाा ीी ूू बा बा बी बी बू बू बे बे बो बो है है हो हो गा गा गी गी गु गु दा दा दी दी जू जू जो जो",
        keys: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight']
    },
    {
        id: 3,
        title: "Lesson 3: Lower Row",
        description: "Learn the lower row keys: म न व ल स य and others",
        content: "मम नन वव लल सस यय मन मन वन वन लस लस रस रस चल चल कल कल कब कब जब जब तब तब मल मल नल नल वल वल",
        keys: ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash']
    },
    {
        id: 4,
        title: "Lesson 4: Common Words",
        description: "Practice typing common Hindi words combining all rows.",
        content: "कब कब सब सब जब जब तब तब अब अब नल नल पर पर घर घर कर कर सर सर बस बस रस रस मन मन धन धन जन जन वन वन",
        keys: []
    },
    {
        id: 5,
        title: "Lesson 5: Sentences",
        description: "Type full sentences to improve flow.",
        content: "राम घर चल। नल पर जल भर। अब घर चल। फल चख। डर मत। सच कह। पथ पर चल। रथ पर चढ़।",
        keys: []
    },
    {
        id: 6,
        title: "Lesson 6: Speed Test",
        description: "Test your speed with a longer paragraph.",
        content: "भारत देश महान है। यहाँ की संस्कृति बहुत पुरानी है। हमें अपने देश पर गर्व है। हिंदी हमारी राष्ट्रभाषा है। इसे सीखना और बोलना हमें अच्छा लगता है। अभ्यास से ही मनुष्य निपुण बनता है।",
        keys: []
    }
];
