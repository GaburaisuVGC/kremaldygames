const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const User = require("../../schemas/user");
const Altcoin = require("../../schemas/altcoin");
const { stringify } = require("nodemon/lib/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invest")
    .setDescription("Investir dans le Greed Coin.")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Le montant de la transaction.").setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.user.id;

    let userProfile = await User.findOne({ memberId: user });
    //Si l'utilisateur n'existe pas, on l'empêche de faire la commande
    const exists = await User.findOne({ memberId: user});
    let altcoinProfile = await Altcoin.findOne({ valid: true });
    let member = interaction.guild.members.cache.get(user);
    if (!exists) {
      await client.createUser(member);
        await interaction.reply(
          "Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande."
        );
    } else if (exists) {
      const transferAmount = interaction.options.getInteger("amount");


        if (transferAmount > userProfile.amount)
          return interaction.reply(
            `Désolé ${interaction.user}, n'avez que ${userProfile.amount}KC.`
          );
        if (transferAmount <= 0)
          return interaction.reply(
            `Merci d'entrer un nombre d'une valeur supérieur à zéro, ${interaction.user}.`
          );

        var transferToGC = await 0;
        transferToGC = await transferAmount / altcoinProfile.value;
        var str = stringify(userProfile.amountGC);
        var str1 = parseFloat(str);
        var calcul = str1 += transferToGC;


        await User.findOneAndUpdate(
          { memberId: interaction.user.id },
          { amount: userProfile.amount - transferAmount },
        );
        await User.findOneAndUpdate(
            { memberId: interaction.user.id },
            { amountGC: calcul},
          );
        await User.findOneAndUpdate(
            { memberId: interaction.user.id },
            { gc: true },
          );

        const newUserProfile = await User.findOne({ memberId: user });

        const userEmbed = new MessageEmbed()
          .setTitle(`Transfert effectué`)
          .addFields(
            { name: "Montant", value: `${transferAmount}KC`, inline: true },
            { name: "Nouveau solde GC", value: `${newUserProfile.amountGC}GC` },
            {
              name: "Nouveau solde",
              value: `${userProfile.amount}KC -> ${newUserProfile.amount}KC`,
            }
          )
          .setTimestamp()
          .setColor("BLACK")
          .setFooter({
            text: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          });
        await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
        }
    
  },
};
