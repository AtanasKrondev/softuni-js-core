function timeToWalk(steps, footprintInM, kmPerH) {
    let m = steps * footprintInM;
    let secsRest = parseInt(m / 500) * 60;
    let time = m / 1000 / kmPerH * 3600 + secsRest;
    let hours = parseInt(time / 3600);
    time -= hours * 3600;
    let mins = parseInt(time / 60);
    time -= mins * 60;
    let secs = Math.round(time);

    hours = leadZero(hours);
    mins = leadZero(mins);
    secs = leadZero(secs);

    console.log(`${hours}:${mins}:${secs}`);


    function leadZero(a) {
        if (a < 10) {
            a = `0${a}`;
        }
        return a;
    }
}

timeToWalk(2564, 0.70, 5.5);