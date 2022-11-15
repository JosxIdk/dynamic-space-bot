const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "unlock";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Unlocks a channel";
    this.usage = "unlock";
  }
  async run(client, message, args) {
    const everyone = message.guild.roles.cache.get(message.guild.id);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***I don't have the neccessary permissions***"
            )
            .setColor(16711680),
        ],
      });

    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***I don't have the neccessary permissions***"
            )
            .setColor(16711680),
        ],
      });

    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***You don't have the neccessary permissions to do that***"
            )
            .setColor(16711680),
        ],
      });

    message.channel.permissionOverwrites.edit(everyone, {
      SEND_MESSAGES: true,
    });
    await message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            "<a:OK:970416703458664488> ***I unlocked the channel successfully***"
          )
          .setColor("GREEN"),
      ],
    });
  }
};
