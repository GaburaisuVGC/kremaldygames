const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { stringify } = require('nodemon/lib/utils');
const User = require('../../schemas/user');
const Altcoin = require('../../schemas/altcoin');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gcbalance')
        .setDescription("Montre le compte d'un utilisateur.")
        .addUserOption(option => option.setName("target").setDescription("L'utilisateur mentionné.")),
    async execute (interaction, client){
        const user = (interaction.options.getUser("target") ? interaction.options.getUser("target") : interaction.user );
        let member = interaction.guild.members.cache.get(user.id);
        let avatar = interaction.guild.members.cache.get(user.avatar);
        const userProfile = await client.createUser(member);

        const GCProfile = await Altcoin.findOne({ valid: true });
        const val = stringify(GCProfile.value);
        const val2 = stringify(userProfile.amountGC);
        const floatval = parseFloat(val);
        const floatval2 = parseFloat(val2);
        var calcul = floatval * floatval2;

        const userEmbed = new MessageEmbed()
                .setTitle(`Compte de ${user.username}`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
                .addFields(
                    {name: 'Pseudo', value: `${member}`, inline: true},
                    {name: 'Solde KC', value: `${userProfile.amount}KC`},
                    {name: 'Solde GC', value: `${userProfile.amountGC}GC (~${calcul}KC)`, inline: true},

                )
                .setTimestamp()
                .setColor("BLACK")
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [userEmbed] });
        await interaction.editReply(userEmbed);
            
        
    },
};