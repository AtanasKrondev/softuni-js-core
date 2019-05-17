function roadRadar(input) {
    let [speed, area] = input;

    switch (area) {
        case 'motorway':
            warning(speed, 130);
            break;
        case 'interstate':
            warning(speed, 90);
            break;
        case 'city':
            warning(speed, 50);
            break;
        case 'residential':
            warning(speed, 20);
            break;
    }

    function warning(speed, limit) {
        if (speed > limit + 40) {
            console.log('reckless driving');
        } else if (speed > limit + 20) {
            console.log('excessive speeding');
        } else if (speed > limit) {
            console.log('speeding');
        }
    }
}

roadRadar([40, 'city']);