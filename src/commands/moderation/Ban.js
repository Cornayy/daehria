const { Permissions: PERMISSIONS } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');
const Logger = require('../../utils/Logger');

class Ban extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'Bans a member from the server.',
            category: CATEGORIES.UTILITY,
            aliases: ['ban'],
            args: ['<@user>'],
            requiredPermissions: PERMISSIONS.FLAGS.ADMINISTRATOR
        });
    }

    /**
     * Bans a member from the server.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        const member = message.mentions.members.first();

        if (!member) return;

        try {
            await member.ban({
                reason: `${member.user.tag} got banned.`
            });
            super.respond(`Succesfully banned ${member.user.tag}.`);
        } catch (err) {
            super.respond(ERROR_MESSAGES.GENERAL);
            Logger.error(err);
        }
    }
}

module.exports = Ban;
