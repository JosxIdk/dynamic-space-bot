const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "purge";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Clears an amount of messages";
    this.usage = "purge (user) | (amount)";
  }
  async run(client, message, args) {
    let prefix = await client.prefix(message);
    let member = message.mentions.members.first();

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

    if (member) {
      const messages = message.channel.messages.fetch();
      const userMessages = (await messages).filter(
        (m) => m.author.id === member.id
      );

      await message.channel.bulkDelete(userMessages);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `<a:OK:970416703458664488> ***${member} messages has been cleared.***`
            )
            .setColor("GREEN"),
        ],
      });
    } else {
      let mensajes = parseInt(args[0]);
      if (!mensajes)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                "<a:fail:970412936763957338> ***Please provide a amount of messages to delete, it needs to be a number***"
              )
              .setColor(16711680),
          ],
        });
      if (mensajes < 1)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                "<a:fail:970412936763957338> ***The arguments provided are not correctly, the amount of messages must be greater than 1***"
              )
              .setColor(16711680),
          ],
        });
      let embedlimitmessages = new Discord.MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***You can't delete more than 100 messages**"
        )
        .setColor(16711680);
      if (mensajes > 99)
        return message.channel.send({ embeds: [embedlimitmessages] });
      let embed = new Discord.MessageEmbed()
        .setDescription(
          `<a:OK:970416703458664488> ***I deleted ${mensajes} messages successfully!***`
        )
        .setColor("GREEN");
      message.channel
        .bulkDelete(mensajes + 1)
        .then(message.channel.send({ embeds: [embed] }));
    }
  }
};
