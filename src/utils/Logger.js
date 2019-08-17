class Logger {
  /**
   * Information logger.
   *
   * @static
   * @param {String} msg Message to log.
   */
  static info(msg) {
    console.log(`\x1b[37;42minfo\x1b[32;49m ${msg}\x1b[0m`);
  }

  /**
   * Warning logger.
   *
   * @static
   * @param {String} msg Message to log.
   */
  static warn(msg) {
    console.log(`\x1b[37;43mwarn\x1b[33;49m ${msg}\x1b[0m`);
  }

  /**
   * Error logger.
   *
   * @static
   * @param {String} msg Message to log.
   */
  static error(msg) {
    console.error(`\x1b[37;41merror\x1b[31;49m ${msg}\x1b[0m`);
  }
}

module.exports = Logger;
