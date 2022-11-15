const db = require("../../Db/Models/case");
const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "remove-warns";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Removes the warns of a user";
    this.usage = "remove-warns {user}"
  }
  async run(client, message, args) {
    let member = message.mentions.members.first();
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***You don't have the neccessary permissions to do that!***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    if (!member) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***Please mention a member***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    db.findOne(
      { guildid: message.guild.id, user: member.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          await db.findOneAndDelete({
            user: member.id,
            guildid: message.guild.id,
          });

          message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(
                  "<a:OK:970416703458664488> ***The cases of the mentioned user has been deleted successfully***"
                )
                .setColor("GREEN"),
            ],
          });
        } else {
          message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(
                  `<a:fail:970412936763957338> ***This user has no cases registered!***`
                )
                .setColor(16711680),
            ],
          });
        }
      }
    );
  }
};
