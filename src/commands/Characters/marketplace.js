const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const User = require("../../schemas/user");
const Perso = require("../../schemas/perso");

const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marketplace")
    .setDescription("Le marché des personnages vendables."),
  async execute(interaction, client) {
    // Cette commande n'a pas besoin d'avoir de compte Kremaldy Games
    let persoOnSale = await Perso.find({ onSale: 1});
    console.log(persoOnSale);
  },
};
