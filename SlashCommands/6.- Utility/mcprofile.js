const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const MC = require('minecraft-information')
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcprofile")
    .setDescription("mcprofile command"),
  async execute(interaction) {
    const username = args.join(" ")

    if(!username) {
        return interaction.reply(
            falseEmbed("Put a valid user!")
        )
    }

    try{
      const skin = await MC.skin(`${username}`)
      const avatar = await MC.avatar(`${username}`)
      const user = await MC.profile(`${username}`)      

      const embed = new Discord.MessageEmbed()
      .setTitle('Player info')
      .addField('Name: ', `${user.name}`)
      interaction.reply({ embeds: [embed]})
    } catch(e){
      return interaction.reply({ content: "This player doesn't exists"})
    }
  },
};
