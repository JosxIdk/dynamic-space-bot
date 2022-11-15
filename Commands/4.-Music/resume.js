const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "resume";
    this.aliases = [];
    this.category = "Music";
    this.description = "Resumes a music";
    this.usage = "resume";
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
    const queue = await distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***There are no songs in the queue!***"
            )
            .setColor(16711680),
        ],
      });
    distube.resume(message);
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            `<a:OK:970416703458664488> ***The song ${queue.songs[0].name} has been resumed!***`
          )
          .setColor("YELLOW"),
      ],
    });
  }
};
