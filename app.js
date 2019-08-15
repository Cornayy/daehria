const Daehria = require('./src/base/Daehria');
const path = require('path');
require('dotenv').config();

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: __dirname + '/config.json' });
client.login(client.config.token);
client.initCommands(client.config.paths.commands);
client.initEvents(client.config.paths.events);
