const Command = require('../base/Command');

class Name extends Command {
    constructor(client) {
        super(client, {
            name: 'name',
            description: 'Explains the name of the bot.',
            category: 'Information',
            aliases: ['name']
        });
    }

    run(message) {
        super.respond(
            `Why my name is like this? I'll spell it out for you backwards: ${this.client.user.username
                .split('')
                .toUpperCase()
                .reverse()
                .join(' ')}`
        );
    }
}

module.exports = Name;
