window.onload = () => {
    Sammy('#rooter', function () {

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
        this.get('#/recipes/share', collectionController.createGet);
        this.post('#/recipes/share', collectionController.createPost);
        this.get('#/cinema', collectionController.collectionGet);
        this.get('#/movie/user', collectionController.userCollectionGet);
        this.get('#/recipes/edit/:id', collectionController.editGet);
        this.post('#/recipes/edit/:id', collectionController.editPost);
        this.get('#/recipes/delete/:id', collectionController.deleteGet);
        this.post('#/recipes/delete/:id', collectionController.deletePost);
        this.get('#/recipes/details/:id', collectionController.detailsGet);
        this.get('#/recipes/like/:id', collectionController.customEdit)     

    }).run('/');
}
