function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const commits = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(handler)
        .then(showRepos)


    function handler(response) {
        if (response.status > 400) {
            const text = `Error: ${response.status} (${response.statusText})`;
            commits.innerHTML = '';
            commits.appendChild(createHTMLElement('li', text));
            throw new Error(`Error: ${response.status} (${response.statusText})`)
        }

        return (response.json());
    }

    function createHTMLElement(tagName, textContent) {
        const currentElement = document.createElement(tagName);

        if (textContent) {
            currentElement.textContent = textContent;
        }

        return currentElement;
    }

    function showRepos(data) {
        commits.innerHTML = '';
        for (const repo of data) {
            const text = `${repo.commit.author.name}: ${repo.commit.message}`
            commits.appendChild(createHTMLElement('li', text));
        }
    }
}
