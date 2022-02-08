const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');



const User = require('../../schemas/user');
const Perso = require('../../schemas/perso');

const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('viewcharas')
        .setDescription("Montre les personnages d'un utilisateur.")
        .addUserOption(option => option.setName("target").setDescription("L'utilisateur mentionné.")),
    async execute (interaction, client){

        const username = interaction.user.id;
        // Dans chaque commande nécessitant le compte Kremaldy Games de celui ayant effectué la commande
        // Si l'utilisateur n'existe pas, on l'empêche de faire la commande
        const exists = await User.findOne({ memberId: username});
        let members = interaction.guild.members.cache.get(username);
        if (!exists) {
            await client.createUser(members);
            await interaction.reply(
          "Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande."
        );
    } else if (exists) {
    // Mettre votre commande ici
    const userId = interaction.options.getUser("target")
      ? interaction.options.getUser("target")
      : interaction.user;
    const toObject = true;
    const user = await User.findOne({ memberId: userId.id }, null, {
      lean: toObject,
    });
    if (!user) {
        await interaction.reply("L'utilsateur mentionné n'a pas de compte Kremaldy Games.");
    } else if (user) {
    const listPersos = user.persosList;
    var content = "";

    for (let index = 0; index < listPersos.length; index++) {
      const element = listPersos[index];
      content += `- ${element}\n`;
    }

    const embed = new MessageEmbed()
      .setTitle(`Personnages de ${userId.username}`)
      .setDescription(content);
    await interaction.reply({ embeds: [embed] });
  }
}
    }
}
    
