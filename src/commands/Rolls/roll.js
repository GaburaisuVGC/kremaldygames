const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Card = require('../../schemas/card');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Tire une carte'),
    async execute (interaction, client){

        const RollArray = [
            "61f98ba558cbc23e815869e8",
            "61f98bb258cbc23e815869ed",
        ]

        const Roll = Math.floor(Math.random() * RollArray.length);

        const cardId = RollArray[Roll];
        let rollProfile = await Card.findOne({ _id: cardId});

        const userEmbed = new MessageEmbed()
                .setTitle(`${rollProfile.title}`)
                .addFields(
                    {name: `${rollProfile.niveau}`, value: `${rollProfile.text}`},
                )
                .setTimestamp()
                .setColor("GREY")
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
            
        
    },
};