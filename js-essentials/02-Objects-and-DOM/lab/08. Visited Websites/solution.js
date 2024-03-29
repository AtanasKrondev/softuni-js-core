function solve() {
  let siteElements = Array.from(document.getElementsByClassName('link-1'));
  
  for (const siteElement of siteElements) {
    siteElement.addEventListener('click', (e) => {
      let currentTarget = e.currentTarget;
      let paragraphElement = currentTarget.getElementsByTagName('p')[0];

      let text = paragraphElement.textContent;
      let textParts = text.split(' ');
      let clicks = Number(textParts[1]);
      clicks++;
      textParts[1] = clicks;
      paragraphElement.textContent = textParts.join(' ');
    });
  }
}