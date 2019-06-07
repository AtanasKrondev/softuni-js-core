function tableFilter(matrix, command) {
    let [action, header, value] = command.split(' ');

    switch (action) {
        case 'hide':
            hide(matrix, header);
            matrix.forEach(r => console.log(r.join(' | ')));
            break;
        case 'sort':
            sort(matrix, header);
            matrix.forEach(r => console.log(r.join(' | ')));
            break;
        case 'filter':
            let filteredMatrix = filter(matrix, header, value);
            filteredMatrix.forEach(r => console.log(r.join(' | ')));
            break;
    }


    function hide(matrix, header) {
        let index = matrix[0].indexOf(header);
        for (let row of matrix) {
            row.splice(index, 1);
        }
    }

    function sort(matrix, header) {
        let headerRow = matrix.shift();
        let index = headerRow.indexOf(header);
        matrix.sort((a, b) => a[index].localeCompare(b[index]))
            .unshift(headerRow);
    }

    function filter(matrix, header, value) {
        let headerRow = matrix.shift();
        let index = headerRow.indexOf(header);
        let filteredMatrix = matrix.filter(r => r[index] === value);
        filteredMatrix.unshift(headerRow);
        return filteredMatrix;
    }
}

tableFilter([['name', 'age', 'grade'],
['Peter', '25', '5.00'],
['George', '34', '6.00'],
['Marry', '28', '5.49']],
    'sort name');

tableFilter([['firstName', 'age', 'grade', 'course'],
['Peter', '25', '5.00', 'Ruby'],
['Ruby', '34', '6.00', 'Tech'],
['Marry', '28', '5.49', 'Ruby']],
    'filter course Ruby')