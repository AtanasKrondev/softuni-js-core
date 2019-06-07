function autoService(input) {
    let parts = {};
    let instructions = [];

    for (const line of input) {
        const [action, brand, ...params] = line.split(' ');

        switch (action) {
            case 'instructions':
                instructions.push(brand);
                break;

            case 'addPart':
                const [part, serialNum] = params;
                if (!parts.hasOwnProperty(brand)) {
                    parts[brand] = {};
                }
                if (!parts[brand].hasOwnProperty(part)) {
                    parts[brand][part] = [];
                }
                parts[brand][part].push(serialNum);
                break;

            case 'repair':
                if (!instructions.includes(brand)) {
                    console.log(`${brand} is not supported`);
                } else {
                    let status = JSON.parse(params[0]);
                    let repairList = getKeyByValue(status, 'broken');

                    for (const part of repairList) {
                        if (parts.hasOwnProperty(brand) && parts[brand].hasOwnProperty(part) && parts[brand][part] !== undefined) {
                            status[part] = parts[brand][part].shift();
                        }

                    }
                    console.log(`${brand} client - ${JSON.stringify(status)}`);

                }
                break;
        }
    }

    let partsSortedArr = Object.entries(parts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([brand, parts]) => {
            console.log(`${brand} - ${JSON.stringify(parts)}`)
        })

    function getKeyByValue(object, value) {
        return Object.keys(object).filter(key => object[key] === value);
    }
}

autoService(['instructions opel', 'repair opel {"engine":"broken","transmission":"OP8766TRS"}']);

// autoService([
//     'instructions bmw',
//     'addPart opel engine GV1399SSS',
//     'addPart opel transmission SMF556SRG',
//     'addPart bmw engine GV1399SSS',
//     'addPart bmw transmission SMF444ORG',
//     'addPart opel transmission SMF444ORG',
//     'instructions opel',
//     'repair opel {"engine":"broken","transmission":"OP8766TRS"}',
//     'repair bmw {"engine":"ENG999FPH","transmission":"broken","wheels":"broken"}'
// ]);
// autoService([
//     'repair mazda {"engine":"broken"}',
//     'instructions bmw',
//     'addPart opel engine GV1399SSS'
// ])