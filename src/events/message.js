class Message {
    constructor(client) {
        this.client = client;
    }

    run(message) {
        if (message.author.bot || !message.content.startsWith(this.client.config.prefix)) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(this.client.config.prefix.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if (!cmd) return;

        cmd.setMessage(message);
        cmd.run(message, args);
    }
}

module.exports = Message;
