class Slot {
    start(number, authorId, authorName) {
        
        if (!number || isNaN(number)) {
            return 'Ungültige Eingabe! Bitte gib eine Zahl an.'
        }

        const randomBool = Math.random() < 0.5;
        return `Für die Zahl ${number} wurde der Bool-Wert ${randomBool} generiert.`;
    }
}