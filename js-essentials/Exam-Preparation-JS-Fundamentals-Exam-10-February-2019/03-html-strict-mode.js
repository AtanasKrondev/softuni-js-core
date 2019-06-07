function htmlStrictMode(htmlCode) {
    let parentPatern = /^(<(\w+)>).*(<\/\2>)$/;
    let childPatern = /(<(\w+)>).*(<\/\2>)/;
    let resultArr = [];
    htmlCode.forEach(line => {
        if (line.match(parentPatern) !== null) {
            let fullMatch = line.match(parentPatern)[0];
            let openP = line.match(parentPatern)[1];
            let closeP = line.match(parentPatern)[3];
            let result = fullMatch.replace(openP, '').replace(closeP, '');
            let childMatch;

            while ((childMatch = childPatern.exec(result)) !== null) {
                let openC = childMatch[1];
                let closeC = childMatch[3];
                result = result.replace(openC, '').replace(closeC, '');
            }

            resultArr.push(result);
        }
    });

    console.log(resultArr.join(' '));    
}

htmlStrictMode(['<div><p>This</p> is</div>',
    '<div><a>perfectly</a></div>',
    '<divs><p>valid</p></divs>',
    '<div><p>This</div></p>',
    '<div><p>is not</p><div>']);

htmlStrictMode(['<h1><span>Hello World!</span></h1>',
    '<p>I am Peter.']);