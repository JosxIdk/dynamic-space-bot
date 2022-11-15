const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "play";
    this.aliases = [];
    this.category = "Music";
    this.description = "Plays a song";
    this.usage = "play {song}";
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

    const song = args.join(" ")
    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send({ embeds: [noVoice] });

    if (!song)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            "<a:fail:970412936763957338> ***Provide a song to play***"
          )
          .setColor(16711680)
      );

    if (!message.guild.me.voice.channel) {
      message.channel.send(
        `:mailbox_with_no_mail: ***Joining Voice Channel: ${voiceChannel}***`
      );
    }

    message.channel
      .send(
        `<:yt:847256714239148042> ***Searching the song: ${song}***`
      )
      .then(distube.play(message, song, voiceChannel));
  }
};
