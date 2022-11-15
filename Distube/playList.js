const Discord = require("discord.js");
module.exports = {
  name: "playList",
  once: true,
  async execute(message, queue, playlist) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Playing the playlist **__(${playlist.name} - ${playlist.songs.length})[${playlist.url}]__**`
      )
      .setColor("YELLOW");

    message.channel.send(embed);
  },
};
