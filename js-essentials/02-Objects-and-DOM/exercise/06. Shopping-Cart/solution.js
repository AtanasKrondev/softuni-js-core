function solve() {
   let list = [];
   let totalPrice = 0
   let addButtons = Array.from(document.getElementsByClassName('product-add'));
   let checkoutButton = Array.from(document.getElementsByClassName('checkout'))[0];

   addButtons.forEach(button => button.addEventListener('click', addToCart));
   checkoutButton.addEventListener('click', checkout);

   function addToCart(add) {
      let product = add.target.parentNode.parentNode;
      let name = product.getElementsByClassName('product-title')[0].textContent;
      let money = product.getElementsByClassName('product-line-price')[0].textContent;

      if (!list.includes(name)) {
         list.push(name);
      }
      totalPrice += +money;

      document.getElementsByTagName('textarea')[0].value += `Added ${name} for ${money} to the cart.\n`;
   }

   function checkout() {
      document.getElementsByTagName('textarea')[0].value += `You bought ${list.join(', ')} for ${totalPrice.toFixed(2)}.`;

      Array.from(document.getElementsByTagName('button')).forEach(btn => btn.disabled = true);
   }

}