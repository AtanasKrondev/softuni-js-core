function solve() {
    let [text, output] = document.getElementById('string').value.split(', ');
    let result = document.getElementById('result');

    let nameReg = / ([A-Z][A-Za-z]*-([A-Z][A-Za-z]*\.-)?[A-Z][A-Za-z]*) /;
    let airportsReg = / ([A-Z]{3})\/([A-Z]{3}) /;
    let flightNumReg = / ([A-Z]{1,3}[0-9]{1,5}) /;
    let companyReg = /- ([A-Z][A-Za-z]*\*[A-Z][A-Za-z]*) /;

    let name = text.match(nameReg)[1].replace(/-/g, ' ');
    let fromAirport = text.match(airportsReg)[1];
    let toAirport = text.match(airportsReg)[2];
    let flightNumber = text.match(flightNumReg)[1];
    let company = text.match(companyReg)[1].replace('*', ' ');

    switch (output) {
        case 'name':
            appendP(`Mr/Ms, ${name}, have a nice flight!`);
            break;
        case 'flight':
            appendP(`Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`);
            break;
        case 'company':
            appendP(`Have a nice flight with ${company}.`);
            break;
        case 'all':
            appendP(`Mr/Ms, ${name}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${company}.`);
            break;
    }


    function appendP(str) {
        let p = document.createElement('p');
        p.textContent = str;
        result.appendChild(p);
    }
}