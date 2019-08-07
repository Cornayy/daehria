const Command = require('../base/Command');

class Source extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'source',
            description: 'Sends a link to the source code of the bot.',
            category: 'Information',
            aliases: ['source']
        });
    }

    run(message) {
        super.respond(`Consider contributing to the bot: \n ${this.client.config.github}`);
    }
}

module.exports = Source;
