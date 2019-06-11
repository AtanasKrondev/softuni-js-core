(function (scope) {
    const { Renderer } = scope;

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

        }
        start() {
            this._gameLoop();
        }
        _gameLoop() {
            this.renderer.clear();
            this.renderer.renderPlayer(100, 150);
            window.requestAnimationFrame(() => {
                this._gameLoop()
            });
        }
    }
    scope.Game = Game;
}(window));
