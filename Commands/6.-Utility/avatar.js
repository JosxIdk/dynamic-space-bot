const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "avatar";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Shows a user avatar";
    this.usage = "avatar (user)";
  }
  async run(client, message, args) {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `[Download Avatar](${user.displayAvatarURL({
          format: "png",
          dynamic: true,
        })})`
      )
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor("RANDOM")
      .setFooter(`Avatar requested by: ${message.author}`);
    message.channel.send({ embeds: [embed] });
  }
};
