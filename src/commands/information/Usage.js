const { RichEmbed } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');

class Usage extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'usage',
            description: 'Explains the usage of the specified command.',
            category: CATEGORIES.INFORMATION,
            aliases: ['usage'],
            args: ['<command>']
        });
    }

    /**
     * Explains the usage of the specified command..
     * @param {Object} message The message object that triggered the command.
     * @param {Array} args The given arguments for the command.
     */
    run(message, args) {
        if (args.length === 0) return;

        const command = args[0];
        const cmd = this.client.commandManager.commands.find(cmd => cmd.help.name === command);

        if (!cmd) {
            super.respond(ERROR_MESSAGES.COMMAND_NOT_FOUND);
            return;
        }

        const embed = new RichEmbed()
            .setTitle(`Usage for: **${cmd.help.name}**`)
            .setDescription(cmd.help.description)
            .setColor(0x00b405)
            .addField('Category', cmd.help.category, true)
            .addField(
                'Usage',
                `${this.client.config.prefix}${cmd.help.name} ${cmd.help.args
                    .map(arg => `${arg} `)
                    .join(' ')}`,
                true
            )
            .addField('Aliases', `${cmd.conf.aliases.join(' ')}`, true)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        super.respond(embed);
    }
}

module.exports = Usage;
