const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "deny-suggest";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Suggest something";
    this.usage = "deny-suggest {suggestion}";
  }
  async run(client, message, args) {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
    const messageID = args[0];
    const denySuggest = args.slice(1).join(" ")

    if(!messageID) return message.reply({ embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> Please specify a Message ID`)]})
    if(!denySuggest) return message.reply({ embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> Please specify a reason`)]})
    try{
        const suggestionChannel = message.guild.channels.cache.get("969185703932080188");
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
        console.log(suggestedEmbed)
        const data = suggestedEmbed.embeds[0]
        const denyEmbed = new Discord.MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("RED")
        .addField('Status (DENIED)', denySuggest)

        suggestedEmbed.edit({embeds:[denyEmbed]});

        const user = await client.users.cache.find((u) => u.tag === data.author.name);
        user.send({ embeds: [new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> Your suggestion has been denied by ${message.author}!`).setImage("https://cdn.discordapp.com/attachments/861336862508711946/970552153284423690/banner-denegado-en-fondo-blanco-198868034.jpg")]})
    } catch(err){
      console.log(err)
        message.channel.send({ embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> That suggestion doesn't exists`)]})
    }
  }
};
