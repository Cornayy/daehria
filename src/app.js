const Daehria = require('./base/Daehria');

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: './config' });
client.login(client.config.token);
client.initCommands(client.config.paths.commands);
client.initEvents(client.config.paths.events);
