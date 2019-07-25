const userModel = function () {
    const register = function (params) {
        const data = {...params};
        console.log(data)
    };

    return {
        register
    }
}();