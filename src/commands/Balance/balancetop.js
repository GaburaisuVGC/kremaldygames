const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment, MessageButton } = require("discord.js");
const User = require("../../schemas/user");
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balancetop")
    .setDescription("Voir les meilleurs utilisateurs selon le montant de leur compte."),
  async execute(interaction) {
    const button1 = new MessageButton()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("DANGER");

    const button2 = new MessageButton()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("SUCCESS");

    const buttonList = [button1, button2];

    const timeout = 30000

    

    let i = 0;
    let i1 = 10;
    let i2 = 20;
    let i3 = 30;
    let i4 = 40;
    var content1 = "";
    var content2 = "";
    var content3 = "";
    var content4 = "";
    var content5 = "";

    const toObject = true
    const userGBalance = await User.find({}, null, { lean : toObject }).sort({ amount: -1 });
    const userGBalanceCount = await User.count({});
        
    while (i < 10) {
      
        let userAmount = userGBalance[i].amount;
        const userGID = userGBalance[i].memberId;

        content1 += `${i + 1}. <@${userGID}> ~ ${userAmount}KC\n`
        i++;
    }

    while (i1 < 20) {
      
      let userAmount = userGBalance[i1].amount;
      const userGID = userGBalance[i1].memberId;

      content2 += `${i1 + 1}. <@${userGID}> ~ ${userAmount}KC\n`
      i1++;
  }

  while (i2 < 30) {
      
    let userAmount = userGBalance[i2].amount;
    const userGID = userGBalance[i2].memberId;

    content3 += `${i2 + 1}. <@${userGID}> ~ ${userAmount}KC\n`
    i2++;
  }

  while (i3 < 40) {
      
  let userAmount = userGBalance[i3].amount;
  const userGID = userGBalance[i3].memberId;

  content4 += `${i3 + 1}. <@${userGID}> ~ ${userAmount}KC\n`
  i3++;
  }

  while (i4 < 50) {
      
  let userAmount = userGBalance[i4].amount;
  const userGID = userGBalance[i4].memberId;

  content5 += `${i4 + 1}. <@${userGID}> ~ ${userAmount}KC\n`
  i4++;
  }

    const embed1 = new MessageEmbed().setTitle(`Top 10`).setDescription(content1);
    const embed2 = new MessageEmbed().setTitle(`Top 20`).setDescription(content2);
    const embed3 = new MessageEmbed().setTitle(`Top 30`).setDescription(content3);
    const embed4 = new MessageEmbed().setTitle(`Top 40`).setDescription(content4);
    const embed5 = new MessageEmbed().setTitle(`Top 50`).setDescription(content5);

    const pages = [
      embed1,
      embed2,
      embed3,
      embed4,
      embed5
      //....
      //embedN (till the number of your embeds)
    ];
    paginationEmbed(interaction, pages, buttonList, timeout);
   
  },
};
