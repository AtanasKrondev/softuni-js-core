function solve() {
    let toOptions = document.getElementById('selectMenuTo');
    let convertBtn = document.getElementsByTagName('button')[0];

    let option1 = document.createElement('option');
    option1.value = 'binary';
    option1.text = 'Binary';
    toOptions.appendChild(option1);
    let option2 = document.createElement('option');
    option2.value = 'hexadecimal';
    option2.text = 'Hexadecimal';
    toOptions.appendChild(option2);

    convertBtn.addEventListener('click', () => {
        let inputNumber = Number(document.getElementsByTagName('input')[0].value);
        let convertingTo = toOptions.options[toOptions.selectedIndex].value;

        if (convertingTo === 'binary') {
            let result = document.getElementsByTagName('input')[1].value = inputNumber.toString(2);
        } else if (convertingTo === 'hexadecimal') {
            let result = document.getElementsByTagName('input')[1].value = inputNumber.toString(16).toUpperCase();
        }
    })

}