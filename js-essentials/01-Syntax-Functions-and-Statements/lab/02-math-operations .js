function mathOperations(a, b, op) {
    let result;
    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '/': result = a / b; break;
        case '*': result = a * b; break;
        case '%': result = a % b; break;
        case '**': result = a ** b; break;
    }
    console.log(result);
}

mathOperations(3, 3, '**');