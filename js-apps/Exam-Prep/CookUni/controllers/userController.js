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
        if (context.params.username.length >= 3 &&
            context.params.firstName.length >= 2 &&
            context.params.lastName.length >= 2 &&
            context.params.password.length >= 6 &&
            helper.passwordCheck(context.params)) {
            const payload = {
                username: context.params.username,
                password: context.params.password,
                firstName: context.params.firstName,
                lastName: context.params.lastName,
            }

            requester.post('', 'user', 'Basic', payload)
                .then(helper.handler)
                .then((data) => {
                    sessionStorage.setItem('username', data.username);
                    sessionStorage.setItem('firstName', data.firstName);
                    sessionStorage.setItem('lastName', data.lastName);
                    sessionStorage.setItem('authtoken', data._kmd.authtoken);
                    sessionStorage.setItem('userId', data._id);

                    context.redirect('#/home');
                })
        } else console.log('makari')
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
                sessionStorage.setItem('firstName', data.firstName);
                sessionStorage.setItem('lastName', data.lastName);
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

    return {
        getRegister,
        getLogin,
        postRegister,
        postLogin,
        logout
    }
}();