const path = require('path');
const Daehria = require('./Daehria');

require('dotenv').config();

/*
    Initialize Daehria.
*/

const client = new Daehria({ config: path.join(__dirname, '../config.json') });
client.login(client.config.token);
