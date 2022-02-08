const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const User = require("../../schemas/user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Payer un utilisateur")
    .addUserOption((option) =>
      option.setName("target").setDescription("L'utilisateur que vous payez.")
    )
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Le montant de la transaction.")
    ),
  async execute(interaction, client) {
    const user = interaction.user.id;

    let userProfile = await User.findOne({ memberId: user });
    //Si l'utilisateur n'existe pas, on l'empêche de faire la commande
    const exists = await User.findOne({ memberId: user});
    let member = interaction.guild.members.cache.get(user);
    if (!exists) {
      await client.createUser(member);
        await interaction.reply(
          "Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande."
        );
    } else if (exists) {
      const transferAmount = interaction.options.getInteger("amount");
      const transferTarget = interaction.options.getUser("target");

      const target = transferTarget.id;
      let targetUserProfile = await User.findOne({ memberId: target });

      if (!targetUserProfile) {
        await interaction.reply(
          "Il est impossible de payer un joueur n'ayant pas de compte Kremaldy Games. Il lui suffit d'envoyer un message dans un serveur où le bot est présent."
        );
      } else if (targetUserProfile) {
        if (transferAmount > userProfile.amount)
          return interaction.reply(
            `Désolé ${interaction.user}, n'avez que ${userProfile.amount}KC.`
          );
        if (transferAmount <= 0)
          return interaction.reply(
            `Merci d'entrer un nombre d'une valeur supérieur à zéro, ${interaction.user}.`
          );

        await User.findOneAndUpdate(
          { memberId: interaction.user.id },
          { amount: userProfile.amount - transferAmount }
        );
        await User.findOneAndUpdate(
          { memberId: target },
          { amount: (targetUserProfile.amount += transferAmount) }
        );

        const newUserProfile = await User.findOne({ memberId: user });

        const userEmbed = new MessageEmbed()
          .setTitle(`Payement effectué`)
          .addFields(
            { name: "Montant", value: `${transferAmount}KC`, inline: true },
            {
              name: "à",
              value: `${transferTarget.username}`,
              inline: true,
            },
            {
              name: "Nouveau solde",
              value: `${userProfile.amount}KC -> ${newUserProfile.amount}KC`,
            }
          )
          .setTimestamp()
          .setColor("GOLD")
          .setFooter({
            text: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          });
        await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
        }
    }
  },
};
