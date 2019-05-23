function solve() {
  let quizAnswers = Array.from(document.getElementsByTagName('p'));
  let questions = Array.from(document.getElementsByTagName('section'));
  let results = document.querySelector('.results-inner h1');

  let currentQuestion = 0;
  let rightAnswers = 0;

  quizAnswers.forEach(question => question.addEventListener('click', selectAnswer))

  function selectAnswer(e) {
    let answer = e.target.textContent;

    if (answer === 'onclick' || answer === 'JSON.stringify()' || answer === 'A programming API for HTML and XML documents') {
      rightAnswers++;
    }

    questions[currentQuestion].style.display = 'none';
    currentQuestion++;

    if (currentQuestion < 3) {
      questions[currentQuestion].style.display = 'block';
    } else {
      if (rightAnswers === 3) {
        results.textContent = 'You are recognized as top JavaScript fan!';
      } else {
        results.textContent = `You have ${rightAnswers} right answers`;
      }

      document.getElementById('results').style.display = 'block';
    }
  }
}