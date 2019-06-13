function getArticleGenerator(input) {
	const content = document.getElementById('content');
	let i = 0;
	function nextArticle() {
		if (i < input.length) {
			content.innerHTML += `<article>${input[i]}</article>`;
			i++;
		}
	}

	return nextArticle;
}