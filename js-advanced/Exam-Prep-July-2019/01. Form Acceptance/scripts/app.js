function acceptance() {
	const shippingCompany = document.querySelector('input[name="shippingCompany"]');
	const productName = document.querySelector('input[name="productName"]');
	const productQuantity = document.querySelector('input[name="productQuantity"]');
	const productScrape = document.querySelector('input[name="productScrape"]');

	const warehouse = document.getElementById('warehouse');

	const addButon = document.getElementById('acceptance');
	addButon.addEventListener('click', addItem);



	function addItem() {
		const quantity = +productQuantity.value - +productScrape.value;

		if (quantity !== NaN && quantity > 0 && shippingCompany.value !== '' && productName.value !== '') {
			const div = document.createElement('div');
			warehouse.appendChild(div);
			const p = document.createElement('p');
			div.appendChild(p);
			p.textContent = `[${shippingCompany.value}] ${productName.value} - ${quantity} pieces`;
			const outOfStock = document.createElement('button');
			outOfStock.setAttribute('type', 'button');
			div.appendChild(outOfStock);
			outOfStock.textContent = 'Out of stock';
		}

		shippingCompany.value = '';
		productName.value = '';
		productQuantity.value = '';
		productScrape.value = '';

		const delBtns = [...document.querySelectorAll('div#warehouse button')];
		delBtns.forEach(button => button.addEventListener('click', removeStock));
	}

	function removeStock(element) {
		const toDelete = element.target.parentNode;
		toDelete.parentNode.removeChild(toDelete);
	}
}