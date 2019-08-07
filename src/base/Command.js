class Command {
    /**
     * @param {Daehria} client The client used in the command.
     * @param {Object} options The command's configuration.
     */
    constructor(client, options) {
        /**
         * The client used in the command.
         * @type {Daehria}
         */
        this.client = client;
        /**
         * The command's information properties.
         * @type {Object}
         */
        this.help = {
            name: options.name || null,
            description: options.description || 'No information specified.',
            usage: options.usage || '',
            category: options.category || 'Information'
        };
        /**
         * The command's configuration.
         * @type {Object}
         */
        this.conf = {
            aliases: options.aliases || []
        };
    }
    /**
     * Sets the message object to access information about the message.
     * @param {Object} message
     */
    setMessage(message) {
        this.message = message;
    }

    respond(message) {
        this.message.channel.send(message);
    }
}

module.exports = Command;
