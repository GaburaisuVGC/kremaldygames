const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Card = require("../../schemas/card");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cardcreate")
    .setDescription("Crée une carte."),
  async execute(interaction, client) {
    if (interaction.user.id == "414311854614118401") {
      const cardProfile = await client.createCard();

      const userEmbed = new MessageEmbed()
        .setTitle(`Carte créée`)
        .addFields({
          name: `Création de Carte`,
          value: `Une carte a été ajoutée dans votre base de données.`,
        })
        .setTimestamp()
        .setColor("GREY")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [userEmbed] });
      await interaction.editReply(userEmbed);
    } else if (interaction.user.id != "414311854614118401") {
      await interaction.reply({
        content: "Cette commande est exclusive au créateur du bot.",
        ephemeral: true,
      });
    }
  },
};
