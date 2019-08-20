const { Collection } = require('discord.js');
const { readdir } = require('fs');
const logger = require('../utils/Logger');

class CommandManager {
    constructor(client) {
        this.client = client;
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

        this.loadCommands(this.client.config.paths.commands);
    }

    /**
     * Loads all commands in the directory.
     * @param {String} path The path where the commands are located.
     */
    loadCommands(dir) {
        readdir(dir, (err, files) => {
            if (err) logger.error(err);

            files.forEach(cmd => {
                const command = new (require(`../../${dir}/${cmd}`))(this.client);

                this.commands.set(command.help.name, command);

                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });
    }
}

module.exports = CommandManager;
