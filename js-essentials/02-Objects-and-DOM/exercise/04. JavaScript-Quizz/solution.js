function solve() {
  let questionsSection = document.getElementsByTagName('section');
  let wrongAnswers = Array.from(document.getElementsByClassName('low-value'));
  let rightAnswers = Array.from(document.getElementsByClassName('high-value'));
  let countQuestions = 0;
  let countRight = 0;

  wrongAnswers.forEach(e => e.addEventListener('click', () => cicleQuestions()));
  rightAnswers.forEach(e => e.addEventListener('click', () => { countRight++; cicleQuestions() }));

  function cicleQuestions() {
    questionsSection[countQuestions].className = 'hidden';
    questionsSection[countQuestions].style.display = 'none';
        
    countQuestions++;
    if (countQuestions < questionsSection.length) {
      questionsSection[countQuestions].className = '';
      questionsSection[countQuestions].style.display = 'block';
    } else {
      let resultElement = document.getElementsByClassName('results-inner')[0].children[0];

      if (countRight === 3) {
        resultElement.textContent = 'You are recognized as top JavaScript fan!';
      } else {
        resultElement.textContent = `You have ${countRight} right answers`;
      }

      let resultDisplay = document.querySelectorAll('#quizzie ul')[3];
      resultDisplay.style.display = 'block';
    }

  }

}
