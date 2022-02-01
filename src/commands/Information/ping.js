const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoie le nombre de ping'),
    async execute(interaction) {
        await interaction.reply('Ratio.');

        const message = await interaction.fetchReply();

        return interaction.editReply(`Le message a mis ${message.createdTimestamp - interaction.createdTimestamp} ms pour me parvenir et te revenir.\nTon ping est de ${interaction.client.ws.ping} ms.`);
    }
}