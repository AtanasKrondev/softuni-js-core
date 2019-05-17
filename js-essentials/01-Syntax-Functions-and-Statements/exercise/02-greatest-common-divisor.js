function gcd(a, b) {
    let gcd = 1;
    for (let i = 1; i <= Math.min(a, b); i++) {
        if (a % i === 0 && b % i === 0) {
            gcd = i;
        }
    }
    console.log(gcd);
}

gcd(2154, 458);