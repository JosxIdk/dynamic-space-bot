const Discord = require("discord.js");
const Command = require('../../Utils/Command');

module.exports = class extends Command {
 constructor(options) {
   super(options);
   this.name = "volume";
   this.aliases = [];
   this.category = "Music";
   this.description = "Sets the volume";
   this.usage = "volume {volume}"
 }
  async run(client, message, args, distube) {
    let noVoice = new Discord.MessageEmbed()
      .setDescription(
        "<a:fail:970412936763957338> ***You need to be in a voice channel to execute this command***"
      )
      .setColor(16711680);

    if (message.guild.me.voice.channel) {
      if (message.member.voice.channel !== message.guild.me.voice.channel)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                "<a:fail:970412936763957338> ***You need to be in the same channel as me***"
              )
              .setColor(16711680),
          ],
        });
    }

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send({ embeds: [noVoice] });
    let queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***There are no songs in the queue***"
            )
            .setColor(16711680),
        ],
      });

    if (!args[0])
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(`<a:fail:970412936763957338> ***Specify the volume***`)
            .setColor(16711680),
        ],
      });

    if (isNaN(args[0]))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***Specify a valid number***`
            )
            .setColor(16711680),
        ],
      });

    let number = parseInt(args[0]);
    if (number > 200 || number <= 0)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***The volume must be greater than 0 and less than 200******`
            )
            .setColor(16711680),
        ],
      });

    distube.setVolume(message, number);
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            `<a:OK:970416703458664488> ***The volume has been stablished to ${number}%***`
          )
          .setColor("YELLOW"),
      ],
    });
  }
};
