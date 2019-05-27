function sortByTwoCriterias(arr) {
    arr.sort((a, b) =>
        a.length - b.length ||
        a.toLowerCase().localeCompare(b.toLowerCase()))
        .forEach(e => console.log(e))
}

sortByTwoCriterias(['alpha',
    'beta',
    'gamma'])