const { Permissions: PERMISSIONS } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');
const Logger = require('../../utils/Logger');

class Clear extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Clears the last 100 messages.',
            category: CATEGORIES.UTILITY,
            aliases: ['clear'],
            requiredPermissions: PERMISSIONS.FLAGS.ADMINISTRATOR
        });
    }

    /**
     * Clears the last 100 messages in the #bot channel.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        const { channel } = message;

        if (channel.name !== 'bot') return;

        const messages = await channel.fetchMessages({ limit: 100 });

        try {
            await channel.bulkDelete(messages);

            super.respond(`Cleared ${messages.size} message(s).`);
        } catch (err) {
            super.respond(ERROR_MESSAGES.GENERAL);
            Logger.error(err);
        }
    }
}

module.exports = Clear;
