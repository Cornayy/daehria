const CATEGORIES = require('../../constants/Categories');
const Command = require('../../Command');

class Source extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'source',
            description: 'Sends a link to the source code of the bot.',
            category: CATEGORIES.INFORMATION,
            aliases: ['source']
        });
    }

    /**
     * Returns a link to the source code.
     * @param {Object} message The message object that triggered the command.
     */
    run(message) {
        super.respond(`Consider contributing to the bot: \n ${this.client.config.github}`);
    }
}

module.exports = Source;
