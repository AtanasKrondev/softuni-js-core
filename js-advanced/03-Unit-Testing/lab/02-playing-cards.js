function playingCards(face, suit) {
    const validFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const validSuit = ['S', 'H', 'D', 'C'];
    if (validFace.includes(face) && validSuit.includes(suit)) {
        return { face, suit }.toString()
    }
}

console.log(playingCards('2', 'S'));

