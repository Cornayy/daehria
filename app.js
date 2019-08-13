const Daehria = require('./src/base/Daehria');
const path = require('path');

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: path.resolve(__dirname + '/config') });
client.login(client.config.token);
client.initCommands(client.config.paths.commands);
client.initEvents(client.config.paths.events);
