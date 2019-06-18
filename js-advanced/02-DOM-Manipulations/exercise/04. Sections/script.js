function create(words) {
   const container = document.getElementById('content');
   for (const word of words) {
      const divEl = document.createElement('div');
      const pEl = document.createElement('p');

      pEl.textContent = word;
      pEl.style.display = 'none';

      divEl.appendChild(pEl);
      divEl.addEventListener('click', () => {
         pEl.style.display = 'inline-block';
      });
      container.appendChild(divEl);
   }
}