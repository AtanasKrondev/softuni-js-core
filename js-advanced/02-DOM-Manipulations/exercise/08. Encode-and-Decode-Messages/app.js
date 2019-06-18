function encodeAndDecodeMessages() {
    const [sendBtn, decodeBtn] = [...document.getElementsByTagName('button')];
    const [sendArea, decodeArea] = [...document.getElementsByTagName('textarea')];

    sendBtn.addEventListener('click', function () {
        let input = sendArea.value;
        let encodeMessage = '';

        for (const i of input) {
            encodeMessage += String.fromCharCode(i.charCodeAt(0) + 1);
        }

        decodeArea.value = encodeMessage;
        sendArea.value = '';

    })

    decodeBtn.addEventListener('click', function () {
        let input = decodeArea.value;
        let decodeMessage = '';

        for (const i of input) {
            decodeMessage += String.fromCharCode(i.charCodeAt(0) - 1);
        }

        decodeArea.value = decodeMessage;
    })

}