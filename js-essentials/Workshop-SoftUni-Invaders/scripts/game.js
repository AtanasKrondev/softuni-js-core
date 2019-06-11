(function (scope) {
    const { Renderer, SIZES } = scope;

    const setupCanvas = function (gameContainer, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        gameContainer.appendChild(canvas);
        return canvas;
    };

    class Game {
        constructor(selector, width, height) {
            this.gameContainer = document.querySelector(selector);
            this.canvas = setupCanvas(this.gameContainer, width, height);
            this.bounds = {
                width,
                height,
            };

            this.renderer = new Renderer(this.canvas, this.bounds);
            const left = (width - SIZES.PLAYER.WIDTH) / 2;
            const top = height - SIZES.PLAYER.HEIGHT;
            this.player = { left, top };

        }
        start() {
            this._gameLoop();
        }
        _gameLoop() {
            this.renderer.clear();
            const { top, left } = this.player;
            this.renderer.renderPlayer(left, top);
            window.requestAnimationFrame(() => {
                this._gameLoop()
            });
        }
    }
    scope.Game = Game;
}(window));
