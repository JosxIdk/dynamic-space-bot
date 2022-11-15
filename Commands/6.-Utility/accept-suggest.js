const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "accept-suggest";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Accept a suggestion!";
    this.usage = "accept-suggest";
  }
  async run(client, message, args) {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
    const messageID = args[0];
    const acceptSuggest = args.slice(1).join(" ")

    if(!messageID) return message.reply({ embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> Please specify a Message ID`)]})
    if(!acceptSuggest) return message.reply({ embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> Please specify a reason`)]})
    try{
        const suggestionChannel = message.guild.channels.cache.get("969185703932080188");
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
        console.log(suggestedEmbed)
        const data = suggestedEmbed.embeds[0]
        const acceptEmbed = new Discord.MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("GREEN")
        .addField('Status (ACCEPTED)', acceptSuggest)

        suggestedEmbed.edit({embeds:[acceptEmbed]});

        const user = await client.users.cache.find((u) => u.tag === data.author.name);
        user.send({ embeds: [new Discord.MessageEmbed().setDescription(`<a:OK:970416703458664488> Your suggestion has been accepted by ${message.author}!`)]})
    } catch(err){
      console.log(err)
        message.channel.send({ embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> That suggestion doesn't exists`)]})
    }
  }
};
