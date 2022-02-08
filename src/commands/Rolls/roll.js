const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');

const Card = require('../../schemas/card');
const User = require('../../schemas/user');
const Tresor = require('../../schemas/tresor');
const Perso = require('../../schemas/perso');


const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Tire une carte.'),
    async execute (interaction, client){


        /** Récupération de la carte  */

        const rarity = {
            "Commune" : "46",
            "Peu Commune" : "32",
            "Rare" : "14",
            "ULTRA RARE" : "7",
            "LÉGENDAIRE" : "1"
        }

        const colors = {
            "Commune" : "GREY",
            "Peu Commune" : "ORANGE",
            "Rare" : "BLUE",
            "ULTRA RARE" : "RED",
            "LÉGENDAIRE" : "PURPLE"
        }
        

        const userId = interaction.user.id;
        // Si l'user n'a pas de profil dans la DDB :
        const userBalance = await User.findOne({ memberId: userId });
        const exists = await User.findOne({ memberId: userId});
        let member = interaction.guild.members.cache.get(userId);
        if (exists) {

        const userCoin = userBalance.amount;
        if (userBalance.freerolls < 1) {
            if (userBalance.onCooldown == true) {
                await interaction.reply("Vous êtes en cooldown.");
            } else {
        // console.log(userCoin); -- Solde de l'utilisateur de la commande avant le roll, pour savoir si il peut lancer le roll
        if (userCoin < 100) {
            interaction.reply('Vous n\'avez pas assez de pièces !');
            return;
        } 
        else {
            const rnd = Math.random() * 100000; // Changer ici pour augmenter les probas

            const percent = rnd / 1000;
            let result = null, acc = 0;

            Object.keys(rarity).forEach(key => {
                if (result === null && percent > 100 - rarity[key] - acc)
                result = key;
                acc += parseFloat(rarity[key]);
            });

            // console.log(percent + "%", result); // -- Proba executée
            
            const toObject = true;
            const card = await Card.find({ niveau: result }, null, {lean: toObject});

            const cardCount = await Card.count({ niveau: result });
            const randID = Math.floor(Math.random() * cardCount);
            
            // console.log(randID); -- Quelle carte a été tirée ?
            
            let rollProfile = await Card.findOne({ _id: JSON.parse(JSON.stringify(card[`${randID}`]._id))});

            /** Envoi d'embed */
            if (rollProfile.image == ""){
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
            } else if (rollProfile.image != ""){
                const imageCard = new MessageAttachment(`./src/images/card/${rollProfile.image}.png`);
                const userEmbed = new MessageEmbed()
                .setTitle(`${rollProfile.title}`)
                .setImage(`attachment://${rollProfile.image}.png`)
                .addFields(
                    {name: `${rollProfile.niveau}`, value: `${rollProfile.text}`},
                )
                .setTimestamp()
                .setColor(`${colors[result]}`)
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed], files: [imageCard] });
                await interaction.editReply(userEmbed);
            }

            if (rollProfile.amount != 0) {
                await User.updateOne({ memberId: userId }, { $inc: {amount: rollProfile.amount}});
            }

            if (rollProfile.hasTresor != false) {
                const tresorCard = await Tresor.find({}, null, {lean: toObject});
                const tresorCount = await Tresor.count();
                const randTresorID = Math.floor(Math.random() * tresorCount);
                const userId = interaction.user.id;
                const userTresor = await User.findOne({ memberId: userId });
                const userTresorAmount = userTresor.tresor;

                let rollTresor = await Tresor.findOne({ _id: JSON.parse(JSON.stringify(tresorCard[`${randTresorID}`]._id))});
                const imageTresor = new MessageAttachment(`./src/images/tresor/${rollTresor.image}.png`);
                const userEmbedTresor = new MessageEmbed()
                    .setTitle("Vous avez trouvé un trésor !")
                    .setColor("BLUE")
                    .setFooter({text: rollTresor.title, 
                                iconURL: `attachment://${rollTresor.image}.png` 
                            });
                    await interaction.followUp({ embeds: [userEmbedTresor], files: [imageTresor] });
                    await interaction.editReply(userEmbedTresor);
                await User.updateOne({ memberId: userId }, { $inc: {tresor: 1}});
                }

            
            if (rollProfile.hasPersonnage != "") {
                const persoCard = await Perso.findOne({ _id: rollProfile.hasPersonnage }, null, {lean: toObject});
                if (persoCard.masterId == "") {
                    await Perso.updateOne({ _id: rollProfile.hasPersonnage }, { masterId: userId, onSale: 0 });
                    await User.updateOne({ memberId: userId }, { $inc: {perso: 1}});
                    await User.updateOne({ memberId: userId }, { $addToSet : { persosList: rollProfile.hasPersonnage }});
                    const imagePerso = new MessageAttachment(`./src/images/perso/${persoCard.image}.png`);
                    const userEmbedPerso = new MessageEmbed()
                    .setTitle("Vous avez trouvé un personnage !")
                    .setColor("LUMINOUS_VIVID_PINK")
                    .setImage(`attachment://${persoCard.image}.png`)
                    .addFields(
                        {name: `${persoCard.name}`, value: `${persoCard.description}`, inline: true},
                    )
                    await interaction.followUp({ embeds: [userEmbedPerso], files: [imagePerso] });
                    await interaction.editReply(userEmbedPerso);
                } else if (persoCard.masterId != "") {
                    if (rollProfile.compensation != 0) {
                        await User.updateOne({ memberId: userId }, { $inc: {amount: rollProfile.compensation}});
                    }
                    await interaction.followUp(`<@${persoCard.masterId}> possède déjà ce personnage ! Vous recevez une compensation de ${rollProfile.compensation}KC.`); // 
                    
                }
            }
            await User.updateOne({ memberId: userId }, { onCooldown: true });
            
        } 
                
            }
        } else if (userBalance.freerolls > 0) {
        // console.log(userCoin); -- Solde de l'utilisateur de la commande avant le roll, pour savoir si il peut lancer le roll
        if (userCoin < 100) {
            interaction.reply('Vous n\'avez pas assez de pièces !');
            return;
        } 
        else {
            const rnd = Math.random() * 100000; // Changer ici pour augmenter les probas

            const percent = rnd / 1000;
            let result = null, acc = 0;

            Object.keys(rarity).forEach(key => {
                if (result === null && percent > 100 - rarity[key] - acc)
                result = key;
                acc += parseFloat(rarity[key]);
            });

            // console.log(percent + "%", result); // -- Proba executée
            
            const toObject = true;
            const card = await Card.find({ niveau: result }, null, {lean: toObject});

            const cardCount = await Card.count({ niveau: result });
            const randID = Math.floor(Math.random() * cardCount);
            
            // console.log(randID); -- Quelle carte a été tirée ?
            
            let rollProfile = await Card.findOne({ _id: JSON.parse(JSON.stringify(card[`${randID}`]._id))});

            /** Envoi d'embed */
            
            if (rollProfile.image == ""){
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
            } else if (rollProfile.image != ""){
                const imageCard = new MessageAttachment(`./src/images/card/${rollProfile.image}.png`);
                const userEmbed = new MessageEmbed()
                .setTitle(`${rollProfile.title}`)
                .setImage(`attachment://${rollProfile.image}.png`)
                .addFields(
                    {name: `${rollProfile.niveau}`, value: `${rollProfile.text}`},
                )
                .setTimestamp()
                .setColor(`${colors[result]}`)
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed], files: [imageCard] });
                await interaction.editReply(userEmbed);
            }

            if (rollProfile.amount != 0) {
                await User.updateOne({ memberId: userId }, { $inc: {amount: rollProfile.amount}});
            }

            if (rollProfile.hasTresor != false) {
                const tresorCard = await Tresor.find({}, null, {lean: toObject});
                const tresorCount = await Tresor.count();
                const randTresorID = Math.floor(Math.random() * tresorCount);
                const userId = interaction.user.id;
                const userTresor = await User.findOne({ memberId: userId });
                const userTresorAmount = userTresor.tresor;

                let rollTresor = await Tresor.findOne({ _id: JSON.parse(JSON.stringify(tresorCard[`${randTresorID}`]._id))});
                const imageTresor = new MessageAttachment(`./src/images/tresor/${rollTresor.image}.png`);
                const userEmbedTresor = new MessageEmbed()
                    .setTitle("Vous avez trouvé un trésor !")
                    .setColor("BLUE")
                    .setFooter({text: rollTresor.title, 
                                iconURL: `attachment://${rollTresor.image}.png` 
                            });
                    await interaction.followUp({ embeds: [userEmbedTresor], files: [imageTresor] });
                    await interaction.editReply(userEmbedTresor);
                await User.updateOne({ memberId: userId }, { $inc: {tresor: 1}});
                }

            
            if (rollProfile.hasPersonnage != "") {
                const persoCard = await Perso.findOne({ _id: rollProfile.hasPersonnage }, null, {lean: toObject});
                if (persoCard.masterId == "") {
                    await Perso.updateOne({ _id: rollProfile.hasPersonnage }, { masterId: userId, onSale: 0 });
                    await User.updateOne({ memberId: userId }, { $inc: {perso: 1}});
                    await User.updateOne({ memberId: userId }, { $addToSet : { persosList: rollProfile.hasPersonnage }});
                    const imagePerso = new MessageAttachment(`./src/images/perso/${persoCard.image}.png`);
                    const userEmbedPerso = new MessageEmbed()
                    .setTitle("Vous avez trouvé un personnage !")
                    .setColor("LUMINOUS_VIVID_PINK")
                    .setImage(`attachment://${persoCard.image}.png`)
                    .addFields(
                        {name: `${persoCard.name}`, value: `${persoCard.description}`, inline: true},
                    )
                    await interaction.followUp({ embeds: [userEmbedPerso], files: [imagePerso] });
                    await interaction.editReply(userEmbedPerso);
                } else if (persoCard.masterId != "") {
                    if (rollProfile.compensation != 0) {
                        await User.updateOne({ memberId: userId }, { $inc: {amount: rollProfile.compensation}});
                    }
                    await interaction.followUp(`<@${persoCard.masterId}> possède déjà ce personnage ! Vous recevez une compensation de ${rollProfile.compensation}KC.`); // 
                    
                }
            }
            await User.updateOne({ memberId: userId }, { freerolls: userBalance.freerolls - 1 });
            
        } 
        }
    } else if (!exists) {
        await client.createUser(member);
        await interaction.reply("Vous n'aviez pas de compte Kremaldy Games, nous vous en avons créé un. Veuillez réessayer votre commande.");
    }
    },
}