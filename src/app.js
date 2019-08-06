const Client = require('./base/Deahria');

/*
    Initialize Deahria.
*/

const client = new Client({ config: './config' });
client.login(client.config.token);
client.initCommands(client.config.paths.commands);
client.initEvents(client.config.paths.events);
