function addProduct() {
    const productList = document.getElementById('product-list');
    const totalPrice = document.querySelector('#bill tfoot tr td:nth-child(2)');
    const product = document.querySelector('input[type=text]');
    const price = document.querySelector('input[type=number]');

    if (product.value !== '' && price.value !== '' && +price.value > 0) {
        const tr = document.createElement('tr');
        const tdProduct = document.createElement('td');
        const tdPrice = document.createElement('td');
        productList.appendChild(tr);
        tr.appendChild(tdProduct);
        tr.appendChild(tdPrice);
        tdProduct.textContent = product.value;
        tdPrice.textContent = price.value;
        totalPrice.textContent = +totalPrice.textContent + +price.value;
        product.value = '';
        price.value = '';
    }
}