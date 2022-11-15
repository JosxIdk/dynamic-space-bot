const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "guildinfo";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Shows a guild's info";
    this.usage = "guildinfo";
  }
  async run(client, message, args) {
      console.log(message.guild)
    const embed = new Discord.MessageEmbed()
    .addField("🆔 Guild ID: ", `${message.guild.id}`, true)
    .addField(`👤 Guild name: `, `${message.guild.name}`, true)
    .addField("📅 Guild created since: ", `<t:${parseInt(message.guild.createdAt / 1000)}>`, true)
    .addField("🙌 Boost level: ", `${message.guild.premiumTier}`, true)
    .addField("‍🍳 Member count: ", `${message.guild.memberCount}`, true)
    .addField("🚩 Owner: ", `<@${message.guild.ownerId}>`, true)
    .addField("🤖 MFA Level: ", `${message.guild.mfaLevel}`, true)
    .setColor("#FF8C00")
    .setThumbnail(message.guild.iconURL({ dynamic: true}))
    message.channel.send({ embeds: [embed] })
  }
};
