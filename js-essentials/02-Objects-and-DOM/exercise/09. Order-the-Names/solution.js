function solve() {

    let button = document.getElementsByTagName('button')[0];
    let input = document.getElementsByTagName('input')[0];
    let li = Array.from(document.getElementsByTagName('li'));

    button.addEventListener('click', function () {
        let name = input.value;
        pushToDatabase(name);
    })

    function pushToDatabase(str) {
        str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

        let i = str.charCodeAt(0) - 65;
        let arr = li[i].textContent.split(', ').filter(n => n);

        arr.push(str);
        li[i].textContent = arr.join(', ');
    }
}