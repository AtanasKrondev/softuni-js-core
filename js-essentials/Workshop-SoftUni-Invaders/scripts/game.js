(function (scope) {
    const { Renderer, GameObjectsFactory } = scope;

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
            this.gameObjectsFactory = new GameObjectsFactory(width, height);
            this.player = this.gameObjectsFactory.createPlayer();
            this._attachGameEvents();
        }
        start() {
            this._gameLoop();
        }
        _attachGameEvents() {
            window.addEventListener('keydown', (ev) => {
                this._handleMovement(ev);
                // this._handleFireEvent(ev);
            });
        }
        _handleMovement(ev) {
            let alpha = 0;
            if (ev.keyCode === 37) {
                alpha = -1;
            } else if (ev.keyCode === 39) {
                alpha = +1;
            }
            this.player.left += alpha * 15;
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
