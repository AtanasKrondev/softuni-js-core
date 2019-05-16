function calculator(a, b, op) {
    let sum = (a, b) => a + b;
    let substract = (a, b) => a - b;
    let multiply = (a, b) => a * b;
    let divide = (a, b) => a / b;

    let result;

    switch (op) {
        case '+': result = sum(a, b); break;
        case '-': result = substract(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
    }
    
    console.log(result);
}

calculator(2, 4, '+');