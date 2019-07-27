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
        const moreInfo = event.target.parentNode.querySelector('div.status');
        moreInfo.style.display === 'none' ? moreInfo.style.display = '' : moreInfo.style.display = 'none';
    }

})()
