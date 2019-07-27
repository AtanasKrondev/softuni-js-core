(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const template = document.getElementById('cat-template').innerHTML;
        const compiled = Handlebars.compile(template);
        const rendered = compiled({ cats: window.cats });
        document.getElementById('allCats').innerHTML = rendered;
        const showBtn = [...document.getElementsByClassName('showBtn')];

        showBtn.forEach(btn => btn.addEventListener('click', showInfo));
    }

    function showInfo() {
        const clickedBtn = event.target;
        const moreInfo = clickedBtn.parentNode.querySelector('div.status');
        if (clickedBtn.textContent === 'Show status code') {
            clickedBtn.textContent = 'Hide status code';
            moreInfo.style.display = '';
        } else if (clickedBtn.textContent === 'Hide status code') {
            clickedBtn.textContent = 'Show status code';
            moreInfo.style.display = 'none';
        }
    }

})()
