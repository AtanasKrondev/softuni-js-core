(function vectorMath() {
    const add = ([xA, yA], [xB, yB]) => {
        return [xA + xB, yA + yB];
    }
    const multiply = ([xA, xB], scalar) => {
        return [xA * scalar, xB * scalar];
    }
    const length = ([xA, yA]) => {
        return Math.sqrt(xA ** 2 + yA ** 2);
    }
    const dot = ([xA, yA], [xB, yB]) => {
        return xA * xB + yA * yB;
    }
    const cross = ([xA, yA], [xB, yB]) => {
        return xA * yB - xB * yA;
    }

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }

})()