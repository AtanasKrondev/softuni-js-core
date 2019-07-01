function solve() {
    return {
        init: function (num1, num2, result) {
            this.num1 = document.querySelector(num1);
            this.num2 = document.querrySelector(num2);
            this.result = document.querySelector(result);
        },
        add: function () {
            this.result.value = +this.num1.value + this.num2.value;
        },
        subtract: function () {
            this.result.value = this.num1.value - this.num2.value;
        }

    }
}