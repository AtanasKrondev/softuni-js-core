function attachEvents() {
    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    document.getElementById('btnLoad')
        .addEventListener('click', loadPhonebook);

    document.getElementById('btnCreate')
        .addEventListener('click', createContact);

    function loadPhonebook() {
        document.getElementById('phonebook').innerHTML = '';

        fetch(url)
            .then((request) => request.json())
            .then((data) => {
                const entries = Object.entries(data)

                for (const [key, value] of entries) {
                    const name = value.person;
                    const phoneNumber = value.phone;

                    const delBtn = document.createElement('button');

                    delBtn.textContent = 'Delete';
                    delBtn.addEventListener('click', function () {
                        const delUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
                        fetch(delUrl, {
                            method: 'delete'
                        }).then(() => loadPhonebook());
                    });

                    const listItem = document.createElement('li');
                    listItem.textContent = `${name}: ${phoneNumber}`;
                    listItem.appendChild(delBtn);
                    document.getElementById('phonebook').appendChild(listItem);
                }
            })
    }

    function createContact() {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;
        if (person && phone) {
            const data = { person, phone };
            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => {
                loadPhonebook();
                document.getElementById('person').value = '';
                document.getElementById('phone').value = '';
            });
        }
    }

}

attachEvents();