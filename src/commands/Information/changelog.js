const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment, Message } = require("discord.js");
const User = require("../../schemas/user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Les dernières nouveautés du bot sont affichées ici."),
  async execute(interaction, client) {
      const userEmbed = new MessageEmbed()
        .setTitle(`Dernières nouveautés (0.7.3)`)
        .setThumbnail(
          `https://cdn.discordapp.com/avatars/937797776748724284/6a22725d6655af54719373ba6f28ae14.png?size=256`
        )
        .setDescription(
          "Nouveautés du 17 février 2022 :\n\n- Ajout de pagination sur la commande /balancetop\n\n- Quand on tire une carte contenant un personnage, et que celui-ci appartient déjà à quelqu'un, son maître ne sera plus mentionné.\nEn revanche, pour savoir qui est cette personne, copiez son identifiant et écrivez <@xxx> (remplacez xxx par l'identifiant copié) sans envoyer le message.\n\n- Les trésors sont entièrement supprimés du code. Vous avez tous reçu des freerolls correspondant à la valeur exacte (en rolls) de ces trésors depuis un moment.\n\n- Une monnaie secondaire, dont la valeur est volatile, a été ajoutée : le Greed Coin.\n/gcvalue pour voir sa valeur.\n/gcbalance pour voir votre solde en GC (et son estimation en KC)\n/invest pour obtenir des GC en utilisant vos KC.\n/retreive pour retirer des GC et les convertir en KC (Astuce : cette commande permet l'utilisation de nombres décimaux, utile quand on parle de GC.)\nNote : Vous prenez le risque de perdre des KC, donc si vous comptez exploiter le GC, faites attention à sa valeur le plus souvent possible.\nNote 2 : Oui, c'est une piètre manière de coder un semblant de cryptomonnaie dans un bot Discord, mais c'était marrant à faire.\n\nProchaines nouveautés :\nAucune idée. Je vais consacrer mes prochains jours à ajouter un maximum de personnages et de cartes possible."
        )
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [userEmbed] });
      await interaction.editReply(userEmbed);
    }

}