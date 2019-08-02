window.onload = () => {
    Sammy('#container', function () {

        this.use('Handlebars', 'hbs');

        //Home
        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        //User
        this.get('#/login', userController.getLogin);
        this.post('#/login', userController.postLogin);
        this.get('#/register', userController.getRegister);
        this.post('#/register', userController.postRegister);
        this.get('#/logout', userController.logout);

        //Movie
        this.get('#/movie/create', collectionController.createGet);
        this.post('#/movie/create', collectionController.createPost);
        this.get('#/cinema', collectionController.collectionGet);
        this.get('#/movie/user', collectionController.userCollectionGet);
        this.get('#/movie/edit/:id', collectionController.editGet);
        this.post('#/movie/edit/:id', collectionController.editPost);
        this.get('#/movie/delete/:id', collectionController.deleteGet);
        this.post('#/movie/delete/:id', collectionController.deletePost);
        this.get('#/movie/details/:id', collectionController.detailsGet);
        this.get('#/movie/buy/:id', collectionController.customEdit)     

    }).run('/');
}
