const Discord = require('discord.js')
module.exports = {
  name: "noRelated",
  once: true,
  async execute(queue) {
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
        .setDescription('<a:fail:970412936763957338> ***I have not found a song with that name.***')
        .setColor("YELLOW")
      ],
    })
  }
}