function solve() {
   const parameters = {
      'js-fundamentals': { price: 170, string: 'JS-Fundamentals' },
      'js-advanced': { price: 180, string: 'JS-Advanced' },
      'js-applications': { price: 190, string: 'JS-Applications' },
      'js-web': { price: 490, string: 'JS-Web' },
   }
   const button = document.querySelector('button[value="signMeUp"]');
   const showPrice = document.querySelector('div.courseFoot p');

   button.addEventListener('click', function () {
      const courseList = document.querySelector('div#myCourses div.courseBody ul');
      while (courseList.firstChild) {
         courseList.removeChild(courseList.firstChild);
      }
      let totalPrice = 0;
      const courses = [...document.querySelectorAll('input[type="checkbox"]:checked')]
         .map(course => course = course.value);
      courses
         .forEach(course => {
            totalPrice += parameters[course].price;
            const li = document.createElement('li');
            courseList.appendChild(li);
            li.textContent = parameters[course].string;
         });

      if (courses.length === 4) {
         const li = document.createElement('li');
         courseList.appendChild(li);
         li.textContent = 'HTML and CSS';
      }

      const educationForm = document.querySelector('input[type="radio"]:checked').value;

      if (courses.includes('js-fundamentals') && courses.includes('js-advanced')) {
         totalPrice -= parameters['js-advanced'].price * 0.1;
      }
      if (courses.includes('js-fundamentals') && courses.includes('js-advanced') && courses.includes('js-applications')) {
         totalPrice -= totalPrice * 0.06;
      }
      if (educationForm === 'online') {
         totalPrice -= totalPrice * 0.06;
      }

      courses.forEach(course => {

      })

      showPrice.textContent = `Cost: ${Math.round(totalPrice).toFixed(2)} BGN`;
   })
}

solve();