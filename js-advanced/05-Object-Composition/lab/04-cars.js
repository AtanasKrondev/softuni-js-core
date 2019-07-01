function solve(input) {
    let cars = {};

    for (const line of input) {
        const [command, ...params] = line.split(' ');
        switch (command) {
            case 'create': create(...params); break;
            case 'set': set(...params); break;
            case 'print': print(...params); break;
        }
    }

    function create(name, inherit, parentName) {
        if (inherit === 'inherit') {
            cars[name] = Object.create(cars[parentName]);
        } else {
            cars[name] = {};
        }
    }

    function set(name, key, value) {
        cars[name][key] = value;
    }

    function print(name) {
        let printArr = []
        for (const key in cars[name]) {
            printArr.push(`${key}:${cars[name][key]}`);
        }
        console.log(printArr.join(', '));
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
)