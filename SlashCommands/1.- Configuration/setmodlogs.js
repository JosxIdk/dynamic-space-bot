const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const channelSchema = require("../../Db/Models/modlogs");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setmodlogs")
    .setDescription("set a modlogs channel")  
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel to use")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const perms = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
    if(!perms){
        return interaction.reply(
            falseEmbed("You don't have the necessary permissions")
        )
    }

    if(!channel){
        return interaction.reply(
            falseEmbed("Please specify a valid channel")
        )
    }

    if(!interaction.guild.channels.cache.get(channel.id)){
      return interaction.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> | **The channel of the logs must be in this server.**`)]})
      }
      if(!channel.permissionsFor(client.user).has('VIEW_CHANNEL')){
      return interaction.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> | **I don't have permission to: \`VIEW_CHANNEL\` on the mentioned channel**`)]})
      }
      if(!channel.permissionsFor(client.user).has('SEND_MESSAGES')){
      return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> | **I don't have permission to: \`SEND_MESSAGES\` on the mentioned channel**`)]})
      }
      if(channel.type == 'voice' || channel.type == 'category'){
      return interaction.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> |**I can't set the logs channel to a \`Voice Channel\` or a \`Category Channel\`!**`)]})
      }

      channelSchema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(!data){
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
        }
        interaction.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:OK:970416703458664488> **The channel **${channel}** was set as the modlogs channel!**`)]})
    })
  },
};
