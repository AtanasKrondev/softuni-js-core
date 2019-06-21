function printDeckOfCards(cards) {
    let deck = [];
    let invalidCard = false;
    cards.forEach(card => {
        const face = card.slice(0, -1);
        const suit = card.slice(-1);
        deck.push(createCard(face, suit));
    })

    if (!invalidCard) {
        console.log(deck.join(' '));
    }

    function createCard(face, suit) {
        const validFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const validSuit = ['S', 'H', 'D', 'C'];
        if (validFace.includes(face) && validSuit.includes(suit)) {
            let suitSymbol = () => {
                switch (suit) {
                    case 'S': return `\u2660`;
                    case 'H': return `\u2665`;
                    case 'D': return `\u2666`;
                    case 'C': return `\u2663`;
                }
            }
            return {
                face,
                suit: suitSymbol(),
                toString: function () {
                    return `${this.face}${this.suit}`;
                }
            }
        } else {
            console.log(`Invalid card: ${face}${suit}`);
            invalidCard = true;
        };
    }
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
