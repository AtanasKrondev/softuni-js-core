(function () {
    const kinveyUserName = 'guest';
    const kinveyPassword = 'guest';
    const appKey = 'kid_ryJhfHeMB';
    const appSecret = '9653bcd3866b4c64b0fbe5659145cf7a';
    const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/students`;

    const elemenets = {
        tbody: document.querySelector('tbody'),
        table: document.getElementById('results'),
        theader: document.querySelector('thead tr')
    };

    elemenets.theader.appendChild(createHTMLElement('th','action'));

    const studentProperties = ['ID', 'First Name', 'Last Name', 'Faculty Number', 'Grade'];

    createFooter();
    loadStudents();

    function createFooter() {
        const tfoot = document.createElement('tfoot');
        elemenets.table.appendChild(tfoot)
        const footRow = document.createElement('tr')
        tfoot.appendChild(footRow);
        for (const property of studentProperties) {
            footRow.appendChild(createHTMLElement('td', null, 'input', property))
        }

    }

    function loadStudents() {
        const headers = {
            credentials: 'include',
            Authorization: 'Kinvey' + localStorage.getItem('authToken'),
        }

        fetch(baseUrl, headers)
            .then(handler)
            .then(showStudents)
    }

    function showStudents(data) {
        const students = data.sort((a, b) => a.id - b.id);
        students.forEach(student => {
            const row = document.createElement('tr');

            for (const property of studentProperties) {
                row.appendChild(createHTMLElement('td', student[property]))
            }

            elemenets.tbody.appendChild(row);
        })

    }

    function createHTMLElement(tag, text, childTag, placeholder) {
        const element = document.createElement(tag);
        if (text) {
            element.textContent = text;
        }
        if (childTag) {
            const childElement = document.createElement(childTag);
            if (placeholder) {
                childElement.placeholder = placeholder;
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