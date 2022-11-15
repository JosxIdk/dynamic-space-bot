const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("This command show you all commands"),
  async execute(interaction, client) {
    let moderation = Array.from(interaction.client.comandos.filter((command) => command.category === "Moderation").keys()).join(' | ')
    let music = Array.from(interaction.client.comandos.filter((command) => command.category === "Music").keys()).join(' | ')
    let start = Array.from(interaction.client.comandos.filter((command) => command.category === "Start").keys()).join(' | ')
    let utility = Array.from(interaction.client.comandos.filter((command) => command.category === "Utility").keys()).join(' | ')
    let configuration = Array.from(interaction.client.comandos.filter((command) => command.category === "Configuration").keys()).join(' | ')
    const embed = new MessageEmbed()
      .setTitle(`Bot Commands`)
      .addField("**Moderation Commands:**", moderation || "Doesn't have commands")
      .addField("**Music Commands:**", music || "Doesn't have commands")
      .addField("**Configuraton Commands:**", configuration || "Doesn't have commands")
      .addField("**Utility Commands:**", utility || "Doesn't have commands")
      .addField("**Start Commands:**", start || "Doesn't have commands")
      .setColor("#36393F");
      interaction.reply({ embeds: [embed] })
  },
};
