window.onload = () => {
    Sammy('#root', function () {

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
        this.get('#/user', userController.userProfile)

        //Offers
        this.get('#/offers/create', collectionController.createGet);
        this.post('#/offers/create', collectionController.createPost);
        this.get('#/dashboard', collectionController.collectionGet);
        this.get('#/offers/details/:id', collectionController.detailsGet);
        this.get('#/offers/edit/:id', collectionController.editGet);
        this.post('#/offers/edit/:id', collectionController.editPost);
        this.get('#/offers/delete/:id', collectionController.deleteGet);
        this.post('#/offers/delete/:id', collectionController.deletePost);
        // this.get('#/movie/user', collectionController.userCollectionGet);
        // this.get('#/movie/buy/:id', collectionController.customEdit)     

    }).run('/');
}
