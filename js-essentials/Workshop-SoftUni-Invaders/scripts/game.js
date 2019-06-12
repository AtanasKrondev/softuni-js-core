(function (scope) {
    const {
        Renderer,
        GameObjectsFactory,
        SIZES,
        KEY_CODES,
    } = scope;

    const setupCanvas = function (gameContainer, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        gameContainer.appendChild(canvas);
        return canvas;
    };

    class EventChecker {
        isGoLeftEvent(ev) {
            const { LEFT } = KEY_CODES;
            return ev.keyCode === LEFT;
        }
        isGoRightEvent(ev) {
            const { RIGHT } = KEY_CODES;
            return ev.keyCode === RIGHT;
        }
        isFireEvent(ev) {
            const { FIRE } = KEY_CODES;            
            return ev.keyCode === FIRE;
        }
    }

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
            this.eventChecker = new EventChecker();
            this.player = this.gameObjectsFactory.createPlayer();
            this._attachGameEvents();
        }
        start() {
            this._gameLoop();
        }
        _attachGameEvents() {
            window.addEventListener('keydown', (ev) => {
                this._handleMovement(ev);
                this._handleFireEvent(ev);
            });
        }
        _handleFireEvent(ev) {
            if (!this.eventChecker.isFireEvent(ev)) {
                return;
            }
        }
        _handleMovement(ev) {
            const { SPEED } = SIZES.PLAYER;
            let alpha = 0;
            if (this.eventChecker.isGoLeftEvent(ev)) {
                alpha = -1;
            } else if (this.eventChecker.isGoRightEvent(ev)) {
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
