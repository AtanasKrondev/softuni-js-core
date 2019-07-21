const kinveyUserName = 'guest';
const kinveyPassword = 'guest';
const appKey = 'kid_ryJhfHeMB';
const appSecret = '9653bcd3866b4c64b0fbe5659145cf7a';
const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/books`;

const elements = {
    btnSubmit: document.querySelector('form button'),
    btnLoadBooks: document.getElementById('loadBooks'),
    inputTitle: document.getElementById('title'),
    inputAuthor: document.getElementById('author'),
    inputIsbn: document.getElementById('isbn'),
    tbodyBooks: document.querySelector('tbody'),
    h3Form: document.querySelector('h3')
}

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
    //-23:52
}

function handler(response) {
    if (response.status >= 400) {
        throw new Error(`${response.status}: ${response.statusText}`);
    };
    return response.json();
}