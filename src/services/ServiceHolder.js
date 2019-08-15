const { readdir } = require('fs');
const _path = require('path');

class ServiceHolder {
    /**
     * @param {Daehria} client The client that is used.
     **/
    constructor(client) {
        this.services = {};
        this.client = client;

        this.loadServices(this.client.config.paths.services);
    }

    /**
     * Loads all services in the directory.
     * @param {String} path The path where the services are located.
     */
    loadServices(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(serv => {
                if (serv === _path.basename(__filename)) return;
                const service = new (require(`../../${path}/${serv}`))(this);

                this.services[serv.slice(0, -3)] = service;
            });
        });
    }

    /**
     * Returns a service.
     * @param {String} service The name of the service.
     * @return {Object} The service.
     */
    get(service) {
        return this.services[service] || null;
    }
}

module.exports = ServiceHolder;
