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
            this.bullets = [];
            this._attachGameEvents();
        };
        start() {
            this._gameLoop();
        };
        _attachGameEvents() {
            window.addEventListener('keydown', (ev) => {
                this._handleMovement(ev);
                this._handleFireEvent(ev);
            });
        };
        _handleFireEvent(ev) {
            if (!this.eventChecker.isFireEvent(ev)) {
                return;
            }
            const { top, left } = this.player;
            const leftBullet = this.gameObjectsFactory.createBullet(top, left);
            const leftOfRightBullet = left + SIZES.PLAYER.WIDTH - SIZES.BULLET.WIDTH;
            const rightBullet = this.gameObjectsFactory.createBullet(top, leftOfRightBullet);
            this.bullets.push(leftBullet, rightBullet);
        };
        _handleMovement(ev) {
            const { SPEED, WIDTH } = SIZES.PLAYER;
            let alpha = 0;
            if (this.eventChecker.isGoLeftEvent(ev)) {
                alpha = -1;
            } else if (this.eventChecker.isGoRightEvent(ev)) {
                alpha = +1;
            }
            this.player.left += alpha * SPEED;
            this.player.left = Math.max(this.player.left, 0);
            this.player.left = Math.min(this.player.left, this.bounds.width - WIDTH);
        };
        _render() {
            const { top, left } = this.player;
            this.renderer.renderPlayer(left, top);
            this.renderer.renderBullets(this.bullets);
        };
        _updatePositions() {
            const { SPEED } = SIZES.BULLET;
            this.bullets.forEach(bullet => {
                bullet.top += SPEED;
                bullet.isDead = bullet.top <= 0;
            });
        };
        _removeDeadGameObjects() {
            this.bullets = this.bullets.filter(bullet => !bullet.isDead);
        }
        _gameLoop() {
            this.renderer.clear();
            this._render();
            this._updatePositions();
            this._removeDeadGameObjects();
            window.requestAnimationFrame(() => {
                this._gameLoop()
            });
        }
    }
    scope.Game = Game;
}(window));
