function atm(input) {
    let cash = [];

    input.forEach(command => {
        if (command.length > 2) {
            insertBanknotes(command);
        } else if (command.length === 2) {
            let [balance, toWithdraw] = command;

            if (balance < toWithdraw) {
                console.log(`Not enough money in your account. Account balance: ${balance}$.`);
            } else {
                withdraw(balance, toWithdraw);
            }
        } else if (command.length === 1) {
            report(command[0]);
        }
    });

    function getSum(banknotes) {
        return banknotes.reduce((a, b) => a + b, 0);
    }

    function insertBanknotes(banknotes) {
        cash.push(...banknotes);
        console.log(`Service Report: ${getSum(banknotes)}$ inserted. Current balance: ${getSum(cash)}$.`);
    }

    function withdraw(balance, toWithdraw) {
        if (getSum(cash) < toWithdraw) {
            console.log('ATM machine is out of order!');
        } else {
            cash = cash.sort((a, b) => b - a);
            let sum = 0;

            for (let i = 0; i < cash.length; i++) {
                if (sum === toWithdraw) {
                    break;
                }

                if (sum + cash[i] <= toWithdraw) {
                    sum += +cash.splice(i, 1);
                    i--;
                }
            }

            console.log(`You get ${sum}$. Account balance: ${balance - sum}$. Thank you!`);
        }
    }

    function report(banknote) {
        let count = cash.filter(e => e === banknote).length;
        console.log(`Service Report: Banknotes from ${banknote}$: ${count}.`);
    }
}

atm([[20, 5, 100, 20, 1],
[457, 25],
[1],
[10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
[20, 85],
[5000, 4500]
]);