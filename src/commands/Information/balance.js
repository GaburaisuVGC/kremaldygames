const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const User = require('../../schemas/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Returns balance')
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName("user")
        //         .setDescription("Gets information of a user mentionned"))
        .addUserOption(option => option.setName("target").setDescription("The user mentionned")),
    async execute (interaction, client){
        const user = (interaction.options.getUser("target") ? interaction.options.getUser("target") : interaction.user );
        let member = interaction.guild.members.cache.get(user.id);
        let avatar = interaction.guild.members.cache.get(user.avatar);
        const userProfile = await client.createUser(member);

        const userEmbed = new MessageEmbed()
                .setTitle(`${user.username}'s balance:`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
                .addFields(
                    {name: 'Username', value: `${member}`, inline: true},
                    {name: 'Balance', value: `${userProfile.amount}KC`, inline: true},
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