const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('../../config.json');
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    for (folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }


    const rest = new REST({ version: "9" }).setToken(token);

    (async () => {
      try {
        console.log("Les commandes (/) se relancent...");

        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandArray,
        });


        console.log("Les commandes (/) sont relancées.");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
