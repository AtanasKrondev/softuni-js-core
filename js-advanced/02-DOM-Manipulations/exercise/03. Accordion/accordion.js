function toggle() {
    let button = document.querySelector('.button');
    let article = document.getElementById('extra');

    if (article.style.display === 'none') {
        article.style.display = 'block';
        button.textContent = 'Less';
    } else {
        article.style.display = 'none';
        button.textContent = 'More';
    }
}