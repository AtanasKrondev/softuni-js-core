function solve(input) {
    let command = (function listProcessor() {
        let list = []
        return {
            add: (str) => list.push(str),
            remove: (str) => list = list.filter(e => e !== str),
            print: (str) => console.log(list.join(',')),
        }
    })();

    for (const line of input) {
        let [action, string] = line.split(' ');
        command[action](string);
    }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
solve(['add pesho', 'add george', 'add peter', 'remove peter', 'print']);