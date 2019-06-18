function addItem() {
    const menuList = document.getElementById('menu');
    const newText = document.getElementById('newItemText').value;
    const newValue = document.getElementById('newItemValue').value;

    let optionElement = document.createElement('option');
    optionElement.textContent = newText;
    optionElement.value = newValue;

    menuList.appendChild(optionElement);

    document.getElementById('newItemText').value = '';
    document.getElementById('newItemValue').value = '';
}