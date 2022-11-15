const Discord = require("discord.js");
const Command = require('../../Utils/Command');

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "setup";
    this.aliases = [];
    this.category = "Start";
    this.description = "Shows the bot permissions"
  }
  async run(client, message, args) {
    const Logs = require("../../Db/Models/logs");
    const Log = await Logs.findOne({ guild: message.guild.id });
    const modlogsSchema = require("../../Db/Models/modlogs");
    const data = await modlogsSchema.findOne({ Guild: message.guild.id });

    const embed = new Discord.MessageEmbed()
      .setTitle("Dynamic Space Quick Setup")
      .setColor("#36393F");

    const newEmbed = new Discord.MessageEmbed()
      .setTitle("Dynamic Space Quick Setup Failed")
      .setColor("#36393F");

    try {
      let botPerms = message.guild.me.permissions.has("ADMINISTRATOR");

      if (!botPerms) {
        newEmbed.addField(
          "<a:fail:970412936763957338> Checking bot's permissions",
          "Details: The bot must have the permission: `ADMINISTRATOR`"
        );
       return message.channel.send({ embeds: [newEmbed] });
      } else {
        embed.addField(
          "<a:OK:970416703458664488> Checking bot permissions",
          "Bot permissions are correctly working"
        );
      }
    } catch (error) {
      embed.addField(
        "<a:fail:970412936763957338> An error ocurred",
        "Please contact us if error persist"
      );
    }

    try {
      let highestRole = message.guild.roles.highest.position;
      let botRole = message.guild.me.roles.cache.first().position;

      if (highestRole > botRole) {
        embed.addField(
          "<a:fail:970412936763957338> Checking role position.",
          "Details: Please move the bot's role above all roles."
        );
      } else {
        embed.addField(
          "<a:OK:970416703458664488> Checking role position.",
          `Bot's role its above all roles.`
        );
      }
    } catch (error) {
      embed.addField(
        "<a:fail:970412936763957338> An error ocurred",
        "Please contact us if error persist"
      );
    }

    try {
      if (!Log) {
        embed.addField(
          "<:info:790752882022023169> You don't have a logs channel",
          "Consider setting one"
        );
      } else {
        embed.addField(
          "<a:OK:970416703458664488> Logs channel",
          "Initialized successfully"
        );
      }
    } catch (error) {
      embed.addField(
        "<a:fail:970412936763957338> An error ocurred",
        "Please contact us if error persist"
      );
    }

    try {
      if (!data) {
        embed.addField(
          "<:info:790752882022023169> You don't have a modlogs channel",
          "Consider setting one"
        );
      } else {
        embed.addField(
          "<a:OK:970416703458664488> ModLogs channel",
          "Initialized successfully"
        );
      }
    } catch (error) {
      embed.addField(
        "<a:fail:970412936763957338> An error ocurred",
        "Please contact us if error persist"
      );
    }

  const wait = new Discord.MessageEmbed().setDescription(
      ":alarm_clock: ***Please wait while the bot its checking all.***"
    )

    message.channel
      .send({ embeds: [wait] })
      .then((msg) => {
        setTimeout(function () {
          msg.edit({ embeds: [embed] }).catch(error => console.log(error));
        }, 10000);
      });
  }
};
