const Discord = require("discord.js");
module.exports = {
  name: "addList",
  once: true,
  async execute(queue, playlist) {
    const embedAddList = new Discord.MessageEmbed()
      .setAuthor(
        "PlayList added to the Queue",
        playlist.user.displayAvatarURL()
      )
      .addField(":dvd: Name:", `${playlist.name}`)
      .addField(":radio: Number of Songs:", `${playlist.songs.length}`)
      .addField(":bust_in_silhouette: Requested By:", `${playlist.user}`)
      .setColor("YELLOW");

    queue.textChannel.send({ embeds: [embedAddList] });
  },
};
