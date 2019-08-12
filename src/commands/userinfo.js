const Command = require('../base/Command');
const Discord = require('discord.js');

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
    run(message) {
        const guild = message.guild;
        guild
            .fetchMember(message.author)
            .then(author => {
                const embed = new Discord.RichEmbed()
                    .setTitle('User Information')
                    .setDescription(this.help.description)
                    .setColor(0x00b405)
                    .setThumbnail(author.user.avatarURL)
                    .addBlankField()
                    .addField('Account Created At', author.user.createdAt.toDateString(), true)
                    .addField('Joined Server At', author.joinedAt.toDateString(), true)
                    .setFooter(
                        `${this.client.user.username} at ${new Date().toDateString()}`,
                        this.client.user.avatarURL
                    );

                super.respond(embed);
            })
            .catch(error => {
                super.respond(`Something went wrong, please try again.`);
            });
    }
}

module.exports = UserInfo;
