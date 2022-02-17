const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const User = require("../../schemas/user");
const Altcoin = require("../../schemas/altcoin")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("retrieve")
    .setDescription("Retirer du Greed Coin à mettre dans son solde KC")
    .addNumberOption((option) =>
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
      const transferAmount = interaction.options.getNumber("amount");
      const newTransferAmount = transferAmount * altcoinProfile.value
      function float2int (value) {
        return value | 0;
         }


        if (transferAmount > userProfile.amountGC)
          return interaction.reply(
            `Désolé ${interaction.user}, n'avez que ${userProfile.amountGC}GC.`
          );
        if (transferAmount <= 0)
          return interaction.reply(
            `Merci d'entrer un nombre d'une valeur supérieur à zéro, ${interaction.user}.`
          );

        await User.findOneAndUpdate(
          { memberId: interaction.user.id },
          { amountGC: userProfile.amountGC - transferAmount},
        );
        await User.findOneAndUpdate(
            { memberId: interaction.user.id },
            { amount: userProfile.amount += float2int(newTransferAmount) },
          );

        const newUserProfile = await User.findOne({ memberId: user });

        const userEmbed = new MessageEmbed()
          .setTitle(`Transfert effectué`)
          .addFields(
            { name: "Montant", value: `${transferAmount}GC`, inline: true },
            { name: "Nouveau solde GC", value: `${newUserProfile.amountGC}GC` },
            {
              name: "Nouveau solde",
              value: `${newUserProfile.amount}KC`,
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