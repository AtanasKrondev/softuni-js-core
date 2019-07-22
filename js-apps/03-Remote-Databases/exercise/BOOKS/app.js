(function () {
    const kinveyUserName = 'guest';
    const kinveyPassword = 'guest';
    const appKey = 'kid_ryJhfHeMB';
    const appSecret = '9653bcd3866b4c64b0fbe5659145cf7a';
    const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/books`;

    const elements = {
        btnSubmit: document.querySelector('form button'),
        btnLoadBooks: document.getElementById('loadBooks'),
        btnCancelEdit: document.getElementById('cancelBtn'),
        btnDoneEdit: document.getElementById('editBtn'),
        inputTitle: document.getElementById('title'),
        inputAuthor: document.getElementById('author'),
        inputIsbn: document.getElementById('isbn'),
        tbodyBooks: document.querySelector('tbody'),
        h3Form: document.querySelector('h3')
    }

    elements.tbodyBooks.innerHTML = '';
    elements.btnSubmit.addEventListener('click', addBook);
    elements.btnLoadBooks.addEventListener('click', loadBooks);

    function addBook(ev) {
        ev.preventDefault();

        title = elements.inputTitle.value;
        author = elements.inputAuthor.value;
        isbn = elements.inputIsbn.value;

        if (title && author && isbn) {
            const data = {
                title,
                author,
                isbn
            };

            const headers = {
                method: "POST",
                body: JSON.stringify(data),
                credentials: 'include',
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                headers: {
                    "Content-type": "application/json"
                }
            };

            fetch(baseUrl, headers)
                .then(handler)
                .then(loadBooks)
                .catch(err => console.log(err));
        };

        clearElementValue(elements.inputAuthor, elements.inputTitle, elements.inputIsbn);
    }

    function loadBooks() {
        const headers = {
            credentials: 'include',
            Authorization: 'Kinvey' + localStorage.getItem('authToken'),
        }

        fetch(baseUrl, headers)
            .then(handler)
            .then((data) => {
                elements.tbodyBooks.innerHTML = '';
                data.forEach(book => {
                    const trNextBook = document.createElement('tr');
                    trNextBook.setAttribute('id', book._id);
                    trNextBook.innerHTML = `<td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>
                    <button class="btnEdit" value="${book._id}">Edit</button>
                    <button class="btnDelete" value="${book._id}">Delete</button>
                </td>`;

                    trNextBook.querySelector('button.btnEdit')
                        .addEventListener('click', () => loadEditForm(book._id));
                    trNextBook.querySelector('button.btnDelete')
                        .addEventListener('click', () => deleteBook(book._id));

                    elements.tbodyBooks.appendChild(trNextBook);
                })
            })
            .catch(err => console.log(err));
    }

    function loadEditForm(bookId) {
        const dataToEdit = document.getElementById(bookId)
            .querySelectorAll('td');
        elements.inputTitle.value = dataToEdit[0].textContent;
        elements.inputAuthor.value = dataToEdit[1].textContent;
        elements.inputIsbn.value = dataToEdit[2].textContent;
        elements.h3Form.textContent = 'EDIT BOOK';
        elements.btnSubmit.style.display = 'none';
        elements.btnDoneEdit.style.display = 'inline-block';
        elements.btnCancelEdit.style.display = 'inline-block';

        elements.btnDoneEdit.value = bookId;
        elements.btnDoneEdit.addEventListener('click', editBook);
        elements.btnCancelEdit.addEventListener('click', cancelEdit);
    }

    function editBook(ev) {
        ev.preventDefault();

        const bookId = ev.target.value;
        ev.target.value = '';

        const bookData = {
            'title': elements.inputTitle.value,
            'author': elements.inputAuthor.value,
            'isbn': elements.inputIsbn.value,
        };

        const editUrl = `${baseUrl}/${bookId}`;

        const headers = {
            method: 'PUT',
            body: JSON.stringify(bookData),
            credentials: 'include',
            Authorization: 'Kinvey' + localStorage.getItem('authToken'),
            headers: {
                "Content-type": "application/json"
            },
        };

        fetch(editUrl, headers)
            .then(handler)
            .then(loadBooks)
            .catch(err => console.log(err));

        fromEditToSubmitForm();
    }

    function cancelEdit(ev) {
        ev.preventDefault();
        fromEditToSubmitForm();
    }

    function fromEditToSubmitForm() {
        clearElementValue(elements.inputAuthor, elements.inputTitle, elements.inputIsbn);

        elements.h3Form.textContent = 'FORM';

        elements.btnSubmit.style.display = 'block';
        elements.btnDoneEdit.style.display = 'none';
        elements.btnCancelEdit.style.display = 'none';
    }

    function clearElementValue(...arguments) {
        arguments.forEach(element => {
            element.value = '';
        })
    }

    function deleteBook(bookId) {
        const deleteUrl = `${baseUrl}/${bookId}`;

        const headers = {
            method: 'DELETE',
            credentials: 'include',
            Authorization: 'Kinvey' + localStorage.getItem('authToken'),
            headers: {
                "Content-type": "application/json"
            },
        }

        fetch(deleteUrl, headers)
            .then(handler)
            .then(loadBooks)
            .catch(err => console.log(err))
    }

    function handler(response) {
        if (response.status >= 400) {
            throw new Error(`${response.status}: ${response.statusText}`);
        };
        return response.json();
    }
})()