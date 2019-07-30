(function () {
    const section = document.querySelector('section');
    const template = document.getElementById('monkey-template').innerHTML;
    const compiled = Handlebars.compile(template);
    const rendered = compiled({ monkeys });
    section.innerHTML = rendered;
    section.addEventListener('click', showInfo);

    function showInfo() {
        if (event.target.tagName === 'BUTTON') {
            const infoBtn = event.target;
            infoParagraph = infoBtn.parentNode.querySelector('p')
            infoParagraph.style.display === 'none' ? infoParagraph.style.display = '' : infoParagraph.style.display = 'none';
        }
    }
})();
