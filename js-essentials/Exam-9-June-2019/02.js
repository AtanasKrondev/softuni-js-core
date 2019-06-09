function trainStation(cap, passengers) {
    let aboard = [];
    let queue = 0;

    for (const wagon of passengers) {
        queue += wagon;
        if (queue <= cap) {
            aboard.push(queue);
            queue = 0;
        } else if (queue > cap) {
            aboard.push(cap);
            queue -= cap;

        }
    }

    console.log(aboard);
    if (queue === 0) {
        console.log('All passengers aboard');
    } else {
        console.log(`Could not fit ${queue} passengers`);
    }
}

trainStation(10, [9, 39, 1, 0, 0]);
trainStation(6, [5, 15, 2]);