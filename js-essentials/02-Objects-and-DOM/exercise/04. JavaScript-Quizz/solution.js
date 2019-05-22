function solve() {
  let questionsSection = document.getElementsByTagName('section');
  let wrongAnswers = document.getElementsByClassName('low-value');
  let rightgAnswers = document.getElementsByClassName('high-value');
  let countQuestions = 0;
  let countRight = 0;
  let resultDisplay = document.querySelectorAll('#quizzie ul');
  
  



  [...wrongAnswers].forEach(e => e.addEventListener('click', () => cicleQuestions()));
  [...rightgAnswers].forEach(e => e.addEventListener('click', () => { cicleQuestions(); countRight++ }));

  function cicleQuestions() {
    questionsSection[countQuestions].className = 'hidden';
    countQuestions++;
    if (countQuestions < questionsSection.length) {
      questionsSection[countQuestions].className = '';
    }
  }

}
