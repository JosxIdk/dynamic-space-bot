const Discord = require("discord.js");
const Schema = require("../../db/models/modlogs")
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "setmodlogs";
    this.aliases = [];
    this.category = "Configuration";
    this.description = "Set the modlogs channel";
    this.usage = "setmodlogs {channel}";
  }
  async run(client, message, args) {
    const perms = message.member.permissions.has("ADMINISTRATOR");
    if(!perms) return message.channel.send({embeds:[new Discord.MessageEmbed()
        .setDescription("<a:fail:970412936763957338> | **You don't have ADMINISTRATOR perms to do that** ")
        .setColor(16711680)]}
    )

    const channel = message.mentions.channels.first()
    if(!channel) return message.channel.send({embeds:[new Discord.MessageEmbed()
        .setDescription("<a:fail:970412936763957338> | **Mention a channel.**")
        .setColor(16711680)]}
    )


    if(!message.guild.channels.cache.get(channel.id)){
return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> | **The channel of the logs must be in this server.**`)]})
}
if(!channel.permissionsFor(client.user).has('VIEW_CHANNEL')){
return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> | **I don't have permission to: \`VIEW_CHANNEL\` on the mentioned channel**`)]})
}
if(!channel.permissionsFor(client.user).has('SEND_MESSAGES')){
return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> | **I don't have permission to: \`SEND_MESSAGES\` on the mentioned channel**`)]})
}
if(channel.type == 'voice' || channel.type == 'category'){
return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:fail:970412936763957338> |**I can't set the logs channel to a \`Voice Channel\` or a \`Category Channel\`!**`)]})
}


    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(!data){
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
            }).save();
        }
        message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`<a:OK:970416703458664488> **The channel **${channel}** was set as the modlogs channel!**`)]})
    })
  }
};
