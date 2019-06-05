function coffeeStorage() {
    let inputElement = JSON.parse(document.getElementsByTagName('textarea')[0].value);
    let [reportElement, inspectElement] = Array.from(document.querySelectorAll('div p'));
    let storage = {};

    for (const command of inputElement) {
        if (command === 'REPORT') {
            reportElement.innerHTML = inputElement.join('<br>');
        } else if (command === 'INSPECTION') {
            inspectElement.textContent = 'makari';
        } else {
            let [action, brand, coffee, expDate, qty] = command;
            if (action === 'IN') {
                if (!storage.hasOwnProperty(brand)) {
                    storage[brand] = {}
                }

                if (!storage[brand].hasOwnProperty(brand)) {
                    
                }
            } else if (action === 'OUT') {

            }
        }
    }
}