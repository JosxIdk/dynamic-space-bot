const Discord = require("discord.js");
const clearChannel = require("../../Functions/clearChannel");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "clear-channel";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Clears the entire messages of a channel";
    this.usage = "clear-channel {confirmation}"
  }
  async run(client, message, args) {
    const prefix = await client.prefix(message);
    if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***I don't have the necessary permissions to do that, please use the command \`${prefix}setup\` to check all it's working correctly.***`
            )
            .setColor(16711680),
        ],
      });

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***You don't have the necessary permissions to do that.***"
            )
            .setColor(16711680),
        ],
      });

    if (!args[0])
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please confirm the action using the argument: --yes***"
            )
            .setColor(16711680),
        ],
      });

    if (args[0] === "--yes") {
      message.delete();
      message.channel
        .send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                "<a:cargando:847302831186247751> ***Deleting the entire channel messages...***"
              )
              .setColor("ORANGE"),
          ],
        })
        .then((_) => {
          (async () => {
            clearChannel(message.channel);
            await message.channel.send({
              embeds: [
                new Discord.MessageEmbed()
                  .setDescription(
                    "<a:OK:970416703458664488> ***All the channel messages were deleted successfully!***"
                  )
                  .setColor("GREEN"),
              ],
            });
          })();
        });
    }
  }
};
