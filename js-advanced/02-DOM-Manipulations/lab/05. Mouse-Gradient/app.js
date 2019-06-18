function attachGradientEvents() {
    const gradient = document.getElementById('gradient');
    const result = document.getElementById('result');
    gradient.addEventListener('mousemove', trackMouse);

    function trackMouse(event) {
        console.log(typeof event.target.clientWidth);

        const targetWidth = +event.target.clientWidth;
        const positionX = +event.offsetX;
        const asPercent = Math.floor((positionX / targetWidth) * 100);
        result.textContent = `${asPercent}%`;
    }
}