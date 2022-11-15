const Discord = require("discord.js");
const Command = require('../../Utils/Command');

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "help";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Shows the help panel";
    this.usage = "help"
  }
  async run(client, message, args) {
    let prefix = await client.prefix(message);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Server: ${message.guild}`)
      .setDescription(
        `${client.user} commands in this server starts with \`/ (Slash Commands)\``
      )
      .addField(
        "Important Information",
        `To check that all its working correctly, please use \`/setup\` and to get all the bot commands, use: \`/commands\``
      )
      .setColor("#36393F")


    message.channel.send({ embeds: [embed] });
  }
};
