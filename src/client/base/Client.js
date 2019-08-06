const { Client, Collection } = require('discord.js');
const { readdir } = require('fs');

class Client extends Client {
    constructor() {}

    login(token) {
        super.login(token);
    }
}
