const Command = require('../base/Command');

class Region extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'region',
            description: 'Returns the region used for riot API calls.',
            category: 'Information',
            aliases: ['region']
        });
    }

    /**
     * Returns the region used for riot API calls.
     * @param {Object} message The message object that triggered the command.
     */
    run(message) {
        super.respond(
            `The current region used for League of Legends: \`${this.client.config.league.region}\`.`
        );
    }
}

module.exports = Region;
