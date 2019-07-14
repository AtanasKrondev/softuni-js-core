function attachEvents() {
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';
    const messagesArea = document.getElementById('messages');

    document.getElementById('submit').addEventListener('click', function () {
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        if (author && content) {
            const data = { author, content };
            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => refresh())
                .then(() => {
                    document.getElementById('author').value = '';
                    document.getElementById('content').value = '';
                })
        }
    });

    document.getElementById('refresh').addEventListener('click', refresh);

    function refresh() {
        fetch(url)
            .then(res => res.json())
            .then(data => show(data));
    }

    function show(data) {
        const messages = Object.values(data);
        messagesArray = [];
        for (const { author, content } of messages) {
            if (author && content) {
                messagesArray.push(`${author}: ${content}`);
            }
        }
        messagesArea.value = messagesArray.join('\n');
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}

attachEvents();