function notify(message) {
    const btn = document.querySelector('button');
    const notification = document.getElementById('notification');
    notification.textContent = message;
    let t;
    btn.addEventListener('click', notifyMe);

    function notifyMe() {
        notification.style.display = 'block';

        t = setTimeout(function () { notification.style.display = 'none' }, 2000);
    }
}