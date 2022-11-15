const db = require("..//..//Db/Models/case");
const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = 'warn';
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Warns a user";
    this.usage = "warn {user} {reason}"
  }
  async run(client, message, args) {
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    var perms = message.member.permissions.has("KICK_MEMBERS");

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
      return message.channel.send({ embeds: [embed] });
    }

    if (!reason) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***Write a reason, use correct of the command: `warn @username [reason]`***"
        )
        .setColor(16711680);

      return message.channel.send({ embeds: [embed] });
    }

    db.findOne(
      { guildid: message.guild.id, user: member.user.id },
      async (err, data) => {
        if (err) throw err;
        if (!data) {
          data = new db({
            guildid: message.guild.id,
            user: member.user.id,
            content: [
              {
                moderator: message.author.tag,
                reason: reason,
              },
            ],
          });
        } else {
          const obj = {
            moderator: message.author.tag,
            reason: reason,
          };
          data.content.push(obj);
        }
        await data.save();
        const guild = message.guild;
        const icons = guild.iconURL();
        member.send({
          embeds: [
            new Discord.MessageEmbed()
              .setAuthor(
                `You have been warned of the server: ${message.guild}`,
                icons
              )
              .addField("***Reason:***", `${reason}`)
              .setColor("#FF8000"),
          ],
        });

        client.modlogs(
          {
             Member: member,
             Action: "Warn",
             Reason: reason
          },
             message
           );


        message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:OK:970416703458664488> ***${member} has been warned successfully!***`
              )
              .setColor("GREEN"),
          ],
        });
      }
    );
  }
};
