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

        let actionsLogString = actionsLog.join('\n');
        this.actionsHistory.push(actionsLogString);
        return actionsLogString;
    }

    addToMenu(meal, neededProducts, price) {
        if (this.menu.hasOwnProperty(meal)) {
            let actionsLogString = `The ${meal} is already in our menu, try something different.`;
            this.actionsHistory.push(actionsLogString);
            return actionsLogString;
        } else {
            this.menu[meal] = {};
            this.menu[meal]['ingredients'] = {};
            neededProducts.forEach(product => {
                let productArr = product.split(' ');
                const productQuantity = +productArr.pop();
                const productName = productArr.join(' ');
                this.menu[meal]['ingredients'][productName] = +productQuantity;
            });
            this.menu[meal]['price'] = +price;
            let actionsLogString = `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
            this.actionsHistory.push(actionsLogString);
            return actionsLogString;
        }
    }

    showTheMenu() {
        let menuArr = Object.entries(this.menu);
        if (menuArr.length === 0) {
            let actionsLogString = 'Our menu is not ready yet, please come later...';
            this.actionsHistory.push(actionsLogString);
            return actionsLogString;
        } else {
            let actionsLog = [];
            menuArr.forEach(meal => {
                actionsLog.push(`${meal[0]} - $ ${meal[1].price}`);
            })
            let actionsLogString = actionsLog.join('\n');
            this.actionsHistory.push(actionsLogString);
            return actionsLogString;
        }
    }

    makeTheOrder(meal) {
        if (!this.menu.hasOwnProperty(meal)) {
            let actionsLogString = `There is not ${meal} yet in our menu, do you want to order something else?`;
            this.actionsHistory.push(actionsLogString);
            return actionsLogString;
        } else {
            for (const ingredient in this.menu[meal].ingredients) {
                if (!this.productsInStock.hasOwnProperty(ingredient)) {
                    let actionsLogString = `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                    this.actionsHistory.push(actionsLogString);
                    return actionsLogString;
                }
            }

            for (const ingredient in this.menu[meal].ingredients) {
                if (this.productsInStock[ingredient] < this.menu[meal].ingredients[ingredient]) {
                    let actionsLogString = `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                    this.actionsHistory.push(actionsLogString);
                    return actionsLogString;
                }
            }

            for (const ingredient in this.menu[meal].ingredients) {
                this.productsInStock[ingredient] -= this.menu[meal].ingredients[ingredient];
            }

            let actionsLogString = `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;
            this.actionsHistory.push(actionsLogString);
            return actionsLogString;
        }
    }
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.makeTheOrder('Pizza'));
console.log(kitchen.makeTheOrder('frozenYogurt'));
// console.log(kitchen.productsInStock);

