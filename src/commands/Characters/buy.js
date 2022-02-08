const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const User = require("../../schemas/user");
const Perso = require("../../schemas/perso");

const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Achète un personnage, au bot ou à celui qui le possède")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("Nom (exact et complet) du personnage que vous comptez acheter.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Montant de l'achat.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.user.id;
    // Dans chaque commande nécessitant le compte Kremaldy Games de celui ayant effectué la commande
    // Si l'utilisateur n'existe pas, on l'empêche de faire la commande
    const exists = await User.findOne({ memberId: user });
    let member = interaction.guild.members.cache.get(user);
    if (!exists) {
      await client.createUser(member);
      await interaction.reply(
        "Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande."
      );
    } else if (exists) {
      // Mettre votre commande ici
      let buyerProfile = await User.findOne({ memberId: user });
      const buyAmount = interaction.options.getInteger("amount");
      const charaTarget = interaction.options.getString("character");
      let charaProfile = await Perso.findOne({ name: charaTarget });
      const charaId = stringify(charaProfile._id);
      // Si le personnage n'existe pas
      if (!charaProfile) {
        await interaction.reply(
          "Ce personnage n'existe pas, ou vous n'avez pas bien écrit son nom. (Veuillez respecter toute ponctuation, espacement, ou majuscule)"
        );
      } else if (charaProfile) {
        // Si le personnage est onSale
        if (charaProfile.onSale === 0) {
            await interaction.reply("Le personnage a été déclaré comme invendable.");
        } else if (charaProfile.onSale === 1) {
        // Si le montant est supérieur au solde de l'acheteur
        if (buyAmount > buyerProfile.amount) {
          return interaction.reply(
            `Désolé ${interaction.user.username}, vous n'avez que ${buyerProfile.amount}KC.`
          );
          // Si le montant est inférieur à la valeur du personnage
        } else if (buyAmount < charaProfile.value) {
          return interaction.reply(
            `Désolé ${interaction.user.username}, le prix de ce personnage est au dessus de ${buyAmount}KC. (${charaProfile.value}KC)`
          );
          // Si il n'y a pas d'owner
        } else if (charaProfile.masterId == "") {
            await User.updateOne(
              { memberId: user },
              { amount: buyerProfile.amount - buyAmount }
            );
            await User.updateOne(
              { memberId: user },
              { $addToSet: { persosList: charaProfile.name } }
            );
            await Perso.updateOne(
              { _id: charaProfile._id },
              { belongsToSomeone: true, masterId: user, onSale: 0 }
            );
            const newBuyerProfile = await User.findOne({ memberId: user });
            const imagePerso = new MessageAttachment(
              `./src/images/perso/${charaProfile.image}.png`
            );
            const buyEmbed = new MessageEmbed()
              .setTitle(`Payement effectué`)
              .setImage(`attachment://${charaProfile.image}.png`)
              .addFields(
                {
                  name: `${charaProfile.name}`,
                  value: `${charaProfile.description}`,
                  inline: true,
                },
                { name: "Montant", value: `${buyAmount}KC` },
                { name: "Valeur", value: `${charaProfile.value}KC` },

                {
                  name: "Nouveau solde",
                  value: `${buyerProfile.amount}KC -> ${newBuyerProfile.amount}KC`,
                }
              )
              .setColor("GOLD")
              .setFooter({
                text: `Appartient désormais à ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
              });
            await interaction.reply({
              embeds: [buyEmbed],
              files: [imagePerso],
            });
            await interaction.editReply(buyEmbed);
          } else if (charaProfile.masterId != "") {
            if (charaProfile.masterId == interaction.user.id) {
              await interaction.reply(
                "Vous ne pouvez pas vous acheter votre propre personnage !"
              );
            } else if (charaProfile.masterId != interaction.user.id) {

                let ownerProfile = await User.findOne({ memberId: charaProfile.masterId})
                // const owner = ownerProfile.id;
                  await User.findOneAndUpdate(
                    { memberId: user },
                    { amount: (buyerProfile.amount - buyAmount), $addToSet: { persosList: charaProfile.name } }
                  );
                  await User.findOneAndUpdate(
                    { memberId: ownerProfile.memberId },
                    { amount: (ownerProfile.amount += buyAmount), $pull: { persosList: charaProfile.name } }
                  );
                  await Perso.updateOne(
                    { _id: charaProfile._id },
                    { masterId: user, onSale: 0 }
                  );
                  const newBuyerProfile = await User.findOne({ memberId: user });
                  const imagePerso = new MessageAttachment(
                    `./src/images/perso/${charaProfile.image}.png`
                  );
                  const buyEmbed = new MessageEmbed()
                    .setTitle(`Payement effectué`)
                    .setImage(`attachment://${charaProfile.image}.png`)
                    .addFields(
                      {
                        name: `${charaProfile.name}`,
                        value: `${charaProfile.description}`,
                        inline: true,
                      },
                      { name: "Montant", value: `${buyAmount}KC` },
                      { name: "Valeur", value: `${charaProfile.value}KC` },
      
                      {
                        name: "Nouveau solde",
                        value: `${buyerProfile.amount}KC -> ${newBuyerProfile.amount}KC`,
                      }
                    )
                    .setColor("GOLD")
                    .setFooter({
                      text: `Appartient désormais à ${interaction.user.tag}`,
                      iconURL: interaction.user.displayAvatarURL(),
                    });
                  await interaction.reply({
                    embeds: [buyEmbed],
                    files: [imagePerso],
                  });
                  await interaction.editReply(buyEmbed);
          }
        }
      }
    }
}
  },
};
