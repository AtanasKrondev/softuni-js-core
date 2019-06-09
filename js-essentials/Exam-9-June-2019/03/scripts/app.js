function spaceshipCrafting() {
	let titaniumCoreFound = Math.round(+document.getElementById('titaniumCoreFound').value);
	let aluminiumCoreFound = Math.round(+document.getElementById('aluminiumCoreFound').value);
	let magnesiumCoreFound = Math.round(+document.getElementById('magnesiumCoreFound').value);
	let carbonCoreFound = Math.round(+document.getElementById('carbonCoreFound').value);
	let lossesPercent = +document.getElementById('lossesPercent').value / 4;

	let availableBars = document.querySelector('#availableBars p');
	let builtSpaceships = document.querySelector('#builtSpaceships p');

	let resources = {
		'titanium bars': coresToBars(titaniumCoreFound, lossesPercent, 25),
		'aluminium bars': coresToBars(aluminiumCoreFound, lossesPercent, 50),
		'magnesium bars': coresToBars(magnesiumCoreFound, lossesPercent, 75),
		'carbon bars': coresToBars(carbonCoreFound, lossesPercent, 100)
	}

	let spaceships = {
		'THE-UNDEFINED-SHIP': 0,
		'NULL-MASTER': 0,
		'JSON-CREW': 0,
		'FALSE-FLEET': 0
	}

	while (resources['titanium bars'] >= 2 &&
		resources['aluminium bars'] >= 2 &&
		resources['magnesium bars'] >= 3 &&
		resources['carbon bars'] >= 1) {
		buildShip(7, 9, 7, 7, 'THE-UNDEFINED-SHIP');
		buildShip(5, 7, 7, 5, 'NULL-MASTER');
		buildShip(3, 5, 5, 2, 'JSON-CREW');
		buildShip(2, 2, 3, 1, 'FALSE-FLEET');

	}	

	let shipsArr = [];
	printShips('THE-UNDEFINED-SHIP');
	printShips('NULL-MASTER');
	printShips('JSON-CREW');
	printShips('FALSE-FLEET');

	availableBars.textContent = `${resources['titanium bars']} titanium bars, ${resources['aluminium bars']} aluminum bars, ${resources['magnesium bars']} magnesium bars, ${resources['carbon bars']} carbon bars`;
	builtSpaceships.textContent = shipsArr.join(', ');

	function coresToBars(cores, percent, rate) {
		return Math.round((cores - (percent / 100) * cores) / rate);
	}

	function buildShip(titanium, aluminium, magnesium, carbon, ship) {
		if (resources['titanium bars'] >= titanium &&
			resources['aluminium bars'] >= aluminium &&
			resources['magnesium bars'] >= magnesium &&
			resources['carbon bars'] >= carbon) {

			resources['titanium bars'] -= titanium;
			resources['aluminium bars'] -= aluminium;
			resources['magnesium bars'] -= magnesium;
			resources['carbon bars'] -= carbon;
			spaceships[ship]++;
		}
	}

	function printShips(ship) {
		if (spaceships[ship] > 0) {
			shipsArr.push(`${spaceships[ship]} ${ship}`);
		}
	}
}