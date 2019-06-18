function stopwatch() {
    let seconds = 0;
    let minutes = 0;
    let time;
    let displayTime = document.getElementById('time');
    const start = document.getElementById('startBtn');
    const stop = document.getElementById('stopBtn');

    // start.onclick = starTime;
    // stop.onclick = stopTime;
    start.addEventListener('click', starTime);
    stop.addEventListener('click', stopTime);

    function starTime() {
        start.disabled = true;
        stop.disabled = false;
        ticToc();
    }

    function stopTime() {
        stop.disabled = true;
        start.disabled = false;
        clearTimeout(time);
        seconds = 0;
        minutes = 0;
        // displayTime.textContent = displayingTime(minutes, seconds);
    }


    function ticToc() {
        displayTime.textContent = displayingTime(minutes, seconds);
        ++seconds;

        if (seconds === 60) {
            ++minutes;
            seconds = 0;
        }
        timer();
    }

    function timer() {
        time = setTimeout(ticToc, 1000)
    }

    function displayingTime(minutes, seconds) {
        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    }
}