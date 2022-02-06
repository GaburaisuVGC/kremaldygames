const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: 32767 });
client.commands = new Collection();
const { token } = require('../config.json');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoEventFiles = fs.readdirSync('./src/mongoEvents').filter(file => file.endsWith(".js"));
const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');




(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(token);
    client.dbLogin();
})();
