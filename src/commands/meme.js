const Command = require('../base/Command');
const Discord = require('discord.js');
const RedditService = require('../services/RedditService');

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
        this.redditService = new RedditService(this.client);
    }

    /**
     * Returns a random meme from r/dankmemes.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        try {
            const post = await this.redditService.getRandomMeme();
            const embed = new Discord.RichEmbed().setImage(post.url);

            super.respond(embed);
        } catch (err) {
            super.respond(`Something went wrong, please try again. ${error}`);
        }
    }
}

module.exports = Meme;
