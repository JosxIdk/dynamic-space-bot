const Discord = require("discord.js");
const Command = require('../../Utils/Command');

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "queue";
    this.aliases = [];
    this.category = "Music";
    this.description = "Shows the server queue";
    this.usage = "queue";
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

    let currentPage = 0;
    const embeds = generateQueueEmbed(queue);
    const queueEmbed = await message.channel.send({
      content: `Current Page ${currentPage + 1}/${embeds.length}`,
      embeds: [embeds[currentPage]],
    });
    if (embeds.length > 1) {
      await queueEmbed.react("⏪");
      await queueEmbed.react("⏩");
      await queueEmbed.react("❌");
    }

    const filter = (reaction, user) =>
      ["⏪", "⏩", "❌"].includes(reaction.emoji.name) &&
      message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (user.bot) {
          return;
        } else {
          reaction.users.remove(user);
        }
      } catch (error) {
        console.log(error.message);
        return;
      }
      if (reaction.emoji.name === "⏩") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit({
            content: `Current Page: ${currentPage + 1}/${embeds.length}`,
            embeds: [embeds[currentPage]],
          });
        }
      } else if (reaction.emoji.name === "⏪") {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit({
            content: `Current Page ${currentPage + 1}/${embeds.length}`,
            embeds: [embeds[currentPage]],
          });
        }
      } else if (reaction.emoji.name === "❌") {
        collector.stop();
        await queueEmbed.delete();
      }
    });
  }
};

function generateQueueEmbed(queue) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.songs.length; i += 10) {
    const current = queue.songs.slice(i, k);
    let j = i;
    k += 10;
    const info = current
      .map(
        (song) =>
          `${++j} [${song.name}](${song.url}) - ${song.formattedDuration}`
      )
      .join("\n");
    const embed = new Discord.MessageEmbed()
      .setTitle(":dvd: Queue")
      .setDescription(`${info}`)
      .setColor("YELLOW");
    embeds.push(embed);
  }
  return embeds;
}
