const Discord = require("discord.js");
const MC = require('minecraft-information')
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "mcprofile";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Shows a user minecraft avatar";
    this.usage = "mcavatar (user[String])";
  }
  async run(client, message, args) {

    const username = args[0]

    if(!username) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`<a:fail:970412936763957338> ***Put a valid user!***`)
        .setColor(16711680)
        return message.channel.send({ embeds: [embed] })
    }

    try{
      const skin = await MC.skin(`${username}`)
      const avatar = await MC.avatar(`${username}`)
      const user = await MC.profile(`${username}`)      

      const embed = new Discord.MessageEmbed()
      .setTitle('Player info')
      .addField('Name: ', `${user}`)
      message.channel.send({ embeds: [embed]})
    } catch(e){
      return message.channel.send({ content: "This player doesn't exists"})
    }
  }
}