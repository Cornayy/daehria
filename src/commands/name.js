const Command = require('../base/Command');

class Name extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'name',
            description: 'Explains the name of the bot.',
            category: 'Information',
            aliases: ['name']
        });
    }

    run(message) {
        const client = this.client.user;

        super.respond(
            `Why my name is like this? I'll spell it out for you backwards: ${client.username
                .split('')
                .reverse()
                .join(' ')
                .toUpperCase()}`
        );
    }
}

module.exports = Name;
