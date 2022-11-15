const Discord = require("discord.js");
const db = require("../../Db/Models/password");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "getPass";
    this.aliases = [];
  }
  async run(client, message, args) {
    if (![message.guild.ownerId].includes(message.author.id))
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***This command can only be executed by the server owner***"
            )
            .setColor(16711680),
        ],
      });
    db.findOne({ guild: message.guild.id }, async (err, data) => {
      if (!data)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                "<a:fail:970412936763957338> ***This server its not in my database, please re-invite me to get a password***"
              )
              .setColor(16711680),
          ],
        });

      if (data) {
        try {
          message.author.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(`<a:OK:970416703458664488> ||${data.password}||`)
                .setColor("GREEN"),
            ],
          });

          message.react("✅");
        } catch (error) {
          console.log(error.message);
          message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(
                  "<a:fail:970412936763957338> ***Please open your dms***"
                )
                .setColor(16711680),
            ],
          });
        }
      }
    });
  }
};
