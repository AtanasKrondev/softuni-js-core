function townsToJSON(input) {
    let towns = [];
    input.shift();

    for (let line of input) {
        let town = convert(line);
        let townObj = createObj(town);
        towns.push(townObj);
    }

    console.log(JSON.stringify(towns));

    function convert(str) {
        let arr = str.split(/ ?\| ?/);
        arr.shift();
        arr.pop();
        return arr;
    }

    function createObj(arr) {
        let obj = {
            Town: arr[0],
            Latitude: Number(arr[1]),
            Longitude: Number(arr[2]),
        }

        return obj;
    }
}

townsToJSON(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']);