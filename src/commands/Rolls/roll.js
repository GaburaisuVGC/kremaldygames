const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Card = require('../../schemas/card');
const Balance = require('../../schemas/balance');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Tire une carte'),
    async execute (interaction, client){
        
        // TODO : Ajouter les persos + trésors selon les cartes


        /** Récupération de la carte  */

        const rarity = {
            "Commune" : "60",
            "Peu Commune" : "25",
            "Rare" : "9",
            "ULTRA RARE" : "5",
            "LÉGENDAIRE" : "1"
        }

        const colors = {
            "Commune" : "GREY",
            "Peu Commune" : "WHITE",
            "Rare" : "BLUE",
            "ULTRA RARE" : "RED",
            "LÉGENDAIRE" : "ORANGE"
        }
        const user = interaction.user.id;
        const userBalance = await Balance.findOne({ memberId: user });
        const userCoin = userBalance.amount;
        console.log(userCoin);
        if (userCoin < 1) {
            interaction.reply('Vous n\'avez pas assez de pièces !');
            return;
        } 
        else {
        const rnd = Math.random() * 1000000; // Changer ici pour augmenter les probas

        const percent = rnd / 1000;
        let result = null, acc = 0;

        Object.keys(rarity).forEach(key => {
            if (result === null && percent > 100 - rarity[key] - acc)
              result = key;
            acc += parseFloat(rarity[key]);
          });

        // console.log(percent + "%", result); -- Proba executée
        
        const toObject = true;
        const card = await Card.find({ niveau: result }, null, {lean: toObject});

        const cardCount = await Card.count({ niveau: result });
        const randID = Math.floor(Math.random() * cardCount);
        
        // console.log(randID); -- Quelle carte a été tirée ?
        
        let rollProfile = await Card.findOne({ _id: JSON.parse(JSON.stringify(card[`${randID}`]._id))});
        
        if (rollProfile.amount != 0) {

            await Balance.updateOne({ memberId: user }, { $inc: {amount: rollProfile.amount}});
        }



        /** Envoi d'embed */
        
        const userEmbed = new MessageEmbed()
                .setTitle(`${rollProfile.title}`)
                .addFields(
                    {name: `${rollProfile.niveau}`, value: `${rollProfile.text}`},
                )
                .setTimestamp()
                .setColor(`${colors[result]}`)
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
        }   
    },
};