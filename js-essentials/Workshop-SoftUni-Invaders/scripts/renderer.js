(function (scope) {
    const { SIZES } = scope;
    class Renderer {
        constructor(canvas, bounds) {
            this.ctx = canvas.getContext('2d');
            this.bounds = bounds;
            const playerImage = new Image();
            playerImage.src = './images/batwing.png';
            playerImage.onload = () => {
                this.playerImage = playerImage;
            };

            const bulletImage = new Image();
            bulletImage.src = './images/rocket.png';
            bulletImage.onload = () => {
                this.bulletImage = bulletImage;
            };
        }
        clear() {
            const { ctx } = this;
            const { width, height } = this.bounds;
            ctx.clearRect(0, 0, width, height);
        }
        renderPlayer(left, top) {
            const { ctx } = this;
            const { WIDTH, HEIGHT } = SIZES.PLAYER;
            if (this.playerImage) {
                ctx.drawImage(this.playerImage, left, top, WIDTH, HEIGHT);
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

        renderEnemy(left, top) {
            const { ctx } = this;
            ctx.fillRect(left, top, 15, 15);
        }
    }

    scope.Renderer = Renderer;
}(window));
