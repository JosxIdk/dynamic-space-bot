const Discord = require("discord.js");
module.exports = {
  name: "addSong",
  once: true,
  async execute(queue, song) {
    const embedAddSong = new Discord.MessageEmbed()
      .setAuthor("Song Added to the Queue", song.user.displayAvatarURL())
      .addField(":dvd: Song:", `${song.name}`)
      .addField(":clock10: Duration", `${song.formattedDuration}`)
      .addField(":bust_in_silhouette: Requested By:", `${song.user}`)
      .setColor("YELLOW");

    queue.textChannel.send({ embeds: [embedAddSong] });
  },
};
