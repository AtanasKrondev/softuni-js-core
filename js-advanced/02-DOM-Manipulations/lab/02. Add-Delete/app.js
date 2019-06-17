function addItem() {
    const text = document.getElementById('newText').value;
    const li = buildElement('li', `${text} `)
    const listItem = document.getElementById('items');
    listItem.appendChild(li);
    const eListener = {
        type: 'click',
        func: deleteElement,
    }
    const deleteBtn = buildElement('a', '[Delete]', { name: 'href', value: '#' }, eListener)
    li.appendChild(deleteBtn)
    function deleteElement() {
        const element = this.parentNode;
        element.remove();
    }


    function buildElement(tag, text, attr, eListener) {
        const elementTag = document.createElement(tag)
        elementTag.textContent = text;
        if (attr) {
            elementTag.setAttribute(attr.name, attr.value);
        }
        if (eListener) {
            elementTag.addEventListener(eListener.type, eListener.func)
        }
        return elementTag
    }
}