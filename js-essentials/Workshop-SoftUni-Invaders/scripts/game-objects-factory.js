(function (scope) {
    const { SIZES } = scope;
    class GameObjectsFactory {
        constructor(width, height) {
            this.bounds = { width, height };
        }
        createPlayer() {
            const { width, height } = this.bounds;
            const { HEIGHT, WIDTH } = SIZES.PLAYER;
            const left = (width - WIDTH) / 2;
            const top = height - HEIGHT;
            const player = { top, left };

            return player;
        }

        createBullet(top, left) {
            const bullet = { top, left };
            return bullet;
        }
    }

    scope.GameObjectsFactory = GameObjectsFactory;
}(window));