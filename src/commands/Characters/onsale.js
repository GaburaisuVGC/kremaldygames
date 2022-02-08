const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const User = require("../../schemas/user");
const Perso = require("../../schemas/perso");

const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("onsale")
    .setDescription("Permet de mettre en vente ou non l'un de vos personnages.")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("Nom (exact et complet) du personnage.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.user.id;
    // Dans chaque commande nécessitant le compte Kremaldy Games de celui ayant effectué la commande
    // Si l'utilisateur n'existe pas, on l'empêche de faire la commande
    const exists = await User.findOne({ memberId: user });
    let member = interaction.guild.members.cache.get(user);
    if (!exists) {
      await client.createUser(member);
      await interaction.reply(
        "Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande."
      );
    } else if (exists) {
      // Mettre votre commande ici

      const charaTarget = interaction.options.getString("character");
      let charaProfile = await Perso.findOne({ name: charaTarget });
      // Si le personnage n'existe pas
      if (!charaProfile) {
        await interaction.reply("Ce personnage n'existe pas, ou vous n'avez pas bien écrit son nom. (Veuillez respecter toute ponctuation, espacement, ou majuscule)");
      } else if (charaProfile) {
        // Si le master Id du perso n'est pas celui de l'interaction id, ne pas faire de commande
        if (charaProfile.masterId != user) {
          await interaction.reply(
            "Vous n'êtes pas le maître de ce personnage. Vous ne pouvez donc pas modifier sa valeur."
          );
        } else if (charaProfile.masterId == user) {
            if (charaProfile.onSale === 0 ) {
                await Perso.updateOne(
                    { _id: charaProfile._id },
                    { onSale: 1 }
                  );
                  await interaction.reply(`${interaction.user.username}, votre personnage ${charaProfile.name} est désormais vendable pour au minimum ${charaProfile.value}KC. (Vous pouvez changer sa valeur avec /setvalue.)`);
        
            } else if (charaProfile.onSale === 1) {
                await Perso.updateOne(
                    { _id: charaProfile._id },
                    { onSale: 0 }
                  );
                  await interaction.reply(`${interaction.user.username}, votre personnage ${charaProfile.name} est désormais invendable.`);
            }
          

        }
      }
    }
  },
};
