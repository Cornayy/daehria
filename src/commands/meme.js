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

    run(message) {
        fetch('https://www.reddit.com/r/dankmemes/random.json')
            .then(res => res.json())
            .then(res => res[0].data.children)
            .then(res => res[0].data)
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
