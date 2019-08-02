const collectionController = function () {
    const collection = 'movies'

    const createGet = function (context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial(`./views/${collection}/create.hbs`);
            })
    }

    const createPost = function (context) {
        const payload = { ...context.params }
        // Validations from here...
        payload.tickets = +payload.tickets

        if (payload.title.length < 6) {
            return;
        }

        // ...to here
        requester.post(collection, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(data => context.redirect('/'));
    }

    const collectionGet = function (context) {
        helper.addHeaderInfo(context);
        // Sortings here
        const sortCriteria = { tickets: -1 }
        requester.get(`${collection}?query={}&sort=${JSON.stringify(sortCriteria)}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((data) => {
                context.data = data;
                helper.loadPartials(context, { entry: `./views/${collection}/singleMovie.hbs` })
                    .then(function () {
                        this.partial(`./views/${collection}/cinema.hbs`);
                    })
            })

    }

    const userCollectionGet = function (context) {
        helper.addHeaderInfo(context);
        const endpoint = `${collection}?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`
        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((data) => {
                context.data = data;
                helper.loadPartials(context, { entry: `./views/${collection}/myMoviesSingle.hbs` })
                    .then(function () {
                        this.partial(`./views/${collection}/myMovies.hbs`);
                    })
            })
    }

    const editGet = function (context) {
        const entryId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`${collection}/${entryId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(data => {
                context.data = data;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial(`./views/${collection}/edit.hbs`);
                    })
            })
    }

    const editPost = function (context) {
        const entryId = context.params.id;
        const payload = { ...context.params }
        // Additional edition from here...
        payload.tickets = +payload.tickets
        delete payload.id;
        // ...to here

        requester.put(`${collection}/${entryId}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            })
    }

    const deleteGet = function (context) {
        const entryId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`${collection}/${entryId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(data => {
                context.data = data;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial(`./views/${collection}/delete.hbs`);
                    })
            })
    }

    const deletePost = function (context) {
        const entryId = context.params.id;

        requester.del(`${collection}/${entryId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => context.redirect('/'));
    }

    const detailsGet = function (context) {
        const entryId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`${collection}/${entryId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(data => {
                context.data = data;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial(`./views/${collection}/details.hbs`);
                    })
            })
    }

    const customEdit = function (context) {
        const entryId = context.params.id;
        requester.get(`${collection}/${entryId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(data => {
                //Custom logic from here...
                if (data.tickets > 0) {
                    data.tickets--;
                }
                //...to here
                return requester.put(`${collection}/${entryId}`, 'appdata', 'Kinvey', data);
            })
            .then(helper.handler)
            .then(() => context.redirect('#/cinema'));

    }

    return {
        createGet,
        createPost,
        collectionGet,
        userCollectionGet,
        editGet,
        editPost,
        deleteGet,
        deletePost,
        detailsGet,
        customEdit
    }
}();
