function attachEvents() {
    const elements = {
        inputField: document.getElementById('location'),
        button: document.getElementById('submit'),
        current: document.getElementById('current'),
        upcoming: document.getElementById('upcoming'),
        forecast: document.getElementById('forecast'),
    }

    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    }

    elements.button.addEventListener('click', loadWeatherInfo)


    function loadWeatherInfo() {
        elements.forecast.style.display = 'block';
        fetch('https://judgetests.firebaseio.com/locations.json')
            .then(handler)
            .then(loadLocationWeatherInfo);
    }

    function loadLocationWeatherInfo(data) {
        const location = data.filter(loc => loc.name === elements.inputField.value)[0];

        if (location) {
            // elements.forecast.innerHTML = '<div id="current"><div class="label">Current conditions</div></div><div id="upcoming"><div class="label">Three-day forecast</div></div>'
            fetch(`https://judgetests.firebaseio.com/forecast/today/${location.code}.json`)
                .then(handler)
                .then(data => showLocationWeatherInfo(data, location.code));
        } else {
            elements.current.innerHTML = '<div class="label">Error</div>';
            elements.upcoming.innerHTML = '';
        }

    }

    function showLocationWeatherInfo(data, code) {
        elements.forecast.style.display = 'block';
        elements.current.innerHTML = '<div class="label">Current conditions</div>';

        let divForecast = createHTMLElement('div', 'forecasts');

        const symbol = `${symbols[data.forecast.condition]}`;
        const spanSymbol = createHTMLElement('span', ['condition', 'symbol'], symbol);

        let spanHolder = createHTMLElement('span', 'condition');

        const spanName = createHTMLElement('span', 'forecast-data', data.name);
        const degrees = `${data.forecast.low}${symbols['Degrees']}/${data.forecast.high}${symbols['Degrees']}`;
        const spanDegrees = createHTMLElement('span', 'forecast-data', degrees);
        const spanCondition = createHTMLElement('span', 'forecast-data', data.forecast.condition);

        spanHolder = appendChildrenToParent([spanName, spanDegrees, spanCondition], spanHolder);
        divForecast = appendChildrenToParent([spanSymbol, spanHolder], divForecast);

        elements.current.appendChild(divForecast);

        loadUpcomingWeatherInfo(code);
    }

    function loadUpcomingWeatherInfo(code) {
        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(handler)
            .then(showUpcomingWeatherInfo);
    }

    function showUpcomingWeatherInfo(data) {
        elements.upcoming.innerHTML = '<div class="label">Three-day forecast</div>';

        const divForecast = createHTMLElement('div', 'forecast-info');

        data.forecast.forEach(o => {
            const spanHolder = createHTMLElement('span', 'upcoming');

            const symbol = `${symbols[o.condition]}`;
            const spanSymbol = createHTMLElement('span', 'symbol', symbol);
            const degrees = `${o.low}${symbols['Degrees']}/${o.high}${symbols['Degrees']}`;
            const spanDegrees = createHTMLElement('span', 'forecast-data', degrees);
            const spanCondition = createHTMLElement('span', 'forecast-data', o.condition);
            divForecast.appendChild(appendChildrenToParent([spanSymbol, spanDegrees, spanCondition], spanHolder));
            elements.upcoming.appendChild(divForecast);
        })
    }

    function handler(response) {
        if (response.status >= 400) {
            elements.current.innerHTML = '<div class="label">Error</div>';
            elements.upcoming.innerHTML = '';
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        return response.json();
    }

    function createHTMLElement(tagName, className, textContent) {
        const currentElement = document.createElement(tagName);

        if (typeof className === 'string') {
            currentElement.classList.add(className);
        } else if (typeof className === 'object') {
            currentElement.classList.add(...className);
        }

        if (textContent) {
            currentElement.textContent = textContent;
        }

        return currentElement;
    }

    function appendChildrenToParent(children, parent) {
        children.forEach(child => parent.appendChild(child));
        return parent;
    }
}

attachEvents();