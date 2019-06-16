let manager = (function () {
    let ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    const recipesBook = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
    }

    const prepareRecipe = (recipe, neededQuantity) => {
        const neededIngredients = Object.entries(recipesBook[recipe]);
        for (const [ing, qty] of neededIngredients) {
            const ingredientStored = ingredients[ing] * neededQuantity;
            if (qty > ingredientStored) {
                return `Error: not enough ${ing} in stock`;
            }
        }

        for (const [ing, qty] of neededIngredients) {
            ingredients[ing] -= qty * neededQuantity;
        }

        return 'Success';
    }

    return function (input) {
        const tokens = input.split(' ');
        const command = tokens[0];

        switch (command) {
            case 'restock':
                ingredients[tokens[1]] += +tokens[2];
                return 'Success';
            case 'prepare':
                return (prepareRecipe(tokens[1], +tokens[2]));
            case 'report':
                return Object.entries(ingredients)
                    .map((kvp) => `${kvp[0]}=${kvp[1]}`)
                    .join(' ');
        }
    }
})()

console.log(manager("restock flavour 50")); 
console.log(manager("prepare lemonade 4"));