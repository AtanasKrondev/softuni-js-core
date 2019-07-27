(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const template = document.getElementById('cat-template').innerHTML;
        const compiled = Handlebars.compile(template);
        const rendered = compiled({ cats: window.cats });
        const allCats = document.getElementById('allCats');
        allCats.innerHTML = rendered;
        allCats.addEventListener('click', showInfo);
    }

    function showInfo() {
        if (event.target.className === 'showBtn') {
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
    }
})();
