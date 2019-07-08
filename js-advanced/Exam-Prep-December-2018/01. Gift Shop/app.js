function solution() {
	const toyType = document.getElementById('toyType');
	const toyPrice = document.getElementById('toyPrice');
	const toyDescription = document.getElementById('toyDescription');
	const button = document.querySelector('button[type="button"]');
	const christmasGiftShop = document.getElementById('christmasGiftShop');

	button.addEventListener('click', add);

	function add() {
		if (toyType.value !== '' && toyPrice.value !== '' && !Number.isNaN(+toyPrice.value) && toyDescription.value.length >= 30) {
			const div = document.createElement('div');
			div.className = 'gift';
			christmasGiftShop.appendChild(div);
			const img = document.createElement('img');
			img.src = 'gift.png';
			div.appendChild(img);
			const h2 = document.createElement('h2');
			h2.textContent = toyType.value;
			div.appendChild(h2);
			const p = document.createElement('p');
			p.textContent = toyDescription.value;
			div.appendChild(p);
			const buy = document.createElement('button');
			buy.textContent = `Buy it for $${toyPrice.value}`;
			div.appendChild(buy);

			buy.addEventListener('click', buyGift);

			function buyGift() {
				this.parentNode.remove();
			}
		}
	}
}