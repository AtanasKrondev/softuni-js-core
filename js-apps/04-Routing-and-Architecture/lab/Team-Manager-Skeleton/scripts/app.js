const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');
    // Home
    this.get('#/home', homeController.getHome);
    // User
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);
});

(() => {
    app.run('#/home');
})();