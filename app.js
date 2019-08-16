const Daehria = require('./src/base/Daehria');
require('dotenv').config();

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: __dirname + '/config.json' });
client.login(client.config.token);
client.loadCommands(client.config.paths.commands);
client.loadEvents(client.config.paths.events);
