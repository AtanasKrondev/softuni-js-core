function caffeineStudy(n) {
    let caffeine = 0;

    let coffeeCaf = 3 * 150 / 100 * 40;
    let colaCaf = 2 * 250 / 100 * 8;
    let teaCaf = 3 * 350 / 100 * 20;

    let dailyCaf = coffeeCaf + colaCaf + teaCaf;
    let fifthDayCaf = 3 * 500 / 100 * 30;
    let ninthDayCaf = (4 * 250 / 100 * 8) + (2 * 500 / 100 * 30);

    for (let i = 1; i <= n; i++) {
        caffeine += dailyCaf;
        if (i % 5 === 0) {
            caffeine += fifthDayCaf;
        }
        if (i % 9 === 0) {
            caffeine += ninthDayCaf;
        }
    }

    console.log(`${caffeine} milligrams of caffeine were consumed`);
}

caffeineStudy(5)
caffeineStudy(8)