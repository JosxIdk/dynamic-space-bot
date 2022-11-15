const Discord = require("discord.js");
module.exports = {
  name: "playSong",
  once: false,
  async execute(queue, song) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `<:music:847251710618894336> ***Playing __[${song.name}](${song.url})__ requested by ${song.user}***`
      )
      .setColor("YELLOW");

    queue.textChannel.send({ embeds: [embed] });
  },
};
