module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Teehee ! Erreur.",
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId == "color-select") {
            let colours = "";
            await interaction.values.forEach(async value => {
                colours += `${value} `
            });
            await interaction.reply({ content: `Wow your fav color is: ${colours}`});
        }
    } else if (interaction.isButton()) {
        if (interaction.customId.includes('-button')) {
            if (interaction.customId.includes('danger')) {
                await interaction.reply({ content: `Color Danger: #ED4245`});
            } else if (interaction.customId.includes('success')) {
                await interaction.reply({ content: `Color Success: #57F287`});
            } else if (interaction.customId.includes('primary')) {
                await interaction.reply({ content: `Color Primary: #5865F2`});
            }
        }
    }
  },
};
