const Discord = require("discord.js");
const Command = require("../../Utils/Command");
const Canvas = require('canvas');

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "ship";
    this.aliases = [];
    this.category = "Fun";
    this.description = "Ships you with another user";
    this.usage = "ship (user)";
  }
  async run(client, message, args) {
    const canvas = Canvas.createCanvas(700,250);
    const ctx = canvas.getContext("2d");

    const user = message.mentions.users.first();
    if(!user) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("<a:fail:970412936763957338> Please mention someone")]})
    if(user.id == message.author.id) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("<a:fail:970412936763957338> Please mention someone else")]})

    const bg = await Canvas.loadImage("https://static.vecteezy.com/system/resources/previews/001/269/134/large_2x/pastel-pink-background-free-photo.jpg")
      ctx.drawImage(bg,0,0, canvas.width, canvas.height)

      const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png'}))
      ctx.drawImage(avatar,100,25,200,200)

      const targetAvatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png'}))
      ctx.drawImage(targetAvatar, 400,25,200,200)

      const heart = await Canvas.loadImage("https://img.freepik.com/vector-gratis/corazon-rojo-realista-sombra_177006-321.jpg?w=2000")
      const broken = await Canvas.loadImage("http://c.files.bbci.co.uk/13D13/production/_119017118_gettyimages-1224230288.jpg")
      const random = Math.floor(Math.random() * 99) + 1

      if(random >= 50){
        ctx.drawImage(heart,275,60,150,150)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new Discord.MessageEmbed()
        .setDescription(`:twisted_rightwards_arrows: ${message.author.username} + ${user.username} = ${random}%`)
        .setImage(`attachment://love.png`)
        .setColor("GREEN")
        return message.channel.send({ embeds: [embed], files:[attachment]})
      } else {
        ctx.drawImage(broken,275,60,150,150)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new Discord.MessageEmbed()
        .setDescription(`:twisted_rightwards_arrows: ${message.author.username} + ${user.username} = ${random}%`)
        .setImage(`attachment://love.png`)
        .setColor("GREEN")
        return message.channel.send({ embeds: [embed], files: [attachment]})
      }
  }
};
