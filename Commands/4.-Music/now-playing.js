const Discord = require("discord.js");
const Command = require("../../Utils/Command");
require("moment-duration-format");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "now-playing";
    this.aliases = [];
    this.category = "Music";
    this.description = "Shows the information of a music";
    this.usage = "now-playing";
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

    let song = queue.songs[0];

    const moment = require("moment");
    let wan = moment
      .duration(client.distube.getQueue(message).currentTime, "seconds")
      .format("mm:ss");
    let todx = moment
      .duration(client.distube.getQueue(message).songs[0].duration, "seconds")
      .format("mm:ss");
    let porcentaje = parseInt(
      (queue.currentTime / queue.songs[0].duration) * 100
    );

    function createBar(
      total,
      current,
      size = 15,
      line = "▬",
      slider = "<a:pokeball:790804838174031932>"
    ) {
      if (current > total) {
        const bar = line.repeat(size + 2);
        const percentage = (current / total) * 100;
        return [bar, percentage];
      } else {
        const percentage = current / total;
        const progress = Math.round(size * percentage);
        const emptyProgress = size - progress;
        const progressText = line.repeat(progress).replace(/.$/, slider);
        const emptyProgressText = line.repeat(emptyProgress);
        const bar = progressText + emptyProgressText;
        const calculated = percentage * 100;
        return [bar, calculated];
      }
    }

    const status = (queue) =>
      `Volume: \`${queue.volume}%\` | Filter: \`${
        queue.filter || "Off"
      }\` | Loop: \`${
        queue.repeatMode
          ? queue.repeatMode == 2
            ? "All Queue"
            : "This song"
          : "Off"
      }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    const embed_success = new Discord.MessageEmbed()
      .setTitle('Playing song')
      .setDescription(
        `**Information:**\n\`Song:\` **__[${song.name}](${song.url})__**\n\`Duration:\` ${song.formattedDuration}\n\`Requested by:\` ${song.user}\n\`Likes:\` ${song.likes}\n\`Related suggestions:\` **__[${song.related[0].name}](${song.related[0].url})__**`
      )
      .addField(
        ":pushpin: Progress Bar:",
        `**[${
          createBar(song.duration, queue.currentTime)[0]
        }]** *(${porcentaje}%)*\n\`------------‎${wan} / ${todx}------------\``
      )
      .addField(":microphone2: Status:", `${status(queue)}`)
      .setThumbnail(`${song.thumbnail}`)
      .setColor("YELLOW");
    await message.channel.send({ embeds: [embed_success] });
  }
};
