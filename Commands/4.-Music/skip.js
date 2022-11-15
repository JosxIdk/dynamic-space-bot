const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "skip";
    this.aliases = [];
    this.category = "Music";
    this.description = "Skips a music";
    this.usage = "skip";
  }
  async run(client, message, args, distube) {
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

    if (message.member.voice.channel.members.size === 2) {
      await distube.skip(message);
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<a:OK:970416703458664488> ***I skipped the song successfully***"
        )
        .setColor("YELLOW");

      return message.channel.send({ embeds: [embed] });
    }

    const map = client.skipvote;
    const mapload = map.get(message.guild.id);

    if (mapload) {
      if (mapload.users.includes(message.author.id))
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                "<a:fail:970412936763957338> ***You already voted to skip the song***"
              )
              .setColor(16711680),
          ],
        });
      await mapload.users.push(message.author.id);

      if (mapload.users.length > 1) {
        let skipNumber =
          1 + parseInt(message.member.voice.channel.members.size / 2);
        message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:OK:970416703458664488> ***${message.author} has voted to skip actual song (${mapload.users.length}/${skipNumber})***`
              )
              .setColor("YELLOW"),
          ],
        });
      }

      const number = parseInt(message.member.voice.channel.members.size / 2);

      if (mapload.users.length < number) return;

      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:OK:970416703458664488> ***The actual song was skipped by vote***"
            )
            .setColor("YELLOW"),
        ],
      });

      await distube.skip(message).then(map.clear());
    } else {
      const listUser = {
        users: [],
      };
      await map.set(message.guild.id, listUser);
      await listUser.users.push(message.author.id);

      let skipNumber = parseInt(message.member.voice.channel.members.size / 2);

      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<:warn:838809279287918684> ***${message.author} started a new voting to skip actual song. It take(s) ${skipNumber} vote(s) to skip the song.***`
            )
            .setColor("YELLOW"),
        ],
      });
    }
  }
};
