const Command = require('../base/Command');
const Discord = require('discord.js');
const logger = require('../utils/Logger');

class UserInfo extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'userinfo',
            description: 'Displays information about the user.',
            category: 'Information',
            aliases: ['userinfo']
        });
    }

    /**
     * Returns information about the user.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        const guild = message.guild;

        try {
            const author = await guild.fetchMember(message.author);

            super.respond({
                embed: {
                    title: 'User Information',
                    description: this.help.description,
                    color: 0x00b405,
                    thumbnail: { url: author.user.avatarURL },
                    fields: [
                        { name: 'Account Created At', value: author.user.createdAt.toDateString(), inline: true },
                        { name: 'Joined Server At', value: author.joinedAt.toDateString(), inline: true }
                    ],
                    footer: {
                        text: `${this.client.user.username} at ${new Date().toDateString()}`,
                        iconURL: this.client.user.avatarURL
                    }
                }
            });
        } catch (err) {
            super.respond(`Something went wrong, please try again.`);
            logger.error(err);
        }
    }
}

module.exports = UserInfo;
