const Discord = require("discord.js");
module.exports = {
  name: "empty",
  once: true,
  async execute(queue) {
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            "<:warn:838809279287918684> ***Empty Voice Channel, leaving Voice Channel***"
          )
          .setColor("YELLOW"),
      ],
    });
  },
};
