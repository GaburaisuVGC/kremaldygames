const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const User = require("../../schemas/user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Pay a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("The user mentionned")
    )
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("The amount")
    ),
  async execute(interaction, client) {
    const user = interaction.user.id;

    let userProfile = await User.findOne({ memberId: user });
    

    const transferAmount = interaction.options.getInteger("amount");
    const transferTarget = interaction.options.getUser("target");
    const target = transferTarget.id
    let targetUserProfile = await User.findOne({ memberId: target })

    if (transferAmount > userProfile.amount)
      return interaction.reply(
        `Sorry ${interaction.user}, you only have ${userProfile.amount}.`
      );
    if (transferAmount <= 0)
      return interaction.reply(
        `Please enter an amount greater than zero, ${interaction.user}.`
      );

    await User.findOneAndUpdate({ memberId: interaction.user.id}, { amount: userProfile.amount - transferAmount});
    await User.findOneAndUpdate({ memberId: target}, { amount: targetUserProfile.amount += transferAmount});

    const newUserProfile = await User.findOne({ memberId: user });

    const userEmbed = new MessageEmbed()
      .setTitle(`Payment successful`)
      .addFields(
        { name: "Amount", value: `${transferAmount}KC`, inline: true },
        {
          name: "to",
          value: `${transferTarget.username}`,
          inline: true,
        },
        {
          name: "Your balance amount",
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
  },
};
