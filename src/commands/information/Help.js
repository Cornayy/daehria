const { RichEmbed } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const Command = require('../../Command');

class Help extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Displays all the available commands.',
            category: CATEGORIES.INFORMATION,
            aliases: ['help']
        });
    }

    /**
     * Returns information about all the available commands and prefix.
     * @param {Object} message The message object that triggered the command.
     */
    run(message) {
        const { commands } = this.client.commandManager;
        const embed = new RichEmbed()
            .setTitle('Help')
            .setDescription(
                `${this.help.description}, the prefix used for commands is: '${this.client.config.prefix}'.
                You can also check the usage of a command with !usage *command*.`
            )
            .setColor(0x00b405)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        commands.forEach(command =>
            embed.addField(command.help.name, `*${command.help.category}*`, true)
        );

        super.respond(embed);
    }
}

module.exports = Help;
