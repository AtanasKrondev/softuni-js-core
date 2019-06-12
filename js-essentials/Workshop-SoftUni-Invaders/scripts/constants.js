(function (scope) {
    const SIZES = {
        PLAYER: {
            HEIGHT: 100,
            WIDTH: 160,
            SPEED: 50,
            LEFT_ROTATION: 13,
            DOWN_PADDING: 17,
            ROTATION_DEGREE: 5,
            SCALE: 0.95,
        },
        BULLET: {
            HEIGHT: 50,
            WIDTH: 30,
            SPEED: -20,
        },
        ENEMY: {
            SPEED: 2,
            HEIGHT: 70,
            WIDTH: 70,
        }
    };

    const KEY_CODES = {
        LEFT: 37,
        RIGHT: 39,
        FIRE: 32,
    }
    scope.SIZES = SIZES;
    scope.KEY_CODES = KEY_CODES;
}(window));
