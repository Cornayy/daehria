const { Permissions: PERMISSIONS } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');
const Logger = require('../../utils/Logger');

class Unban extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'unban',
            description: 'Unbans a member from the server.',
            category: CATEGORIES.UTILITY,
            aliases: ['unban'],
            args: ['<tag>'],
            requiredPermissions: PERMISSIONS.FLAGS.ADMINISTRATOR
        });
    }

    /**
     * Bans a member from the server.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message, args) {
        const tag = args[0];

        try {
            const bans = await message.guild.fetchBans();
            const user = bans.find(user => user.tag === tag);

            if (!user) return;

            await message.guild.unban(user.id);
            super.respond(`Succesfully unbanned ${user.tag}`);
        } catch (err) {
            super.respond(ERROR_MESSAGES.GENERAL);
            Logger.error(err);
        }
    }
}

module.exports = Unban;
