function solve() {
  let furnitureList;

  document.getElementsByTagName('button')[0]
    .addEventListener('click', function () {
      furnitureList = JSON.parse(document.getElementsByTagName('textarea')[0].value);

      let table = document.getElementsByClassName('table')[0];

      for (let furniture of furnitureList) {
        let row = table.insertRow();

        let cell = row.insertCell();
        let img = document.createElement('img');
        img.setAttribute('src', furniture.img);
        cell.appendChild(img);

        cell = row.insertCell();
        let name = document.createElement('p');
        name.innerHTML = furniture.name;
        cell.appendChild(name);

        cell = row.insertCell();
        let price = document.createElement('p');
        price.innerHTML = furniture.price;
        cell.appendChild(price);

        cell = row.insertCell();
        let decFactor = document.createElement('p');
        decFactor.innerHTML = furniture.decFactor;
        cell.appendChild(decFactor);

        cell = row.insertCell();
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        cell.appendChild(checkbox);
      }

    })

  document.getElementsByTagName('button')[1]
    .addEventListener('click', function () {
      let checkboxes = document.getElementsByTagName('input');
      let boughtFurniture = [];
      let totalPrice = [];
      let averageDecFactor = []


      for (let checkbox of checkboxes) {
        if (checkbox.checked) {
          boughtFurniture.push(checkbox.parentNode.parentNode.getElementsByTagName('p')[0].textContent);
          totalPrice.push(Number(checkbox.parentNode.parentNode.getElementsByTagName('p')[1].textContent));
          averageDecFactor.push(Number(checkbox.parentNode.parentNode.getElementsByTagName('p')[2].textContent))
        }
      }

      if (boughtFurniture.length > 0) {
        document.getElementsByTagName('textarea')[1].value =
          `Bought furniture: ${boughtFurniture.join(', ')}\nTotal price: ${totalPrice.reduce((a, b) => a + b).toFixed(2)}\nAverage decoration factor: ${averageDecFactor.reduce((a, b) => a + b) / averageDecFactor.length}`;
      }
    })
}