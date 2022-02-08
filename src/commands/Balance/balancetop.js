const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const User = require("../../schemas/user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balancetop")
    .setDescription("Voir les meilleurs utilisateurs selon le montant de leur compte."),
  async execute(interaction) {

    let i = 0;
    var content = "";

    const toObject = true
    const userGBalance = await User.find({}, null, { lean : toObject }).sort({ amount: -1 });
    const userGBalanceCount = await User.count({});
        
    while (i < userGBalanceCount) {
      
        let userAmount = userGBalance[i].amount;
        const userGID = userGBalance[i].memberId;

        content += `${i + 1}. <@${userGID}> ~ ${userAmount}KC\n`
        i++;
    }

    const embed = new MessageEmbed().setTitle(`Top ${userGBalanceCount}`).setDescription(content);
    await interaction.reply({ embeds: [embed]})
   
  },
};
