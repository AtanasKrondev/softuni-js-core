(function () {
    const kinveyUserName = 'guest';
    const kinveyPassword = 'guest';
    const appKey = 'kid_ryJhfHeMB';
    const appSecret = '9653bcd3866b4c64b0fbe5659145cf7a';
    const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/students`;

    const elements = {
        tbody: document.querySelector('tbody'),
        table: document.getElementById('results'),
        theader: document.querySelector('thead tr'),
    };

    elements.theader.appendChild(createHTMLElement('th', 'Action'));

    const studentProperties = ['ID', 'First Name', 'Last Name', 'Faculty Number', 'Grade'];

    createFooter();
    const [id, firstName, lastName, facultyNumber, grade] = [...document.getElementsByTagName('input')];
    id.setAttribute('type', 'number');
    facultyNumber.setAttribute('type', 'number');
    grade.setAttribute('type', 'number');

    loadStudents();

    function createFooter() {
        const tfoot = document.createElement('tfoot');
        elements.table.appendChild(tfoot)
        const footRow = document.createElement('tr')
        tfoot.appendChild(footRow);
        for (const property of studentProperties) {
            const footCell = createHTMLElement('td');
            const inputCell = createHTMLElement('input', null, property);
            footCell.appendChild(inputCell)
            footRow.appendChild(footCell)
        }
        const btnCell = createHTMLElement('td');
        const createBtn = createHTMLElement('button', 'CREATE');
        btnCell.appendChild(createBtn);
        footRow.appendChild(btnCell);
        createBtn.addEventListener('click', createStudent);
    }

    function loadStudents() {
        elements.tbody.innerHTML = '<p>LOADING DATA...</p>';

        const headers = {
            credentials: 'include',
            Authorization: 'Kinvey' + localStorage.getItem('authToken'),
        }

        fetch(baseUrl, headers)
            .then(handler)
            .then(showStudents)
    }

    function showStudents(data) {
        elements.tbody.innerHTML = '';
        const students = data.sort((a, b) => +a['ID'] - +b['ID']);
        students.forEach(student => {
            const row = document.createElement('tr');
            for (const property of studentProperties) {
                row.appendChild(createHTMLElement('td', student[property]))
            }
            const delCell = createHTMLElement('td');
            const delBtn = createHTMLElement('button', 'DELETE')
            row.appendChild(delCell);
            delCell.appendChild(delBtn)
            delBtn.setAttribute('id', student._id)
            elements.tbody.appendChild(row);
            delBtn.addEventListener('click', deleteStudent);
        });
    }

    function deleteStudent(event) {
        const studentId = event.target.id;
        const deleteUrl = `${baseUrl}/${studentId}`;

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
            .then(loadStudents)
            .catch(err => console.log(err))

    }

    function createStudent() {
        if (id.value && firstName.value && lastName.value && facultyNumber.value && grade.value) {

            if (+grade.value >= 2 && +grade.value <= 6) {
                const idArray = [...document.querySelectorAll('tbody tr td:nth-of-type(1)')]
                    .map(id => id.textContent);

                if (!idArray.includes(id.value)) {
                    const facNumbArray = [...document.querySelectorAll('tbody tr td:nth-of-type(4)')]
                        .map(fn => fn.textContent);

                    if (!facNumbArray.includes(facultyNumber.value)) {
                        const data = {
                            'ID': id.value,
                            'First Name': firstName.value,
                            'Last Name': lastName.value,
                            'Faculty Number': facultyNumber.value,
                            'Grade': grade.value
                        }

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
                            .then(loadStudents)
                            .then(() => {
                                id.value = '';
                                firstName.value = '';
                                lastName.value = '';
                                facultyNumber.value = '';
                                grade.value = '';
                            })
                    } else {
                        alert('Faculty number already exists!');
                    }
                } else {
                    alert('ID already exists!');
                }
            } else {
                alert('Grade must be between 2.00 and 6.00.')
            }

        } else {
            alert('Input fields should not be empty.');
        }
    }

    function createHTMLElement(tag, text, placeholder) {
        const element = document.createElement(tag);
        if (text) {
            element.textContent = text;
        }
        if (placeholder) {
            element.placeholder = placeholder;
        }
        return element;
    }

    function handler(response) {
        if (response.status >= 400) {
            throw new Error(`${response.status}: ${response.statusText}`);
        };
        return response.json();
    }
})()