class Ready {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Sets the presence of the bot.
     * @param {Object} message
     */
    run(message) {
        this.client.user.setPresence(this.client.config.presence);
    }
}

module.exports = Ready;
