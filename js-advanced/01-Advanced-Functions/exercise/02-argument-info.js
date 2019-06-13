function argumentsInfo(input) {
    let argumentsObj = {};
    for (let i = 0; i < arguments.length; i++) {
        let argumentValue = arguments[i];
        let argumentType = typeof arguments[i]
        console.log(`${argumentType}: ${argumentValue}`);
        if (!argumentsObj.hasOwnProperty(argumentType)) {
            argumentsObj[argumentType] = [];
        }
        argumentsObj[argumentType].push(argumentValue);
    }

    let sortedArguments = Object.entries(argumentsObj)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(e => console.log(`${e[0]} = ${e[1].length}`));
}

argumentsInfo('cat', 42, function () { console.log('Hello world!'); }, 'dog', {}, []);