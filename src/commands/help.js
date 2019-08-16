const Command = require('../base/Command');
const Discord = require('discord.js');

class Help extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Displays all the available commands.',
            category: 'Information',
            aliases: ['help']
        });
    }

    /**
     * Returns information about all the available commands and prefix.
     * @param {Object} message The message object that triggered the command.
     */
    run(message) {
        const commands = this.client.commands;
        const help = new Discord.RichEmbed()
            .setTitle('Help')
            .setDescription(
                `${this.help.description} \n The prefix used for commands is: '${this.client.config.prefix}'.`
            )
            .setColor(0x00b405)
            .addBlankField()
            .setFooter(`${this.client.user.username} at ${new Date().toDateString()}`, this.client.user.avatarURL);

        commands.forEach(command => {
            help.addField(command.help.name, command.help.description);
        });

        super.respond(help);
    }
}

module.exports = Help;
