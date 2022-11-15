const Discord = require("discord.js");
const db = require("..//..//Db/Models/case");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = 'kick';
    this.aliases = [];
    this.category = 'Moderation';
    this.description = 'Kicks an user';
    this.usage = 'kick {user} {reason}'
  }
  async run(client, message, args) {
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(" ");

    var perms = message.member.permissions.has("KICK_MEMBERS");

    if (!perms) {
      const embed = new Discord.MessageEmbed()

        .setDescription(
          "<:no:860978971771928647> ***You dont have the necessary permissions to do that.***"
        )
        .setColor(16711680);

      return message.channel.send({ embeds: [embed] });
    }
    if (message.mentions.users.size < 1) {
      const embed = new Discord.MessageEmbed()

        .setColor(16711680)
        .setDescription(
          "<:no:860978971771928647> ***You need to tag an user.***"
        );

      return message.reply({ embeds: [embed] });
    }

    if (
      message.mentions.members.first().roles.highest.position >
      message.guild.members.resolve(message.author.id).roles.highest.position
    ) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<:no:860978971771928647> ***The mentioned user has highest role than you***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    if (user.id === message.author.id)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<:no:860978971771928647> ***You cant kick yourself***`
            )
            .setColor(16711680),
        ],
      });

    if (!razon) {
      const embed = new Discord.MessageEmbed()

        .setDescription(
          "<:no:860978971771928647> ***Write a reason to kick the user***"
        )
        .setColor(16711680);

      return message.channel.send({ embeds: [embed] });
    }

    if (
      message.mentions.members.first().roles.highest.position >
      message.guild.members.resolve(message.author.id).roles.highest.position
    ) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<:no:860978971771928647> ***The mentioned user has highest roles than you***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    if (!message.guild.members.cache.get(user.id).kickable) {
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<:no:860978971771928647> ***The mentioned user cannot be kicked***"
            )
            .setColor(16711680),
        ],
      });
    }

    const guild = message.guild;
    const icons = guild.iconURL();

    const embedWarn = new Discord.MessageEmbed()
      .setAuthor(`You have been kicked of the server: ${message.guild}`, icons)
      .addField("***Reason:***", `${razon}`)
      .setColor("#FF8000");
    user.send({ embeds: [embedWarn] }).catch((error) => {
      return;
    });

    client.modlogs(
      {
         Member: user,
         Action: "Kick",
         Reason: razon
      },
         message
       );


    message.guild.members.cache.get(user.id).kick(razon);

    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            `<:si:860978510079852544> ***${user} has been kicked successfully!***`
          )
          .setColor("GREEN"),
      ],
    });
  }
};
