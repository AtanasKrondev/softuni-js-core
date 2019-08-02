const homeController = function () {
    const getHome = function (context) {
        helper.addHeaderInfo(context);

        const loggedIn = sessionStorage.getItem('authtoken') !== null;
        if (loggedIn) {
            collectionController.collectionGet(context);
        } else {
            helper.loadPartials(context)
                .then(function () {
                    this.partial('./views/home.hbs');
                })
        }
    }

    return {
        getHome
    }
}();