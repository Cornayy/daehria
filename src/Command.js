const { Permissions: PERMISSIONS } = require('discord.js');
const CATEGORIES = require('./constants/Categories');
const ERROR_MESSAGES = require('./constants/ErrorMessages');

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
            category: options.category || CATEGORIES.INFORMATION,
            args: options.args || []
        };
        /**
         * The command's configuration.
         * @type {Object}
         */
        this.conf = {
            aliases: options.aliases || [],
            cooldown: options.cooldown || 1000,
            requiredPermissions: options.requiredPermissions || PERMISSIONS.FLAGS.READ_MESSAGES
        };
        /**
         * The command's cooldowns for users.
         * @type {Set}
         */
        this.cooldowns = new Set();
    }

    /**
     * Checks if a user is able to use the command.
     * @param {User} user The user that's going to be checked.
     * @param {Message} message The message object.
     * @returns {Boolean} Whether the user has permission to execute this command.
     */
    isAbleToUse(user, message) {
        if (
            !this.client.userHasPermission(message.member, this.conf.requiredPermissions) ||
            this.cooldowns.has(user.id)
        ) {
            message.channel.send(ERROR_MESSAGES.NO_PERMISSION_OR_COOLDOWN);
            return false;
        }
        return true;
    }

    /**
     * Puts a user on cooldown.
     * @param {String} user The ID of the user to put on cooldown.
     */
    setCooldown(user) {
        this.cooldowns.add(user);

        setTimeout(() => {
            this.cooldowns.delete(user);
        }, this.conf.cooldown);
    }

    /**
     * Sets the message object to access information about the message.
     * @param {Object} message
     */
    setMessage(message) {
        this.message = message;
    }

    /**
     * Sends a message to the channel.
     * @param {Object} message
     * @returns {Command} Returns itself to allow chaining of methods.
     */
    respond(message) {
        this.message.channel.send(message);

        return this;
    }
}

module.exports = Command;
