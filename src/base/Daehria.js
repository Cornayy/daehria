const { Client } = require('discord.js');
const ServiceManager = require('../structures/ServiceManager');
const CommandManager = require('../structures/CommandManager');
const EventManager = require('../structures/EventManager');
const logger = require('../utils/Logger');

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
         * An object that holds all the services of the bot.
         * @type {ServiceManager}
         */
        this.services = new ServiceManager(this);
        /**
         * An object that holds all the events of the bot.
         * @type {EventManager}
         */
        this.eventManager = new EventManager(this);
        /**
         * An object that holds all the commands of the bot.
         * @type {CommandManager}
         */
        this.commandManager = new CommandManager(this);

        logger.info('Daehria is running.');
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
