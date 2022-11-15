const Discord = require('discord.js')
module.exports = async (client, oldMember, newMember) => {
    const channel = client.channels.cache.get('970211413199052820')

      const oldStatus = oldMember.premiumSince;
      const newStatus = newMember.premiumSince;

      if(!oldStatus && newStatus){
        const embed = new Discord.MessageEmbed()
        .setTitle("The server has been boosted!")
        .setDescription(`${newMember.user.username} has boosted the server!`)
        .setImage("https://cdn.discordapp.com/attachments/861336862508711946/970344723363557406/serverboosted.gif")
        .setFooter("SB Boost Detection", client.user.displayAvatarURL())
        channel.send({ embeds: [embed]})  
      }
  };
  