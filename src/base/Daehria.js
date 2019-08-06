const { Client, Collection } = require('discord.js');
const { readdir } = require('fs');

class Deahria extends Client {
    constructor(options) {
        super(options.clientOptions || {});
        this.config = options.config ? require(`../../${options.config}`) : {};
        this.commands = new Collection();
        this.aliases = new Collection();
    }

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

    login(token) {
        super.login(token);
    }
}

module.exports = Deahria;
