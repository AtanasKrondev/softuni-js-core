(() => {
    const elements = {
        loadBtn: document.querySelector('button.load'),
        createBtn: document.querySelector('button.add'),
        catches: document.getElementById('catches'),
    }

    const pattern = elements.catches.children[0];
    pattern.style.display = 'none';

    elements.loadBtn.addEventListener('click', loadAllCatches);
    elements.createBtn.addEventListener('click', createCatch);

    function loadAllCatches() {
        fetch('https://fisher-game.firebaseio.com/catches.json', { method: 'GET' })
            .then(handler)
            .then(showAllCatches)
    }

    function showAllCatches(data) {
        elements.catches.innerHTML = '';

        Object.keys(data).forEach((key) => {
            const catchElement = pattern.cloneNode(true);

            catchElement.style.display = 'inline-block';

            catchElement.setAttribute('data-id', key);
            catchElement.querySelector('input.angler').value = data[key].angler;
            catchElement.querySelector('input.weight').value = data[key].weight;
            catchElement.querySelector('input.species').value = data[key].species;
            catchElement.querySelector('input.location').value = data[key].location;
            catchElement.querySelector('input.bait').value = data[key].bait;
            catchElement.querySelector('input.captureTime').value = data[key].captureTime;

            catchElement.querySelector('button.update').addEventListener('click', updateCatch);
            catchElement.querySelector('button.delete').addEventListener('click', deleteCatch);

            elements.catches.appendChild(catchElement);
        })

        function deleteCatch(event) {
            const catchId = event.currentTarget.parentNode.getAttribute('data-id');
            const catchElement = event.currentTarget.parentNode;

            const headers = {
                method: 'DELETE',
            };

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, headers)
                .then(handler)
                .then((data) => {
                    catchElement.remove();
                })
        }

        function updateCatch(event) {
            const catchId = event.currentTarget.parentNode.getAttribute('data-id');
            const catchElement = event.currentTarget.parentNode;

            const body = [...catchElement.children]
                .filter(el => el.tagName === 'INPUT')
                .reduce((a, c) => {
                    const prop = c.className;
                    a[prop] = c.value;
                    return a;
                }, {})

            if (!(Object.values(body).indexOf('') > -1)) {

                const headers = {
                    method: 'PUT',
                    body: JSON.stringify(body)
                };

                fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, headers)
                    .then(handler)
                    .then((data) => {
                        elements.loadBtn.click();
                    })
            } else {
                alert('Input fields should not be empty!');
            }
        }
    }

    function createCatch() {
        const catchElement = document.querySelector('fieldset#addForm');
        const body = [...catchElement.children]
            .filter(el => el.tagName === 'INPUT')
            .reduce((a, c) => {
                const prop = c.className;
                a[prop] = c.value;
                c.value = '';
                return a;
            }, {})

        if (!(Object.values(body).indexOf('') > -1)) {
            const headers = {
                method: 'POST',
                body: JSON.stringify(body),
            }

            fetch('https://fisher-game.firebaseio.com/catches.json', headers)
                .then(handler)
                .then((data) => {
                    elements.loadBtn.click();
                })
        } else {
            alert('Input fields should not be empty!');
        }
    }

    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }
        return response.json();
    }
})();