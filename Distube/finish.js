const Discord = require("discord.js");
module.exports = {
  name: "finish",
  once: true,
  async execute(queue) {
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            "<:warn:838809279287918684> ***There are no more songs in the queue! Leaving the voice channel.***"
          )
          .setColor("YELLOW"),
      ],
    });
  },
};
