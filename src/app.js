const Discord = require('discord.js');
const client = Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log(`Running as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
