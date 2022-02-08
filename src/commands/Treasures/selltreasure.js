const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');



const User = require('../../schemas/user');
const Tresor = require('../../schemas/tresor');

const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selltreasure')
        .setDescription('Vend un trésor contre des freerolls.'),
    async execute (interaction, client){

        const user = interaction.user.id;
        // Dans chaque commande nécessitant le compte Kremaldy Games de celui ayant effectué la commande
        // Si l'utilisateur n'existe pas, on l'empêche de faire la commande
        const exists = await User.findOne({ memberId: user});
        let member = interaction.guild.members.cache.get(user);
        if (!exists) {
            await client.createUser(member);
            await interaction.reply(
          "Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande."
        );
    } else if (exists) {
    // Mettre votre commande ici
    await console.log("La commande n'est pas terminée.");
    }
    }
}