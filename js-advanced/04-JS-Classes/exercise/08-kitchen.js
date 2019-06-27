class Kitchen {
    constructor(budget) {
        this.budget = +budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        let actionsLog = [];
        products.forEach(product => {
            let productArr = product.split(' ');
            const productPrice = +productArr.pop();
            const productQuantity = +productArr.pop();
            const productName = productArr.join(' ')
            if (productPrice > this.budget) {
                actionsLog.push(`There was not enough money to load ${productQuantity} ${productName}`)
            } else {
                if (!this.productsInStock.hasOwnProperty(productName)) {
                    this.productsInStock[productName] = 0;
                }
                this.productsInStock[productName] += productQuantity;
                this.budget -= productPrice;
                actionsLog.push(`Successfully loaded ${productQuantity} ${productName}`);
            }
        });

        this.actionsHistory = [...this.actionsHistory, ...actionsLog]
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (this.menu.hasOwnProperty(meal)) {
            return `The ${meal} is already in our menu, try something different.`;
        } else {
            this.menu[meal] = {
                products: neededProducts,
                price: +price
            }
            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals on the menu, other ideas?`
        }
    }

    showTheMenu() {
        let toPrint = [];
        for (let key of Object.keys(this.menu)) {
            toPrint.push(`${key} - $ ${this.menu[key].price}`);
        }
        if (!toPrint.length) return ('Our menu is not ready yet, please come later...');
        else {
            return toPrint.join('\n') + '\n';
        };
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) return (`There is not ${meal} yet in our menu, do you want to order something else?`)
        //check for products          
        let ingredientsNeeded = this.menu[meal].products
        for (let item of ingredientsNeeded) {
            item = item.split(' ')
            let quantity = +item.pop()
            let product = item.join(' ')
            if (this.productsInStock[product] < quantity || !this.productsInStock[product]) {
                return (`For the time being, we cannot complete your order (${meal}), we are very sorry...`) // test 15
            }
        }

        for (let item of ingredientsNeeded) {
            item = item.split(' ')
            let quantity = +item.pop()
            let product = item.join(' ')
            this.productsInStock[product] -= quantity
        } this.budget += this.menu[meal].price
        return (`Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`) //test 13 pass
    }
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.makeTheOrder('Pizza'));
console.log(kitchen.makeTheOrder('frozenYogurt'));
// console.log(kitchen.productsInStock);

