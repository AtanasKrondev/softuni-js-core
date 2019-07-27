(function attachEvents() {
    const btnLoadTowns = document.getElementById('btnLoadTowns');
    btnLoadTowns.addEventListener('click', loadTowns);

    function loadTowns() {
        const towns = document.getElementById('towns')
            .value
            .split(', ')
            .map(el => ({ name: el }))

        renderTowns(towns);
    }

    function renderTowns(towns) {
        const template = document.getElementById('townsTemplate').innerHTML;
        const compiled = Handlebars.compile(template);
        const rendered = compiled({ towns });
        document.getElementById('root').innerHTML = rendered;
    }
})();