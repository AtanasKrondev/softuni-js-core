function deleteByEmail() {
    const SELECTORS = {
        SEARCHROW: 'Email',
        INPUT: 'input[name="email"]',
        RESULT: 'result',
        ERROR: 'Not found.',
        SUCCESS: 'Deleted.',

    }
    const input = document.querySelector(SELECTORS.INPUT).value;
    const result = document.getElementById(SELECTORS.RESULT);
    const tableHeads = document.getElementsByTagName('th');
    const searchColumn = [...tableHeads].map(th => th.textContent).indexOf(SELECTORS.SEARCHROW) + 1;
    SELECTORS.ROWSELECTOR = `#customers tr td:nth-child(${searchColumn})`;
    let resultFound = false;
    [...document.querySelectorAll(SELECTORS.ROWSELECTOR)]
        .forEach(row => {
            if (row.textContent === input) {
                row.parentNode.remove();
                resultFound = true;
            }
        });
    if (resultFound) {
        result.textContent = SELECTORS.SUCCESS;
    } else {
        result.textContent = SELECTORS.ERROR;
    }
}