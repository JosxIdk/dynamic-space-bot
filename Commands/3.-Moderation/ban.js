const Discord = require("discord.js");
const db = require("../../Db/Models/case");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "ban";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Bans a user";
    this.usage = "ban {user} {reason}";
  }
  async run(client, message, args) {
    let user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    var perms = message.member.permissions.has("BAN_MEMBERS");
    if (!perms)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***You don't have the neccessary permissions to ban members.***"
            )
            .setColor(16711680),
        ],
      });

    if (!user)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please provide a user to ban***"
            )
            .setColor(16711680),
        ],
      });

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

    if (!reason)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please provide a reason to ban the member***"
            )
            .setColor(16711680),
        ],
      });

    if (user.id === message.author.id)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***You cant ban yourself***`
            )
            .setColor(16711680),
        ],
      });

    if (!message.guild.members.cache.get(user.id).bannable)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***This user its not bannable***`
            )
            .setColor(16711680),
        ],
      });

    const guild = message.guild;
    const icons = guild.iconURL();

    const embed = new Discord.MessageEmbed()
      .setAuthor(`You have been banned of the server: ${message.guild}`, icons)
      .addField("***Reason:***", `${reason}`)
      .setColor("#FF8000");
    user.send({ embeds: [embed] }).catch((error) => {
      return;
    });

    client.modlogs(
      {
         Member: user,
         Action: "Ban",
         Reason: reason
      },
         message
       );


    message.guild.members.cache
      .get(user.id)
      .ban({ days: 7, reason: `${reason}` });

    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            `<:si:860978510079852544> ***${user} has been banned successfully***`
          )
          .setColor("GREEN"),
      ],
    });
  }
};
