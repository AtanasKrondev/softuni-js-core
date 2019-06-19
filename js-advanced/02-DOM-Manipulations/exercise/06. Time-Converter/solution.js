function attachEventsListeners() {
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    [...document.querySelectorAll('input[type="button"]')]
        .forEach(btn => btn.addEventListener('click', convert));

    function convert(event) {
        const btnId = event.target.getAttribute('id');
        switch (btnId) {
            case 'daysBtn':
                hours.value = days.value * 24;
                minutes.value = hours.value * 60;
                seconds.value = minutes.value * 60;
                break;
            case 'hoursBtn':
                days.value = hours.value / 24;
                minutes.value = hours.value * 60;
                seconds.value = minutes.value * 60;
                break;
            case 'minutesBtn':
                hours.value = minutes.value / 60;
                days.value = hours.value / 24;
                seconds.value = minutes.value * 60;
                break;
            case 'secondsBtn':
                minutes.value = seconds.value / 60;
                hours.value = minutes.value / 60;
                days.value = hours.value / 24;
        }

    }

}