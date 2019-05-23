function solve() {
   let tableContent = Array.from(document.getElementsByTagName('td'));
   let button = document.getElementById('searchBtn');
   let searchField = document.getElementById('searchField');

   button.addEventListener('click', search);

   function search() {
      let searchStr = searchField.value;

      if (searchStr !== '') {
         for (let cell of tableContent) {
            if (cell.textContent.includes(searchStr)) {
               cell.parentNode.className = 'select';
            }
         }
      }

      searchField.value = '';
   }
}