let secondZeroTest = solution();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();

function solution() {
    let str = '';
    function append(string) {
        str += string;
    }
    function removeStart(n) {
        str = str.substr(n)
    }
    function removeEnd(n) {
        str = str.substr(0, str.length - n);
    }

    function print() {
        console.log(str);
    }

    return {
        append,
        removeStart,
        removeEnd,
        print
    }
}