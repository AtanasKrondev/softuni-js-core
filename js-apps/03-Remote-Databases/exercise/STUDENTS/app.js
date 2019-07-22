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
        createBtn: createHTMLElement('td', null, 'button', null, 'CREATE'),
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
            footRow.appendChild(createHTMLElement('td', null, 'input', property))
        }
        footRow.appendChild(elements.createBtn);
        elements.createBtn.addEventListener('click', createStudent);
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
        const students = data.sort((a, b) => a['ID'] - b['ID']);
        students.forEach(student => {
            const row = document.createElement('tr');

            for (const property of studentProperties) {
                row.appendChild(createHTMLElement('td', student[property]))
            }
            row.appendChild(createHTMLElement('td', null, 'button', null, 'DELETE'));
            elements.tbody.appendChild(row);
        });

    }

    function createStudent() {
        if (id.value && firstName.value && lastName.value && facultyNumber.value && grade.value) {
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

        } else {
            alert('Invalid input');
        }
    }

    function createHTMLElement(tag, text, childTag, placeholder, childText) {
        const element = document.createElement(tag);
        if (text) {
            element.textContent = text;
        }
        if (childTag) {
            const childElement = document.createElement(childTag);
            if (placeholder) {
                childElement.placeholder = placeholder;
            }
            if (childText) {
                childElement.textContent = childText;
            }
            element.appendChild(childElement);
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