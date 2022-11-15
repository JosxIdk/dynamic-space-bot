const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guildinfo")
    .setDescription("guildinfo command"),
  async execute(interaction) {

    const embed = new MessageEmbed()
    .addField("🆔 Guild ID: ", `${interaction.guild.id}`, true)
    .addField(`👤 Guild name: `, `${interaction.guild.name}`, true)
    .addField("📅 Guild created since: ", `<t:${parseInt(interaction.guild.createdAt / 1000)}>`, true)
    .addField("🙌 Boost level: ", `${interaction.guild.premiumTier}`, true)
    .addField("‍🍳 Member count: ", `${interaction.guild.memberCount}`, true)
    .addField("🚩 Owner: ", `<@${interaction.guild.ownerId}>`, true)
    .addField("🤖 MFA Level: ", `${interaction.guild.mfaLevel}`, true)
    .setColor("#FF8C00")
    .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
    interaction.reply({ embeds: [embed] })
  },
};
