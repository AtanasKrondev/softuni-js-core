class Hotel {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.bookings = [];
    this.currentBookingNumber = 1;
    this.rooms = {
      single: Math.round(this.capacity * 0.5),
      double: Math.round(this.capacity * 0.3),
      maisonette: Math.round(this.capacity * 0.2),
    };
    this._roomsPricing = { single: 50, double: 90, maisonette: 135 };
    this._servicesPricing = { food: 10, drink: 15, housekeeping: 25 }
  }

  get roomsPricing() {
    return this._roomsPricing;
  }

  get servicesPricing() {
    return this._servicesPricing;
  }

  rentARoom(clientName, roomType, nights) {
    if (this.rooms[roomType] <= 0) {
      let output = `No ${roomType} rooms available!`
      for (const rooms in this.rooms) {
        if (rooms !== roomType) {
          output += ` Available ${rooms} rooms: ${this.rooms[rooms]}.`
        }
      }
      return output;
    }

    const bookingNumber = this.currentBookingNumber++;
    this.bookings.push({
      clientName,
      roomType,
      nights,
      bookingNumber,
    })
    this.rooms[roomType]--;

    return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${bookingNumber}.`
  }

  roomService(bookingNumber, serviceType) {
    const currentBooking = this.bookings.find(b => b.bookingNumber === bookingNumber)
    if (!currentBooking) {
      return `The booking ${bookingNumber} is invalid.`;
    }

    if (!this.servicesPricing.hasOwnProperty(serviceType)) {
      return `We do not offer ${serviceType} service.`;
    }

    if (!currentBooking.hasOwnProperty('services')) {
      currentBooking.services = [];
    }

    currentBooking.services.push(serviceType);
    return `Mr./Mrs. ${currentBooking.clientName}, Your order for ${serviceType} service has been successful.`;
  }

  checkOut(bookingNumber) {
    const currentBooking = this.bookings.find(b => b.bookingNumber === bookingNumber);
    const index = this.bookings.indexOf(currentBooking);
    if (!currentBooking) {
      return `The booking ${bookingNumber} is invalid.`;
    }

    this.rooms[currentBooking.roomType]++;
    const totalMoney = currentBooking.nights * this.roomsPricing[currentBooking.roomType];
    this.bookings.splice(index, 1);

    if (currentBooking.hasOwnProperty('services')) {
      let totalServiceMoney = 0;
      for (const service of currentBooking.services) {
        totalServiceMoney += this.servicesPricing[service];
      }

      return `We hope you enjoyed your time here, Mr./Mrs. ${currentBooking.clientName}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN. You have used additional room services, costing ${totalServiceMoney} BGN.`
    }

    return `We hope you enjoyed your time here, Mr./Mrs. ${currentBooking.clientName}. The total amount of money you have to pay is ${totalMoney} BGN.`
  }

  report() {
    let output = `${this.name.toUpperCase()} DATABASE:\n${'-'.repeat(20)}\n`;
    if (this.bookings.length === 0) {
      output = output + 'There are currently no bookings.';
    } else {
      let bookingsoutput = [];
      this.bookings.forEach(b => {
        let singlebookingoutput = [];
        singlebookingoutput.push(`bookingNumber - ${b.bookingNumber}`);
        singlebookingoutput.push(`clientName - ${b.clientName}`);
        singlebookingoutput.push(`roomType - ${b.roomType}`);
        singlebookingoutput.push(`nights - ${b.nights}`);
        if (b.hasOwnProperty('services')) {
          singlebookingoutput.push(`services: ${b.services.join(', ')}`);
        }
        bookingsoutput.push(singlebookingoutput.join('\n'));
      });

      output = output + bookingsoutput.join('\n' + '-'.repeat(10) + '\n');
    }

    return output;
  }
}

let hotel = new Hotel('HotUni', 10);
hotel.rentARoom('Peter', 'single', 4);
hotel.rentARoom('Robert', 'double', 4);
hotel.rentARoom('Geroge', 'maisonette', 6);
hotel.roomService(2, 'food');
hotel.roomService(2, 'food');
hotel.checkOut(1);
console.log(hotel.report());




