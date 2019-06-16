const solution = (function () {
    const commands = {
        upvote: (obj) => obj.upvotes++,
        downvote: (obj) => obj.downvotes++,
        score: (obj) => {
            let { upvotes } = obj;
            let { downvotes } = obj;
            let result = [];
            let obfuscationNumber = 0;
            let maxvotes;

            if (upvotes + downvotes > 50) {
                maxvotes = Math.max(upvotes, downvotes);
                obfuscationNumber = Math.ceil(0.25 * maxvotes);
            }

            result.push(upvotes + obfuscationNumber);
            result.push(downvotes + obfuscationNumber);
            result.push(upvotes - downvotes);
            let rating = getRating(obj);
            result.push(rating);
            return result;
        },
        call: (obj, args) => {
            return commands[args](obj);
        }
    };
    return commands;

    function getRating(obj) {
        let { upvotes } = obj;
        let { downvotes } = obj;
        let totalVotes = upvotes + downvotes;
        let balance = upvotes - downvotes;

        if (totalVotes < 10) {
            return 'new';
        }
        if (upvotes / totalVotes > 0.66) {
            return 'hot';
        }
        if ((downvotes / totalVotes <= 0.66) && balance >= 0 && (upvotes > 100 || downvotes > 100)) {
            return 'controversial';
        }
        if (balance < 0 && totalVotes >= 10) {
            return 'unpopular';
        }
        return 'new';
    }
})()

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
solution.call(post, 'downvote');     // (executed 50 times)
score = solution.call(post, 'score');     // [139, 189, -50, 'unpopular']

console.log(score);
