function wordsUppercase(input) {
    console.log(input
        .toUpperCase()
        .split(/\W+/)
        .filter(w => w !== '')
        .join(', '));
}

wordsUppercase('Hi, how are you?');