function result(arr) {
    let rectangles = [];
    for (const [width, height] of arr) {
        rectangles.push({
            width,
            height,
            area: () => { return width * height },
            compareTo: function (other) {
                return other.area() - this.area() || other.width - this.width;
            }
        })
    }

    return rectangles.sort((a, b) => a.compareTo(b));
}

let sizes = [[1, 20], [20, 1], [5, 3], [5, 3]];

let sortedRectangles = result(sizes);

console.log(sortedRectangles);

console.log(sortedRectangles[0].compareTo(sortedRectangles[1]));
