const path = require('path');
const Daehria = require('./src/base/Daehria');

require('dotenv').config();

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: path.join(__dirname, 'config.json') });
client.login(client.config.token);
client.loadCommands(client.config.paths.commands);
client.loadEvents(client.config.paths.events);
