const fetch = require('node-fetch');

class RedditService {
    /**
     * @param {Daehria} client The client used for the bot.
     */
    constructor(client) {
        this.client = client;
    }

    getRandomMeme() {
        const random = Math.floor(Math.random() * 100);

        return fetch('https://www.reddit.com/r/dankmemes.json?limit=100')
            .then(res => res.json())
            .then(res => res.data.children[random])
            .then(res => res.data);
    }
}

module.exports = RedditService;
