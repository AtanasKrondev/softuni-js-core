function validate() {
    let input = document.getElementById('email');

    input.addEventListener('change', dynamicValidation);

    function dynamicValidation(event) {
        const emailStr = event.target.value;
        const regEx = /^[a-z]+\@[a-z]+\.[a-z]+$/;
        if (!regEx.test(emailStr)) {
            input.setAttribute('class', 'error');
        }
        if (regEx.test(emailStr)) {
            input.removeAttribute('class');
        }
    }
}