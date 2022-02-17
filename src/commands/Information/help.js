const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment, Message } = require("discord.js");
const User = require("../../schemas/user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Une petite aide sur le fonctionnement du bot !"),
  async execute(interaction, client) {
    const user = interaction.user.id;
    // Dans chaque commande nécessitant le compte Kremaldy Games de celui ayant effectué la commande
    // Si l'utilisateur n'existe pas, on l'empêche de faire la commande
    const exists = await User.findOne({ memberId: user });
    let member = interaction.guild.members.cache.get(user);
    if (!exists) {
      await client.createUser(member);
      const userEmbed = new MessageEmbed()
        .setTitle(`Bienvenue dans Kremaldy Games !`)
        .setThumbnail(
          `https://cdn.discordapp.com/avatars/937797776748724284/6a22725d6655af54719373ba6f28ae14.png?size=256`
        )
        .setDescription(
          "Kremaldy Games est un bot vous permettant de collectionner et établir un commerce avec des personnages (créés selon les préférences des proches du développeur).\n\nPour cela, il vous suffit de tirer une carte avec /roll.\n\nSi vous n'avez jamais utilisé de commandes avec Kremaldy Games, vous n'avez certainement pas de compte Kremaldy Games, indispensable pour jouer.\n\nSi c'est le cas, nous vous en avons créé un. De rien.\n\nLe /marketplace présente tous les personnages considérés comme vendables.\n\nPour voir les détails d'un personnage, copiez son nom et collez le dans la commande /viewchara (Dans l'endroit 'character' fait pour ça.)\n\nUtilisez la commande /buy pour acheter un personnage.\n\nVous ne pouvez faire qu'un /roll par heure (Un roll coûte 100KC), mais certaines cartes tirées donnent des freerolls ! Attention, le prix d'un roll restera le même, freeroll ou non.\n\n/onsale permet de rendre un de vos personnages vendable (présent dans le marketplace) ou invendable.\n\nJe vous conseille d'utiliser /setvalue avant, pour définir le prix de vente minimum de votre personnage.\n\nNOUVEAUTÉ : N'hésitez surtout pas à vérifier le /changelog pour être au courant des dernières mises à jour du bot.\n\nAmusez-vous bien avec Kremaldy Games !"
        )
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        });
        // await interaction.reply("Un message a été envoyé dans vos MP !");
      await interaction.reply({ embeds: [userEmbed] });
      await interaction.editReply(userEmbed);
    //   await interaction.user.send({ embeds: [userEmbed] });

    } else if (exists) {
      const userEmbed = new MessageEmbed()
        .setTitle(`Bienvenue dans Kremaldy Games !`)
        .setThumbnail(
          `https://cdn.discordapp.com/avatars/937797776748724284/6a22725d6655af54719373ba6f28ae14.png?size=256`
        )
        .setDescription(
          "Kremaldy Games est un bot vous permettant de collectionner et établir un commerce avec des personnages (créés selon les préférences des proches du développeur).\n\nPour cela, il vous suffit de tirer une carte avec /roll.\n\nSi vous n'avez jamais utilisé de commandes avec Kremaldy Games, vous n'avez certainement pas de compte Kremaldy Games, indispensable pour jouer.\n\nSi c'est le cas, nous vous en avons créé un. De rien.\n\nLe /marketplace présente tous les personnages considérés comme vendables.\n\nPour voir les détails d'un personnage, copiez son nom et collez le dans la commande /viewchara (Dans l'endroit 'character' fait pour ça.)\n\nUtilisez la commande /buy pour acheter un personnage.\n\nVous ne pouvez faire qu'un /roll par heure (Un roll coûte 100KC), mais certaines cartes tirées donnent des freerolls ! Attention, le prix d'un roll restera le même, freeroll ou non.\n\n/onsale permet de rendre un de vos personnages vendable (présent dans le marketplace) ou invendable.\n\nJe vous conseille d'utiliser /setvalue avant, pour définir le prix de vente minimum de votre personnage.\n\nAmusez-vous bien avec Kremaldy Games !"
        )
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        });
        // await interaction.reply("Un message a été envoyé dans vos MP !");
      await interaction.reply({ embeds: [userEmbed] });
      await interaction.editReply(userEmbed);
    //   await interaction.user.send({ embeds: [userEmbed] });
    }
  },
};
