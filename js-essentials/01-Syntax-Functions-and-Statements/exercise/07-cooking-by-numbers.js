function cooking(input) {
    let num = +input.shift();

    for (let el of input) {
        switch (el) {
            case 'chop':
                num /= 2;
                console.log(num);
                break;
            case 'dice':
                num = Math.sqrt(num);
                console.log(num);
                break;
            case 'spice':
                num++;
                console.log(num);
                break;
            case 'bake':
                num *= 3;
                console.log(num);
                break;
            case 'fillet':
                num -= num * 0.2;
                console.log(num);
                break;
        }
    }
}

cooking(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);