const movieController = function () {
    const createGet = function (context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial('./views/movies/create.hbs');
            })
    }

    const createPost = function (context) {
        const payload = { ...context.params }
        payload.tickets = +payload.tickets

        if (payload.title.length < 6) {
            return;
        }

        requester.post('movies', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(data => context.redirect('/'));
    }

    const cinemaGet = function (context) {
        helper.addHeaderInfo(context);
        const sortCriteria = { tickets: -1 }
        requester.get(`movies?query={}&sort=${JSON.stringify(sortCriteria)}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movies) => {
                context.movies = movies;
                helper.loadPartials(context, { singleMovie: './views/movies/singleMovie.hbs' })
                    .then(function () {
                        this.partial('./views/movies/cinema.hbs');
                    })
            })

    }

    const myMoviesGet = function (context) {
        helper.addHeaderInfo(context);
        const endpoint = `movies?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`
        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movies) => {
                context.movies = movies;
                helper.loadPartials(context, { myMoviesSingle: './views/movies/myMoviesSingle.hbs' })
                    .then(function () {
                        this.partial('./views/movies/myMovies.hbs');
                    })
            })
    }

    const editGet = function (context) {
        const movieId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(movie => {
                context.movie = movie;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('./views/movies/edit.hbs');
                    })
            })
    }

    const editPost = function (context) {
        const movieId = context.params.id;
        const payload = { ...context.params }
        payload.tickets = +payload.tickets
        delete payload.id;

        requester.put(`movies/${movieId}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            })
    }

    const deleteGet = function (context) {
        const movieId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(movie => {
                context.movie = movie;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('./views/movies/delete.hbs');
                    })
            })
    }

    const deletePost = function (context) {
        const movieId = context.params.id;

        requester.del(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => context.redirect('/'));
    }

    const detailsGet = function (context) {
        const movieId = context.params.id;
        helper.addHeaderInfo(context);

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(movie => {
                context.movie = movie;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('./views/movies/details.hbs');
                    })
            })
    }

    const buyTicket = function (context) {
        const movieId = context.params.id;
        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(movie => {
                if (movie.tickets > 0) {
                    movie.tickets--;
                }
                return requester.put(`movies/${movieId}`, 'appdata', 'Kinvey', movie);
            })
            .then(helper.handler)
            .then(() => context.redirect('#/cinema'));

    }

    return {
        createGet,
        createPost,
        cinemaGet,
        myMoviesGet,
        editGet,
        editPost,
        deleteGet,
        deletePost,
        detailsGet,
        buyTicket
    }
}();
