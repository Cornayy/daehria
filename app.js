const Daehria = require('./src/base/Daehria');
const path = require('path');
require('dotenv').config();

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: __dirname + '/config' });
client.login(client.config.token);
client.loadCommands(client.config.paths.commands);
client.loadEvents(client.config.paths.events);
