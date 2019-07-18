(() => {
    const elements = {
        loadBtn: document.querySelector('button.load'),
        createBtn: document.querySelector('button.create'),
        catches: document.getElementById('catches'),
    }

    elements.catches.children[0].style.display = 'none';

    elements.loadBtn.addEventListener('click', loadAllCatches);
    // elements.createBtn.addEventListener('click', createCatch);
    // elements.updateBtn.addEventListener('click', updateCatch);
    // elements.deleteBtn.addEventListener('click', deleteCatch);

    function loadAllCatches() {
        fetch('https://fisher-game.firebaseio.com/catches.json', { method: 'GET' })
            .then(handler)
            .then(showAllCatches)
    }

    function showAllCatches(data) {
        Object.keys(data).forEach((key) => {
            const catchElement = elements.catches.children[0].cloneNode(true);
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
            console.log(catchId)
            const catchElement = event.currentTarget.parentNode;

            const body = [...catchElement.children]
                .filter(el => el.tagName === 'INPUT')
                .reduce((a, c) => {
                    const prop = c.className;
                    a[prop] = c.value;
                    return a;
                }, {})
            console.log(body);


            const headers = {
                method: 'PUT',
                body: JSON.stringify(body)
            };

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, headers)
                .then(handler)
                .then((data) => {
                    console.log(data);
                    elements.loadBtn.click();
                })
        }
    }

    function createCatch() {

    }



    function createHTMLElement(tagName, className, textContent, attribute) {
        const currentElement = document.createElement(tagName);

        if (typeof className === 'string') {
            currentElement.classList.add(className);
        } else if (typeof className === 'object') {
            currentElement.classList.add(...className);
        }

        if (textContent) {
            currentElement.textContent = textContent;
        }

        if (attribute) {
            currentElement.setAttribute(attribute.name, attribute.value);
        }

        return currentElement;
    }

    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }
        return response.json();
    }
})();