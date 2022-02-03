const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Balance = require("../../schemas/balance");

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

    let balanceProfile = await Balance.findOne({ memberId: user });
    

    const transferAmount = interaction.options.getInteger("amount");
    const transferTarget = interaction.options.getUser("target");
    const target = transferTarget.id
    let targetBalanceProfile = await Balance.findOne({ memberId: target })
    

    console.log(balanceProfile);
    console.log(targetBalanceProfile);

    if (transferAmount > balanceProfile.amount)
      return interaction.reply(
        `Sorry ${interaction.user}, you only have ${balanceProfile.amount}.`
      );
    if (transferAmount <= 0)
      return interaction.reply(
        `Please enter an amount greater than zero, ${interaction.user}.`
      );

    await Balance.findOneAndUpdate({ memberId: interaction.user.id}, { amount: balanceProfile.amount - transferAmount});
    await Balance.findOneAndUpdate({ memberId: target}, { amount: targetBalanceProfile.amount += transferAmount});

    const newBalanceProfile = await Balance.findOne({ memberId: user });

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
          value: `${balanceProfile.amount}KC -> ${newBalanceProfile.amount}KC`,
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
