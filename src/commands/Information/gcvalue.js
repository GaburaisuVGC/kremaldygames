const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { stringify } = require('nodemon/lib/utils');
const Altcoin = require('../../schemas/altcoin')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gcvalue')
        .setDescription("Montre la valeur du Greed Coin."),
    async execute (interaction){

        const GCProfile = await Altcoin.findOne({ valid: true });
        const val = stringify(GCProfile.value);
        const floatval = parseFloat(val);
        var calcul = 1 / floatval;

        const Embed = new MessageEmbed()
                .setTitle(`Greed Coin`)
                .addFields(
                    {name: 'Valeur', value: `${GCProfile.value}KC`, inline: true},
                    {name: '1 KC équivaut à', value: `${calcul}GC`},

                )
                .setTimestamp()
                .setColor("GOLD")
                .setFooter({text: interaction.user.tag, 
                            iconURL: interaction.user.displayAvatarURL()});
                await interaction.reply({ embeds: [Embed] });
        await interaction.editReply(Embed);
            
        
    },
};