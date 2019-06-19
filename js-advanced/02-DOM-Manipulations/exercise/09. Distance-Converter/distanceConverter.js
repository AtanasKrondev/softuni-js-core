function attachEventsListeners() {
    const button = document.getElementById('convert');
    button.addEventListener('click', convert);

    function convert() {
        const inputDistance = document.getElementById('inputDistance').value;
        const inputUnits = document.getElementById('inputUnits').value;
        const outputDistance = document.getElementById('outputDistance');
        const outputUnits = document.getElementById('outputUnits').value;
        let distanceInM = 0;

        switch (inputUnits) {
            case 'km': distanceInM = inputDistance * 1000; break;
            case 'm': distanceInM = inputDistance; break;
            case 'cm': distanceInM = inputDistance * 0.01; break;
            case 'mm': distanceInM = inputDistance * 0.001; break;
            case 'mi': distanceInM = inputDistance * 1609.34; break;
            case 'yrd': distanceInM = inputDistance * 0.9144; break;
            case 'ft': distanceInM = inputDistance * 0.3048; break;
            case 'in': distanceInM = inputDistance * 0.0254; break;
        }

        switch (outputUnits) {
            case 'km': outputDistance.value = distanceInM / 1000; break;
            case 'm': outputDistance.value = distanceInM; break;
            case 'cm': outputDistance.value = distanceInM / 0.01; break;
            case 'mm': outputDistance.value = distanceInM / 0.001; break;
            case 'mi': outputDistance.value = distanceInM / 1609.34; break;
            case 'yrd': outputDistance.value = distanceInM / 0.9144; break;
            case 'ft': outputDistance.value = distanceInM / 0.3048; break;
            case 'in': outputDistance.value = distanceInM / 0.0254; break;
        }

    }
}
