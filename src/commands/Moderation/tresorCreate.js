const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Tresor = require("../../schemas/tresor");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tresorcreate")
    .setDescription("Crée un trésor."),
  async execute(interaction, client) {
    if (interaction.user.id == "414311854614118401") {
      const tresorProfile = await client.createTresor();

      const userEmbed = new MessageEmbed()
        .setTitle(`Trésor créé`)
        .addFields({
          name: `Création de Trésor`,
          value: `Un trésor a été ajouté dans votre base de données.`,
        })
        .setTimestamp()
        .setColor("BLUE")
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
