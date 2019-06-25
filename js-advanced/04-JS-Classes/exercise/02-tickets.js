function tickets(arr, sorting) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = +price;
            this.status = status;
        }
    }

    let unsortedTickets = [];

    arr.forEach(entry => {
        const [destination, price, status] = entry.split('|');
        unsortedTickets.push(new Ticket(destination, price, status))
    })

    switch (sorting) {
        case 'destination': return unsortedTickets.sort((a, b) => a.destination.localeCompare(b.destination));
        case 'price': return unsortedTickets.sort((a, b) => a.price - b.price);
        case 'status': return unsortedTickets.sort((a, b) => a.status.localeCompare(b.status));
    }
}

console.log(tickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'));
