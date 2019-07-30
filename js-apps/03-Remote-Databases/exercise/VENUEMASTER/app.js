(function () {
    const user = 'guest';
    const password = 'pass';
    const appKey = 'kid_BJ_Ke8hZg';

    const url = {
        post: 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=',
        get: 'https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/',
        buy: 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=',
    }

    const element = {
        getVenues: document.getElementById('getVenues'),
        venueDate: document.getElementById('venueDate'),
        venueInfo: document.getElementById('venue-info'),
    }

    const validDates = ["23-11", "24-11", "25-11", "26-11", "27-11"]

    element.getVenues.addEventListener('click', getVenues)

    function getVenues() {
        const date = element.venueDate.value;

        if (validDates.includes(date)) {
            element.venueInfo.innerHTML = '<b>LOADING VENUES...</b>';
            const headers = {
                method: "POST",
                // credentials: 'include',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${user}:${password}`),
                    "Content-type": "application/json"
                }
            }

            fetch(url.post + date, headers)
                .then(handler)
                .then(getVenuesInfo)
        } else alert(`Invalid date.\nValid dates: ${validDates.join(', ')}`);
    }

    function getVenuesInfo(venuesIDs) {
        element.venueInfo.innerHTML = '';
        venuesIDs.forEach(id => {
            const headers = {
                credentials: 'include',
                Authorization: 'Basic ' + btoa(`${user}:${password}`),
            }

            fetch(url.get + id, headers)
                .then(handler)
                .then(showVenue)
        })

    }

    function showVenue(venue) {
        const venueDiv = document.createElement('div')
        venueDiv.className = 'venue';
        venueDiv.id = venue._id;
        venueDiv.innerHTML = `
            <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>
            <div class="venue-details" style="display: none;">
                <table>
                    <tr>
                        <th>Ticket Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td class="venue-price">${venue.price} lv</td>
                        <td><select class="quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select></td>
                        <td><input class="purchase" type="button" value="Purchase"></td>
                    </tr>
                </table>
                <span class="head">Venue description:</span>
                <p class="description">${venue.description}</p>
                <p class="description">Starting time: ${venue.startingHour}</p>
            </div>`

        element.venueInfo.appendChild(venueDiv);
        const moreInfoBtn = venueDiv.querySelector('input.info');
        moreInfoBtn.addEventListener('click', showMoreInfo)
        const purchaseBtn = venueDiv.querySelector('input.purchase');
        purchaseBtn.addEventListener('click', purchaseTickets);
    }

    function showMoreInfo(event) {
        const detailsDiv = event.target.parentNode.parentNode.getElementsByTagName('div')[0];
        if (detailsDiv.style.display === 'none') {
            detailsDiv.style.display = 'block';
        } else if (detailsDiv.style.display === 'block') {
            detailsDiv.style.display = 'none';
        }
    }

    function purchaseTickets(event) {
        const id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        const qty = event.target.parentNode.parentNode.querySelector('select.quantity').value;

        const headers = {
            credentials: 'include',
            Authorization: 'Basic ' + btoa(`${user}:${password}`),
        }

        fetch(url.get + id, headers)
            .then(handler)
            .then(data => showConfirmation(data, qty, id))
    }

    function showConfirmation(data, qty, id) {
        const { name, price } = data;
        element.venueInfo.innerHTML = `
        <span class="head">Confirm purchase</span>
        <div class="purchase-info">
            <span>${name}</span>
            <span>${qty} x ${price}</span>
            <span>Total: ${+qty * +price} lv</span>
            <input type="button" value="Confirm">
        </div>`;

        const confirmBtn = element.venueInfo.querySelector('input[type="button"]');
        confirmBtn.addEventListener('click', () => {
            const headers = {
                method: "POST",
                credentials: 'include',
                Authorization: 'Basic ' + btoa(`${user}:${password}`),
                headers: {
                    "Content-type": "application/json"
                }
            }

            fetch(`${url.buy}${id}&qty=${qty}`, headers)
                .then(handler)
                .then(data => element.venueInfo.innerHTML = '<p>You may print this page as your ticket</p>' + data.html)
        });
    }

    function handler(response) {
        if (response.status >= 400) {
            throw new Error(`${response.status}: ${response.statusText}`);
        };
        return response.json();
    }
})();