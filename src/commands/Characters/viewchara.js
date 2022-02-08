const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const User = require("../../schemas/user");
const Perso = require("../../schemas/perso");

const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("viewchara")
    .setDescription("Montre un personnage.")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("Nom (exact et complet) du personnage.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // Cette commande n'a pas besoin d'avoir de compte Kremaldy Games
    const charaTarget = interaction.options.getString("character");
    let charaProfile = await Perso.findOne({ name: charaTarget });
    // Si le personnage n'existe pas
    if (!charaProfile) {
      await interaction.reply(
        "Ce personnage n'existe pas, ou vous n'avez pas bien écrit son nom. (Veuillez respecter toute ponctuation, espacement, ou majuscule)"
      );
    } else if (charaProfile) {


      const imagePerso = new MessageAttachment(
        `./src/images/perso/${charaProfile.image}.png`
      );
      if (charaProfile.masterId == "") {
        const charaEmbed = new MessageEmbed()
        .setTitle(`${charaProfile.name}`)
        .setImage(`attachment://${charaProfile.image}.png`)
        .addFields(
          {
            name: `Description`,
            value: `${charaProfile.description}`,
            inline: true,
          },
          { name: `Valeur`, value: `${charaProfile.value}KC` }
        )
        .setColor("GREEN")
        .setFooter({
          text: `Ce personnage n'appartient à personne. Il est donc possible de le roll, ou bien de l'acheter. (Si son statut de vente le permet.)`,
        });
      await interaction.reply({ embeds: [charaEmbed], files: [imagePerso] });
      await interaction.editReply(charaEmbed);
      } else if (charaProfile.masterId != "") {
      const charaEmbed = new MessageEmbed()
        .setTitle(`${charaProfile.name}`)
        .setImage(`attachment://${charaProfile.image}.png`)
        .addFields(
          {
            name: `Description`,
            value: `${charaProfile.description}`,
            inline: true,
          },
          { name: `Valeur`, value: `${charaProfile.value}KC` },
          { name: `Identifiant du maître`, value: `${charaProfile.masterId}`, inline: true }
        )
        .setColor("GREEN")
        .setFooter({
          text: `Ce personnage appartient à quelqu'un, vous pouvez le racheter si son statut de vente le permet.`,
        });
      await interaction.reply({ embeds: [charaEmbed], files: [imagePerso] });
      await interaction.editReply(charaEmbed);
    }
}
  },
};
