let result = (function () {
    const faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    const Suits = {
        SPADES: '♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS: '♣',
    }

    const suitsArr = Object.values(Suits);

    class Card {
        constructor(face, suit) {
            if (faces.includes(face)) {
                this._face = face;
            } else throw new Error('Error');
            if (suitsArr.includes(suit)) {
                this._suit = suit;
            } else throw new Error('Error');
        }

        get face() {
            return this._face;
        }

        set face(face) {
            if (faces.includes(face)) {
                this._face = face;
            } else throw new Error('Error');
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (suitsArr.includes(suit)) {
                this._suit = suit;
            } else throw new Error('Error');
        }
    }


    return {
        Suits: Suits,
        Card: Card
    }
}())

let Suits = result.Suits;
let Card = result.Card;

console.log(() => new Card("1", Suits.CLUBS))