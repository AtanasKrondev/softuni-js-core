const userController = function () {
    const getRegister = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            registerForm: './views/register/registerForm.hbs'
        }).then(function () {
            this.partial('../views/register/registerPage.hbs')
        })
    };

    const getLogin = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            loginForm: './views/login/loginForm.hbs'
        }).then(function () {
            this.partial('../views/login/loginPage.hbs')
        })
    };

    const postRegister = function (context) {
        userModel.register(context.params);
    };
    const postLogin = function () {
        console.log('login')
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin
    }
}();