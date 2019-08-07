const Command = require('../base/Command');

class Ping extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Clears the last 5 messages.',
            category: 'Utility',
            aliases: ['clear']
        });
    }

    run(message) {
        //TODO: Implement the command.
        super.respond(``);
    }
}

module.exports = Ping;
