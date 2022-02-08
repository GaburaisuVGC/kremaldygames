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
        .setName('bentest')
        .setDescription('Test command'),
        async execute (interaction, client) {
            const userId = interaction.user.id;
            const toObject = true;
            const user = await User.findOne({ memberId: userId }, null, { lean : toObject });
            const listPersos = [user.persosList];


            function logArrayElements(element, index, array) {
                
                console.log("test[" + index + "] = " + element)                          
            }
            
            listPersos.forEach(logArrayElements);

            console.log(listPersos);
            

        }
    }