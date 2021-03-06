const { RichEmbed } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const Command = require('../../Command');

class Suggest extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            description: 'Sends your suggestion to the suggestion channel.',
            category: CATEGORIES.UTILITY,
            aliases: ['clear'],
            args: ['<suggestion>']
        });
    }

    /**
     * Handles the suggestion and posts it to the suggestions channel.
     * @param {Object} message The message object that triggered the command.
     * @param {Array} args The given arguments for the command.
     */
    run(message, args) {
        if (args.length === 0) return;

        const channel = message.guild.channels.find(ch => ch.name === 'suggestions');

        if (!channel) {
            super.respond('There is no #suggestions channel in this server.');
            return;
        }

        const { author } = message;
        const suggestion = args.join(' ');

        const embed = new RichEmbed()
            .setTitle(`Suggestion by *${author.username}*`)
            .setDescription(suggestion)
            .setColor(0x00b405)
            .setThumbnail(author.avatarURL)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        channel.send(embed);
    }
}

module.exports = Suggest;
