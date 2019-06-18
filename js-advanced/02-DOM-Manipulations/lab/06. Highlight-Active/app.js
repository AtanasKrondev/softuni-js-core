function focus() {
    let inputs = [...document.getElementsByTagName('input')];
    inputs.forEach(input => input.addEventListener('focus', onFocus));
    inputs.forEach(input => input.addEventListener('blur', onBlur));

    function onFocus(event) {
        let input = event.target;
        input.parentNode.setAttribute('class', 'focused');
    }

    function onBlur(event) {
        let input = event.target;
        input.parentNode.removeAttribute('class');
    }
}