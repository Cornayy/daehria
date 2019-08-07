const Command = require('../base/Command');

class UserInfo extends Command {
    /**
     * @param {Daehria} client The client used in the command
     */
    constructor(client) {
        super(client, {
            name: 'userinfo',
            description: 'Displays information about the user.',
            category: 'Information',
            aliases: ['userinfo']
        });
    }

    run(message) {}
}

module.exports = UserInfo;
