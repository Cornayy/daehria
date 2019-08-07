class Message {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Handles the message, gets and runs the right command with arguments.
     * Stops under the following conditions:
     * Author is bot.
     * Command doesn't have the right prefix.
     * Channel is not included in the config.
     * @param {Object} message
     */
    run(message) {
        if (
            message.author.bot ||
            !message.content.startsWith(this.client.config.prefix) ||
            !this.client.config.channels.includes(message.channel.name)
        )
            return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(this.client.config.prefix.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if (!cmd) return;

        cmd.setMessage(message);
        cmd.run(message, args);
    }
}

module.exports = Message;
