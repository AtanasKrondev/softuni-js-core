const collectionController = function () {
    const collection = 'recipes'

    const createGet = function (context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial(`./views/${collection}/create.hbs`);
            })
    }

    const createPost = function (context) {
        const payload = { ...context.params };
        payload.ingredients = payload.ingredients.split(', ');

        if (payload.meal.length < 4 ||
            payload.ingredients.length < 2 ||
            payload.prepMethod.length < 10 ||
            payload.description.length < 10) {
            return;
        }

        payload.likesCounter = 0;

        // ...to here
        requester.post(collection, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(data => context.redirect('/'));
    }

    const collectionGet = function (context) {
        helper.addHeaderInfo(context);
        requester.get(`${collection}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((data) => {
                context.data = data;
                console.log(data)
                helper.loadPartials(context, { entry: `./views/${collection}/collectionEntry.hbs` })
                    .then(function () {
                        this.partial(`./views/${collection}/collection.hbs`);
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
                data.ingredients = data.ingredients.join(', ')
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
        payload.ingredients = payload.ingredients.split(', ');
        // ...to here
        delete payload.id;

        requester.put(`${collection}/${entryId}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            })
    }

    const deleteGet = function (context) {
        const entryId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`${collection}/${entryId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(data => {
                deletePost(context)
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
                data.likesCounter++;
                //...to here
                return requester.put(`${collection}/${entryId}`, 'appdata', 'Kinvey', data);
            })
            .then(helper.handler)
            .then(() => context.redirect('#/home'));

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
