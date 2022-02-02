const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Tresor = require('../../schemas/tresor');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tresorcreate')
        .setDescription('Crée un trésor'),
    async execute (interaction, client){
        const tresorProfile = await client.createTresor();

        const userEmbed = new MessageEmbed()
                .setTitle(`Trésor créé`)
                .addFields(
                    {name: `Création de Trésor`, value: `Une trésor a été ajouté dans votre base de données`},
                )
                .setTimestamp()
                .setColor("BLUE")
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
            
        
    },
};