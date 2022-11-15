const Discord = require("discord.js");
const Command = require('../../Utils/Command');

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "commands";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Shows the command pannel";
    this.usage = "commands"
  }
  async run(client, message, args) {
    let moderation = Array.from(client.comandos.filter((command) => command.category === "Moderation").keys()).join(' | ')
    let music = Array.from(client.comandos.filter((command) => command.category === "Music").keys()).join(' | ')
    let start = Array.from(client.comandos.filter((command) => command.category === "Start").keys()).join(' | ')
    let utility = Array.from(client.comandos.filter((command) => command.category === "Utility").keys()).join(' | ')
    let configuration = Array.from(client.comandos.filter((command) => command.category === "Configuration").keys()).join(' | ')
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bot Commands`)
      .addField("**Moderation Commands:**", moderation)
      .addField("**Music Commands:**", music)
      .addField("**Configuraton Commands:**", configuration)
      .addField("**Utility Commands:**", utility)
      .addField("**Start Commands:**", start)
      .setColor("#36393F");

    message.channel.send({ embeds: [embed] });
  }
};
