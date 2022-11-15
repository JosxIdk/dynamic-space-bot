const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "suggest";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Suggest something";
    this.usage = "suggest {suggestion}";
  }
  async run(client, message, args) {
    const suggestion = args.join(" ")
    await message.delete(suggestion, 5000)
    if(!suggestion) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("<a:fail:970412936763957338> Please specify a suggestion!")]})

    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    .setDescription(`**Suggestion**: ${suggestion}`)
    .setColor("ORANGE")
    .setTimestamp()
    .addField("Status", "Pending")

    message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("<a:OK:970416703458664488> Submitted suggestion!")]})
    message.guild.channels.cache.get("969185703932080188").send({ embeds: [embed]})
  }
};
