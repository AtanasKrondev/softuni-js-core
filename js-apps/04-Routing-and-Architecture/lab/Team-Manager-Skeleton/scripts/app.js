const app = Sammy('#main', function () {
    this.get('#/home', homeController.getHome);
    this.use('Handlebars', 'hbs');

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);
    this.get('#/login', userController.getLogin);
});

(() => {
    app.run('#/home');
})();