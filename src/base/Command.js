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
      aliases: options.aliases || [],
      cooldown: options.cooldown || 1000
    };
    /**
     * The command's cooldowns for users.
     * @type {Set}
     */
    this.cooldowns = new Set();
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
   * Allows chaining.
   * @param {Object} message
   */
  respond(message) {
    this.message.channel.send(message);

    return this;
  }
}

module.exports = Command;
