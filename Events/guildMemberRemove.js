const Canvas = require('myteamscanvas')
const Discord = require('discord.js')
module.exports = async (client, member) => {

    const channel = client.channels.cache.get('969830766177574962')
    
    const image = await new Canvas.Goodbye()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(member.guild.name)
    .setAvatar(member.user.displayAvatarURL({ format: 'png'}))
    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .setColor("avatar", "#8015EA")
    .setBackground("https://cdn.wallpapersafari.com/53/88/SBpLfJ.jpg")
    .toAttachment();
  
  const attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
  

    channel.send({ content: `Goodbye ${member}!`, files: [attachment] });
  };
  