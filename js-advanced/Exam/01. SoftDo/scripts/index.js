function mySolution() {
    const question = document.getElementsByTagName('textarea')[0];
    const userName = document.querySelector('input[type="username"]');
    const sendBtn = document.querySelector('section#inputSection button');
    const pendingQuestions = document.getElementById('pendingQuestions');
    const openQuestions = document.getElementById('openQuestions');

    sendBtn.addEventListener('click', ask)

    function ask() {
        if (question.value) {
            const pendingQuestion = document.createElement('div');
            pendingQuestion.className = 'pendingQuestion';
            pendingQuestions.appendChild(pendingQuestion);

            const img = document.createElement('img');
            img.src = './images/user.png';
            img.width = '32';
            img.height = '32';
            pendingQuestion.appendChild(img);

            const user = document.createElement('span');
            if (userName.value === '') {
                user.textContent = 'Anonymous';
            } else {
                user.textContent = userName.value;
            }
            pendingQuestion.appendChild(user);

            const p = document.createElement('p')
            p.textContent = question.value;
            pendingQuestion.appendChild(p);

            const actions = document.createElement('div');
            actions.className = 'actions';
            pendingQuestion.appendChild(actions);

            const archive = document.createElement('button');
            archive.className = 'archive';
            archive.textContent = 'Archive';
            actions.appendChild(archive);

            const open = document.createElement('button');
            open.className = 'open';
            open.textContent = 'Open';
            actions.appendChild(open);

            archive.addEventListener('click', archiveAction);
            open.addEventListener('click', openAction);
        }
    }

    function archiveAction(event) {
        event.target.parentNode.parentNode.remove();
    }

    function openAction(event) {
        const openQuestion = event.target.parentNode.parentNode;
        openQuestions.appendChild(openQuestion);
        openQuestion.className = 'openQuestion';
        openQuestion.removeChild(openQuestion.lastChild);
        const actions = document.createElement('div');
        actions.className = 'actions';
        openQuestion.appendChild(actions);
        const reply = document.createElement('button');
        reply.className = 'reply';
        reply.textContent = 'Reply';
        actions.appendChild(reply);

        const replySection = document.createElement('div');
        replySection.className = 'replySection';
        replySection.style.display = 'none';
        openQuestion.appendChild(replySection);

        const input = document.createElement('input');
        input.className = 'replyInput';
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Reply to this question here...');
        replySection.appendChild(input);

        const send = document.createElement('button');
        send.className = 'replyButton';
        send.textContent = 'Send';
        replySection.appendChild(send);

        const ol = document.createElement('ol');
        ol.className = 'reply';
        ol.setAttribute('type', '1');
        replySection.appendChild(ol);

        reply.addEventListener('click', replyTo);
        send.addEventListener('click', sendReply);
    }

    function replyTo(event) {
        const replyBtn = event.target;
        const currentQuestion = replyBtn.parentNode.parentNode;

        if (replyBtn.textContent === 'Reply') {
            currentQuestion.querySelector('div.replySection').style.display = 'block';
            replyBtn.textContent = 'Back';
        } else if (replyBtn.textContent === 'Back') {
            currentQuestion.querySelector('div.replySection').style.display = 'none';
            replyBtn.textContent = 'Reply';
        }

    }

    function sendReply(event) {
        const reply = event.target.parentNode.getElementsByTagName('input')[0];
        if (reply.value) {
            const list = reply.parentNode.querySelector('ol.reply');
            const li = document.createElement('li');
            li.textContent = reply.value;
            list.appendChild(li);
        }
    }
}
