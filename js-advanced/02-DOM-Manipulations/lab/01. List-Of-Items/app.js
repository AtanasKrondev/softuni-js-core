function addItem() {
    // console.log('TODO:...');
    let input = document.getElementById('newItemText').value;
    let li = document.createElement('li');
    li.textContent = input;
    document.getElementById('items').appendChild(li);
}