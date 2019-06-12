(function (scope) {
    const { SIZES } = scope;
    class Renderer {
        constructor(canvas, bounds) {
            this.ctx = canvas.getContext('2d');
            this.bounds = bounds;

            this._preloadImage('bulletImage', './images/rocket.png');
            this._preloadImage('playerImage', './images/batwing.png');
            this._preloadImage('enemyImage', './images/monster.png');

        }
        _preloadImage(propName, src) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                this[propName] = image;
            };
        }
        clear() {
            const { ctx } = this;
            const { width, height } = this.bounds;
            ctx.clearRect(0, 0, width, height);
        }

        renderPlayer(player) {
            const { left, top, direction } = player;
            const { ctx } = this;
            const { WIDTH, HEIGHT, LEFT_ROTATION, ROTATION_DEGREE, SCALE } = SIZES.PLAYER;
            if (this.playerImage) {
                if (direction === 'right') {
                    ctx.save();
                    ctx.translate(left, top);
                    ctx.rotate(ROTATION_DEGREE * Math.PI / 180);
                    ctx.scale(SCALE, 1);
                    ctx.translate(-left, -top);
                } else if (direction === 'left') {
                    ctx.save();
                    ctx.translate(left, (top + LEFT_ROTATION));
                    ctx.rotate(-ROTATION_DEGREE * Math.PI / 180);
                    ctx.scale(SCALE, 1);
                    ctx.translate(-left, -top);
                }
                ctx.drawImage(this.playerImage, left, top, WIDTH, HEIGHT);
                if (direction) {
                    ctx.restore();
                }
            }
        }

        renderBullets(bullets) {
            bullets.forEach(bullet => this.renderBullet(bullet));
        }

        renderBullet(bullet) {
            const { left, top } = bullet;
            const { ctx } = this;
            const { WIDTH, HEIGHT } = SIZES.BULLET;
            if (this.bulletImage) {
                ctx.drawImage(this.bulletImage, left, top, WIDTH, HEIGHT);
            }
        }

        renderEnemies(enemies) {
            enemies.forEach(enemy => this.renderEnemy(enemy));
        }

        renderEnemy(enemy) {
            const { left, top } = enemy;
            const { ctx } = this;
            const { WIDTH, HEIGHT } = SIZES.ENEMY;
            if (this.enemyImage) {
                ctx.drawImage(this.enemyImage, left, top, WIDTH, HEIGHT);
            }
        }
    }

    scope.Renderer = Renderer;
}(window));
