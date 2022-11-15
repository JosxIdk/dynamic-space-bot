const Discord = require("discord.js");
const { splitMessage } = require('discord.js')
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "banlist";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Shows the bans list";
    this.usage = "banlist";
  }
  async run(client, message, args) {
    let perms = message.guild.me.permissions.has("BAN_MEMBERS")
    if (!perms) return message.reply({ content: "<a:fail:970412936763957338> | I don't have permissions"}).then(m => m.delete({ timeout: 6000 })); 
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply({ content: '<a:fail:970412936763957338> | You need the `BAN_MEMBERS` permission to see the list of bans.'}).then(m => m.delete({ timeout: 6000 }));
    
    var blist = await message.guild.bans.fetch(); 
    if(blist.size <= 0) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription("<a:fail:970412936763957338> | There are no bans on the server.").setColor(16711680)]}) 
    var bansID = blist.map(b => '**'+b.user.username +'**: '+ b.user.id).join('\n')
    const description = '**📌 User and ID:** \n'+bansID 
    
    let embed = new Discord.MessageEmbed() 
    .setColor("#FF8000")
    .setTitle('<a:Banned:767086512952967168> | **'+message.guild.name+'** bans')
    .setDescription(description)
    .setFooter('Requested by: '+message.author.username, message.author.displayAvatarURL())
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
    
    const splitDescription = splitMessage(description, {
        maxLength: 2048,
        char: "\n",
        prepend: "",
        append: ""
    }); 
    
    splitDescription.forEach(async (m) => {
        embed.setDescription(m);
        message.channel.send({ embeds: [embed]})
    })
  }
};