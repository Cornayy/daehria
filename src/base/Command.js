class Command {
    constructor(client, options) {
        this.client = client;
        this.help = {
            name: options.name || null,
            description: options.description || 'No information specified.',
            usage: options.usage || '',
            category: options.category || 'Information'
        };
        this.conf = {
            aliases: options.aliases || []
        };
    }

    setMessage(message) {
        this.message = message;
    }

    respond(message) {
        this.message.channel.send(message);
    }
}

module.exports = Command;
