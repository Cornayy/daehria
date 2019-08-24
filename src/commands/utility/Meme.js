const { RichEmbed } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');
const Logger = require('../../utils/Logger');

class Meme extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'meme',
            description: 'Sends a meme from the r/dankmemes subreddit.',
            category: CATEGORIES.UTILITY,
            aliases: ['meme']
        });

        this.redditService = this.client.services.get('RedditService');
    }

    /**
     * Returns a random meme from r/dankmemes.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        try {
            const post = await this.redditService.getRandomMeme();
            const embed = new RichEmbed().setImage(post.url);

            super.respond(embed);
        } catch (err) {
            super.respond(ERROR_MESSAGES.GENERAL);
            Logger.error(err);
        }
    }
}

module.exports = Meme;
