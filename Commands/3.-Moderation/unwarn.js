const db = require("../../Db/Models/case");
const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "unwarn";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Removes a warn of a user";
    this.usage = "unwarn {user} {number}";
  }
  async run(client, message, args) {
    var perms = message.member.permissions.has("ADMINISTRATOR");
    let member = message.mentions.members.first();

    if (!perms) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***You don't have the neccessary permissions to do that***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    if (!member) {
      const embed = new Discord.MessageEmbed()
        .setColor(16711680)
        .setDescription(
          "<a:fail:970412936763957338> ***You need to mention someone***"
        );
      return message.reply({ embeds: [embed] });
    }

    if (
      message.mentions.members.first().roles.highest.position >
      message.guild.members.resolve(message.author.id).roles.highest.position
    ) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***The mentioned user has highest role than you***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    if (!args[1]) {
      const embed = new Discord.MessageEmbed()
        .setColor(16711680)
        .setDescription(
          "<a:fail:970412936763957338> ***You need to provide a number of case of the user mentioned to delete***"
        );

      return message.reply({ embeds: [embed] });
    }
    db.findOne(
      { guildid: message.guild.id, user: member.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          let number = parseInt(args[1]) - 1;
          data.content.splice(number, 1);
          message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(
                  "<a:OK:970416703458664488> ***I deleted the case successfully***"
                )
                .setColor("GREEN"),
            ],
          });
          data.save();
        } else {
          message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(
                  "<a:fail:970412936763957338> ***The user has no cases in this server***"
                )
                .setColor(16711680),
            ],
          });
        }
      }
    );
  }
};
