const { SlashCommandBuilder } = require("@discordjs/builders");
const { InteractionResponseType } = require("discord-api-types/v9");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Card = require("../../schemas/card");
const User = require("../../schemas/user");
const Tresor = require("../../schemas/tresor");
const Perso = require("../../schemas/perso");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command"),
  async execute(interaction, client) {
    console.log("pas de test")
  },
};
