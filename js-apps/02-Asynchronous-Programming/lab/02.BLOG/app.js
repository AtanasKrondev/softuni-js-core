function attachEvents() {
    const url = {
        posts: 'https://blog-apps-c12bf.firebaseio.com/posts.json',
        comments: 'https://blog-apps-c12bf.firebaseio.com/comments.json'
    }
    const dropDown = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments')

    const btnLoadPosts = document.getElementById('btnLoadPosts');
    btnLoadPosts.addEventListener('click', loadPosts);

    const btnViewPost = document.getElementById('btnViewPost');
    btnViewPost.addEventListener('click', viewPosts);

    function loadPosts() {
        fetch(url.posts)
            .then(handler)
            .then(showPosts)

        function showPosts(data) {
            const postsList = Object.entries(data);

            for (const [id, post] of postsList) {
                dropDown.appendChild(createHTMLElement('option', id, post.title))
            }
        }
    }

    function viewPosts() {
        const postId = dropDown.selectedOptions[0].value;
        fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${postId}.json`)
            .then(handler)
            .then(showPostAndComments)

        function showPostAndComments(data) {
            postTitle.textContent = data.title;
            postBody.textContent = data.body;
            const id = data.id;

            fetch(url.comments)
                .then(handler)
                .then(showComments)

            function showComments(data) {
                postComments.innerHTML = '';
                for (const key in data) {
                    if (data[key].postId === id) {
                        postComments.appendChild(createHTMLElement('li', null, data[key].text))
                    }
                }
            }
        }
    }

    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        return response.json();
    }

    function createHTMLElement(tagName, value, textContent) {
        const currentElement = document.createElement(tagName);

        if (value) {
            currentElement.value = value;
        }

        if (textContent) {
            currentElement.textContent = textContent;
        }

        return currentElement;
    }

}

attachEvents();
