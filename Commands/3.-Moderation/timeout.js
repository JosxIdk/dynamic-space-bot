const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "timeout";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Timeouts a user";
    this.usage = "timeout {user} {time} {reason}"
  }
  async run(client, message, args) {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***You dont have the neccessary permissions!***"
            )
            .setColor(16711680),
        ],
      });
    if (!message.guild.me.permissions.has("ADMINISTRATOR"))
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***I don't have the neccessary permissions, please check if my role is above everyone and i have the permission Administrator***"
            )
            .setColor(16711680),
        ],
      });

    var member = message.mentions.members.first();
    if (!member)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please specify a member***"
            )
            .setColor(16711680),
        ],
      });

    let time = args[1];
    let timeToAdd = ms(time)
    if (!timeToAdd) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please specify a valid time***"
            )
            .setColor(16711680),
        ],
      });
    }

    let razon = args.slice(2).join(" ");
    if (!razon)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***Please write a reason***"
            )
            .setColor(16711680),
        ],
      });

    if (member.id === message.author.id)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `<a:fail:970412936763957338> ***You cant mute yourself***`
            )
            .setColor(16711680),
        ],
      });

      client.modlogs(
        {
           Member: member,
           Action: "Timeout",
           Reason: razon
        },
           message
         );

      
        member.timeout(timeToAdd)

        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `<a:OK:970416703458664488> ***${member} was timed out successfully!***`
              )
              .setColor("GREEN"),
          ],
        });
  }
};
