const { Client, Collection } = require('discord.js');
const { readdir } = require('fs');
const ServiceHolder = require('./ServiceHolder');

/**
 * Represents a Discord client.
 * @extends Discord.Client
 */
class Deahria extends Client {
    constructor(options) {
        super(options.clientOptions || {});
        /**
         * The bot's configuration - empty if no file was specified.
         * @type {Object}
         */
        this.config = options.config ? require(options.config) : {};
        this.config.token = process.env.BOT_TOKEN;
        this.config.league.token = process.env.LEAGUE_TOKEN;
        /**
         * A collection of all of the bot's commands.
         * @type {Discord.Collection}
         */
        this.commands = new Collection();
        /**
         * A collection of all of the bot's commands aliases.
         * @type {Discord.Collection}
         */
        this.aliases = new Collection();
        /**
         * An object that holds all the services of the bot.
         * @type {ServiceHolder}
         */
        this.services = new ServiceHolder(this);

        console.log('Daehria is running.');
    }

    /**
     * Loads all commands in the directory.
     * @param {String} path The path where the commands are located.
     */
    loadCommands(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(cmd => {
                const command = new (require(`../../${path}/${cmd}`))(this);

                this.commands.set(command.help.name, command);

                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });
    }

    /**
     * Loads all events in the directory.
     * @param {String} path The path where the events are located.
     */
    loadEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(evt => {
                const event = new (require(`../../${path}/${evt}`))(this);

                super.on(evt.split('.')[0], (...args) => event.run(...args));
            });
        });
    }

    /**
     * Logs the client in.
     * @param {String} token The token used to log the client in.
     */
    login(token) {
        super.login(token);
    }
}

module.exports = Deahria;
