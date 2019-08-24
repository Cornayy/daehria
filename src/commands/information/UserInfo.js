const { RichEmbed } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');
const Logger = require('../../utils/Logger');

class UserInfo extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'userinfo',
            description: 'Displays information about the user.',
            category: CATEGORIES.INFORMATION,
            aliases: ['userinfo']
        });
    }

    /**
     * Returns information about the user.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        const { guild } = message;

        try {
            const author = await guild.fetchMember(message.author);
            const embed = new RichEmbed()
                .setTitle('User Information')
                .setDescription(this.help.description)
                .setColor(0x00b405)
                .setThumbnail(author.user.avatarURL)
                .addField('Account Created At', author.user.createdAt.toDateString(), true)
                .addField('Joined Server At', author.joinedAt.toDateString(), true)
                .addField('Currently Playing', author.user.presence.game, true)
                .addField('Status', author.user.presence.status, true)
                .setFooter(
                    `${this.client.user.username} at ${new Date().toDateString()}`,
                    this.client.user.avatarURL
                );

            super.respond(embed);
        } catch (err) {
            super.respond(ERROR_MESSAGES.GENERAL);
            Logger.error(err);
        }
    }
}

module.exports = UserInfo;
