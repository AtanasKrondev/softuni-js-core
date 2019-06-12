(function (scope) {
    const { SIZES } = scope;
    class Renderer {
        constructor(canvas, bounds) {
            this.ctx = canvas.getContext('2d');
            this.bounds = bounds;
            const image = new Image();
            image.src = './images/batwing.png';
            image.onload = () => {
                this.playerImage = image;
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
            ctx.fillStyle = 'red';
            ctx.fillRect(left, top, WIDTH, HEIGHT);
        }

        renderEnemy(left, top) {
            const { ctx } = this;
            ctx.fillRect(left, top, 15, 15);
        }
    }

    scope.Renderer = Renderer;
}(window));
