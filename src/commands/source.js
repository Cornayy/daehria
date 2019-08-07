const Command = require('../base/Command');

class Source extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'source',
            description: 'Links the source code of the bot.',
            category: 'Information',
            aliases: ['source']
        });
    }

    run(message) {
        //TODO: Implement command.
        super.respond(``);
    }
}

module.exports = Source;
