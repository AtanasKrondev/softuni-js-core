const userController = function () {
    const getRegister = function (context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial('./views/auth/register.hbs');
            })
    };

    const getLogin = function (context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial('./views/auth/login.hbs');
            })
    };

    const postRegister = function (context) {
        if (context.params.username &&
            context.params.password &&
            context.params.rePassword &&
            context.params.password === context.params.rePassword) {
            const payload = {
                username: context.params.username,
                password: context.params.password,
            }

            requester.post('', 'user', 'Basic', payload)
                .then(helper.handler)
                .then((data) => {
                    sessionStorage.setItem('username', data.username);
                    sessionStorage.setItem('authtoken', data._kmd.authtoken);
                    sessionStorage.setItem('purchases', data.purchases);
                    sessionStorage.setItem('userId', data._id);

                    context.redirect('#/home');
                })
        } else {
            console.log('Failed to register');
        }
    };

    const postLogin = function (context) {
        const payload = {
            username: context.params.username,
            password: context.params.password
        }

        requester.post('login', 'user', 'Basic', payload)
            .then(helper.handler)
            .then((data) => {
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('authtoken', data._kmd.authtoken);
                sessionStorage.setItem('userId', data._id);

                context.redirect('#/home');
            })
    };

    const logout = function (context) {
        requester.post('_logout', 'user', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                sessionStorage.clear();

                context.redirect('#/home');
            })
    }

    const userProfile = function (context) {
        const username = sessionStorage.getItem('username');
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial('./views/userProfile.hbs');
            })
    }

    return {
        getRegister,
        getLogin,
        postRegister,
        postLogin,
        logout,
        userProfile
    }
}();