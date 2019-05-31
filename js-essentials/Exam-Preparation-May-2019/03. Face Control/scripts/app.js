function getData() {
	let guestList = JSON.parse(document.getElementsByTagName('textarea')[0].value);
	let peopleInElement = document.querySelector('#peopleIn p');
	let blacklistElement = document.querySelector('#blacklist p');
	let peopleOutElement = document.querySelector('#peopleOut p');

	let peopleIn = [];
	let blacklist = [];
	let peopleOut = [];

	let sortingElement = guestList.pop();

	for (let guest of guestList) {
		let guestString = JSON.stringify({ firstName: guest.firstName, lastName: guest.lastName });
		switch (guest.action) {
			case 'peopleIn':
				if (!blacklist.includes(guestString) && !peopleIn.includes(guestString)) {
					peopleIn.push(guestString);
				}
				break;
			case 'blacklist':
				blacklist.push(guestString);
				if (peopleIn.includes(guestString)) {
					peopleIn.splice(peopleIn.indexOf(guestString), 1);
					peopleOut.push(guestString);
				}
				break;
			case 'peopleOut':
				if (peopleIn.includes(guestString)) {
					peopleIn.splice(peopleIn.indexOf(guestString), 1);
					peopleOut.push(guestString);
				}
				break;
		}
	}

	peopleInElement.textContent = peopleIn.join(' ');
	blacklistElement.textContent = blacklist.join(' ');
	peopleOutElement.textContent = peopleOut.join(' ');

	if (sortingElement.criteria !== '' && sortingElement.action !== '') {
		switch (sortingElement.action) {
			case 'peopleIn':
				peopleInElement.textContent = sorting(peopleIn, sortingElement);
				break;
			case 'peopleOut':
				peopleOutElement.textContent = sorting(peopleOut, sortingElement);
				break;
			case 'blacklist':
				blacklistElement.textContent = sorting(blacklist, sortingElement);
				break;
		}

	}

	function sorting(arrOfStr, sortingElement) {
		let sorted = arrOfStr
			.map(e => Object.entries(JSON.parse(e)));
		if (sortingElement.criteria === 'firstName') {
			sorted = sorted.sort((a, b) => a[0][1].localeCompare(b[0][1]));
		} else if (sortingElement.criteria === 'lastName') {
			sorted = sorted.sort((a, b) => a[1][1].localeCompare(b[1][1]));
		}
		let sortedJSONS = []
		for (let arr of sorted) {
			let obj = {};
			for (let el of arr) {
				obj[el[0]] = el[1];
			}
			sortedJSONS.push(JSON.stringify(obj));
		}
		return sortedJSONS.join(' ');
	}
}