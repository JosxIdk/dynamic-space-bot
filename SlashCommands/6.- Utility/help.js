const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("help command"),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTitle(`Server: ${interaction.guild}`)
      .setDescription(
        `SB Moderation commands in this server starts with \`/ (Slash Commands)\``
      )
      .addField(
        "Important Information",
        `To check that all its working correctly, please use \`/setup\` and to get all the bot commands, use: \`/commands\``
      )
      .setColor("#36393F")
      .setImage(
        "https://cdn.discordapp.com/attachments/861336862508711946/970131097717473300/standard.gif"
      );

      interaction.reply({ embeds: [embed] })
  },
};
