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
        super.respond(`Pong! Took ${message.createdAt - Date.now()}ms.`);
    }
}

module.exports = Ping;
