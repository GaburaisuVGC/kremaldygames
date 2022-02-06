const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Perso = require("../../schemas/perso");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("persocreate")
    .setDescription("Crée un personnage"),
  async execute(interaction, client) {
     if (interaction.user.id == "414311854614118401") {
      const persoProfile = await client.createPerso();

      const userEmbed = new MessageEmbed()
        .setTitle(`Personnage créé`)
        .addFields({
          name: `Création de Personnage`,
          value: `Un personnage a été ajouté dans votre base de données`,
        })
        .setTimestamp()
        .setColor("GREEN")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [userEmbed] });
      await interaction.editReply(userEmbed);
    } else {
      await interaction.reply({
        content: "T'as pas le droit.",
        ephemeral: true,
      });
    }
  },
};
