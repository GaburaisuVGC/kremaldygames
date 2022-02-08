const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const User = require('../../schemas/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription("Montre le compte d'un utilisateur.")
        .addUserOption(option => option.setName("target").setDescription("L'utilisateur mentionné.")),
    async execute (interaction, client){
        const user = (interaction.options.getUser("target") ? interaction.options.getUser("target") : interaction.user );
        let member = interaction.guild.members.cache.get(user.id);
        let avatar = interaction.guild.members.cache.get(user.avatar);
        const userProfile = await client.createUser(member);

        const userEmbed = new MessageEmbed()
                .setTitle(`Compte de ${user.username}`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
                .addFields(
                    {name: 'Pseudo', value: `${member}`, inline: true},
                    {name: 'Solde', value: `${userProfile.amount}KC`, inline: true},
                    {name: 'Trésors', value: `${userProfile.tresor} Trésors`, inline: true}
                )
                .setTimestamp()
                .setColor("GOLD")
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
            
        
    },
};