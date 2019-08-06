const collectionController = function () {
    const collection = 'offers'

    const createGet = function (context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial(`./views/${collection}/create.hbs`);
            })
    }

    const createPost = function (context) {
        const payload = { ...context.params }
        const imgUrlRegex = /^(http(s?):\/\/)(.)*\.(?:jpg|gif|png)$/;

        if (payload.product &&
            payload.description &&
            payload.price &&
            payload.pictureUrl &&
            imgUrlRegex.test(payload.pictureUrl)) {
            requester.post(collection, 'appdata', 'Kinvey', payload)
                .then(helper.handler)
                .then(data => context.redirect('#/dashboard'));
        } else {
            console.log('Invalid product')
        }
    }

    const collectionGet = function (context) {
        helper.addHeaderInfo(context);
        const userId = sessionStorage.getItem('userId');
        requester.get(`${collection}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((data) => {
                context.data = data;
                data.forEach(e => e.isAuthor = userId === e._acl.creator)
                helper.loadPartials(context, { entry: `./views/${collection}/dashboardRow.hbs` })
                    .then(function () {
                        this.partial(`./views/${collection}/dashboard.hbs`);
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

        delete payload.id;
        const imgUrlRegex = /^(http(s?):\/\/)(.)*\.(?:jpg|gif|png)$/;

        if (payload.product &&
            payload.description &&
            payload.price &&
            payload.pictureUrl &&
            imgUrlRegex.test(payload.pictureUrl)) {
            requester.put(`${collection}/${entryId}`, 'appdata', 'Kinvey', payload)
                .then(helper.handler)
                .then(() => {
                    context.redirect('#/dashboard');
                })
        } else console.log('Invalid edit parameteres')
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
            .then(() => context.redirect('#/dashboard'));
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


    return {
        createGet,
        createPost,
        collectionGet,
        editGet,
        editPost,
        deleteGet,
        deletePost,
        detailsGet,
    }
}();
