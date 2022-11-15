const Discord = require("discord.js");
const prefixSchema = require("../../Db/Models/prefix");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "setprefix";
    this.aliases = [];
    this.category = "Configuration";
    this.description = "Changes the prefix";
    this.usage = "setprefix {prefix}";
  }
  async run(client, message, args) {
    let perms = message.member.permissions.has("ADMINISTRATOR");
    if (!perms)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***You don't have the neccessary permissions to do that***`
            )
            .setColor(16711680),
        ],
      });

    let res = await args.join(" ");
    if (!res)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please provide a new prefix***"
            )
            .setColor(16711680),
        ],
      });

    if (res.length > 3)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***The prefix cannot exceed 3 characters***"
            )
            .setColor(16711680),
        ],
      });

    prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) data.delete();
      data = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res,
      });
      data.save();
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:OK:970416703458664488> ***Your prefix has been changed to: ${res}***`
            )
            .setColor("GREEN"),
        ],
      });
      if (!data) {
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:OK:970416703458664488> ***Your prefix has been changed to: ${res}***`
              )
              .setColor("GREEN"),
          ],
        });
      }
    });
  }
};
