const Command = require('../base/Command');
const Discord = require('discord.js');
const fetch = require('node-fetch');

class Meme extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'meme',
            description: 'Sends a meme from the r/dankmemes subreddit.',
            category: 'Fun',
            aliases: ['meme']
        });
    }

    /**
     * Returns a random meme from r/dankmemes.
     * @param {Object} message The message object that triggered the command.
     */
    run(message) {
        const random = Math.floor(Math.random() * 100);

        fetch('https://www.reddit.com/r/dankmemes.json?limit=100')
            .then(res => res.json())
            .then(res => res.data.children[random])
            .then(res => res.data)
            .then(res => {
                const post = new Discord.RichEmbed().setImage(res.url);
                super.respond(post);
            })
            .catch(error => {
                super.respond(`Something went wrong, please try again. ${error}`);
            });
    }
}

module.exports = Meme;
