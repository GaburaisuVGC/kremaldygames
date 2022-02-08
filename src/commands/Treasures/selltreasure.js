const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');



const User = require('../../schemas/user');
const Tresor = require('../../schemas/tresor');

const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selltreasure')
        .setDescription('Vend un trésor contre des freerolls.').addStringOption((option) =>
        option
          .setName("treasure")
          .setDescription("Nom (exact et complet) du trésor que vous comptez vendre.")
          .setRequired(true)
      ),
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
    let userProfile = await User.findOne({ memberId: user });
    const tresorTarget = interaction.options.getString("treasure");
      let tresorProfile = await Tresor.findOne({ name: tresorTarget });
      if (!tresorProfile) {
        await interaction.reply(
          "Ce trésor n'existe pas, ou vous n'avez pas bien écrit son nom. (Veuillez respecter toute ponctuation, espacement, ou majuscule)"
        );
      } else if (tresorProfile) {

    await User.updateOne({ memberId: user }, { $pull : { tresorList: tresorProfile.title }});
    await User.updateOne({ memberId: user }, { freerolls: (userProfile.freerolls += tresorProfile.rolls)});
    await User.updateOne({ memberId: user}, { $inc: {tresor: - 1}})
    const newRolls = userProfile.freerolls;
    await interaction.reply(`Vous avez vendu ${tresorProfile.title} et avez obtenu ${tresorProfile.rolls} freerolls. Vous avez actuellement ${newRolls} freerolls.`)
    }
    }
}
}