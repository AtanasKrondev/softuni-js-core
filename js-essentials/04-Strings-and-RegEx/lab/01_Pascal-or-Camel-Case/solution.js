function solve() {
  let input = document.getElementById('text').value;
  let namingConvention = document.getElementById('naming-convention').value;
  let button = document.getElementsByTagName('input')[2];

  button.addEventListener('click', convertCase(input, namingConvention));

  function convertCase(input, namingConvention) {
    let result = document.getElementById('result');
    let output = input.toLowerCase()
      .split(' ')
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join('');

    switch (namingConvention) {
      case 'Camel Case':
        output = output[0].toLowerCase() + output.slice(1);
        result.textContent = output;
        break;
      case 'Pascal Case':
        result.textContent = output;
        break;
      default:
        console.log('Error');

        result.textContent = 'Error!';
        break;
    }
  }
}