function solve() {
    let allButtons = Array.from(document.getElementsByTagName('button'));

    let leftOperand = '';
    let operator = '';
    let rightOperand = '';

    allButtons.forEach(b => b.addEventListener('click', pressButton));

    function pressButton(btn) {
        let btnValue = btn.target.value;

        if (/[\+\-\*\/]/.test(btnValue)) {
            operator = btnValue;
        }

        if (operator === '') {
            if (/[0-9\.]/.test(btnValue)) {
                leftOperand += btnValue;
            }
        } else {
            if (/[0-9\.]/.test(btnValue)) {
                rightOperand += btnValue;
            }
        }

        if (btnValue === '=') {
            let result = 0;

            if (leftOperand === '' || operator === '' || rightOperand === '') {
                result = NaN;
            } else {
                let lOp = +leftOperand;
                let rOp = +rightOperand;

                switch (operator) {
                    case '+': result = lOp + rOp; break;
                    case '-': result = lOp - rOp; break;
                    case '/': result = lOp / rOp; break;
                    case '*': result = lOp * rOp; break;
                }
            }
            document.getElementById('resultOutput').textContent = result;
        }
        document.getElementById('expressionOutput').textContent = `${leftOperand} ${operator} ${rightOperand}`;

        if (btnValue === 'Clear') {
            leftOperand = '';
            operator = '';
            rightOperand = '';
            document.getElementById('resultOutput').textContent = '';
            document.getElementById('expressionOutput').textContent = '';
        }

    }
}