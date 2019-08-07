const { Client, Collection } = require('discord.js');
const { readdir } = require('fs');

/**
 * Represents a Discord client
 * @extends Discord.Client
 */
class Deahria extends Client {
    constructor(options) {
        super(options.clientOptions || {});
        /**
         * The bot's configuration - empty if no file was specified
         * @type {Object}
         */
        this.config = options.config ? require(`../../${options.config}`) : {};
        /**
         * A collection of all of the bot's commands
         * @type {Discord.Collection}
         */
        this.commands = new Collection();
        /**
         * A collection of all of the bot's commands aliases
         * @type {Discord.Collection}
         */
        this.aliases = new Collection();
    }

    /**
     * Loads all commands in the directory
     * @param {String} path The path where the commands are located
     */
    initCommands(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(cmd => {
                const command = new (require(`../../${path}/${cmd}`))(this);

                this.commands.set(command.help.name, command);

                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });

        return this;
    }

    /**
     * Loads all events in the directory
     * @param {String} path The path where the events are located
     */
    initEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(evt => {
                const event = new (require(`../../${path}/${evt}`))(this);

                super.on(evt.split('.')[0], (...args) => event.run(...args));
            });
        });

        return this;
    }

    /**
     * Logs the client in
     * @param {String} token The token used to log the client in
     */
    login(token) {
        super.login(token);
    }
}

module.exports = Deahria;
