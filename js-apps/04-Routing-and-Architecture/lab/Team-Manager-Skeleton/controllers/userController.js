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
        userModel.register(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                context.redirect('#/home');
            })
    };
    const postLogin = function (context) {
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                homeController.getHome(context);
            })
    };

    const logout = function (context) {
        userModel.logout()
            .then(data => {
                storage.deleteUser();
                homeController.getHome(context);
                console.log(data);
            })
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout,
    }
}();