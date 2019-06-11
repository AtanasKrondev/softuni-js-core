(function () {
    const initRenderer = function (ctx) {
        this.ctx = ctx;
        return this;
    };

    const rendererDot = function (ctx, left, top) {
        ctx.fillRect(left, top, 15, 15);
    };

    const renderer = {
        rendererDot,
    };


    const init = (selector, width, height) => {
        const gameContainer = document.querySelector(selector);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        gameContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        renderer.rendererDot(ctx, 0, 100);
        return this;
    };

    const dot = {
        left: 0,
        top: 100
    }

    const gameLoop = function () {
        const { left, top } = dot;
        this.renderer.rendererDot(left, top);
    }

    const start = function () {
        this.gameLoop();
    };

    const game = {
        init,
        start,
        gameLoop,
    };

    window.game = game;
}());