const { readdir } = require('fs');
const Logger = require('../utils/Logger');

class EventManager {
    constructor(client) {
        this.client = client;

        this.loadEvents(this.client.config.paths.events);
    }

    /**
     * Loads all events in the directory.
     * @param {String} path The path where the events are located.
     */
    loadEvents(dir) {
        readdir(dir, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(evt => {
                const event = new (require(`../../${dir}/${evt}`))(this.client);
                const eventName = evt.split('.')[0];

                this.client.on(eventName.charAt(0).toLowerCase() + eventName.slice(1), (...args) =>
                    event.run(...args)
                );
            });
        });
    }
}

module.exports = EventManager;
