const Command = require('../base/Command');

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Pings the bot.',
            category: 'Information',
            aliases: ['pong']
        });
    }

    run(message) {
        super.respond(`Pong! Took ${Date.now() - message.createdAt}ms.`);
    }
}

module.exports = Ping;
