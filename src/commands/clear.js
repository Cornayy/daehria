const Command = require('../base/Command');

class Clear extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Clears the last 100 messages.',
            category: 'Utility',
            aliases: ['clear']
        });
    }

    /**
     * Clears the last 100 messages in the #bot channel.
     * @param {Object} message The message object that triggered the command.
     */
    async run(message) {
        const channel = message.channel;

        if (channel.name != 'bot') return;

        let messages = await channel.fetchMessages({ limit: 100 });
        message.channel
            .bulkDelete(messages)
            .then(messages => {
                super.respond(`Cleared ${messages.size} message(s).`);
            })
            .catch(error => {
                super.respond('Something went wrong while trying to clear the messages.');
            });
    }
}

module.exports = Clear;
