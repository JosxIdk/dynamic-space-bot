const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("setup dynamic space"),
  async execute(interaction) {
    const Logs = require("../../Db/Models/logs");
    const Log = await Logs.findOne({ guild: interaction.guild.id });

    const embed = new MessageEmbed()
      .setTitle("Dynamic Space Quick Setup")
      .setColor("#36393F");

    const newEmbed = new MessageEmbed()
      .setTitle("Dynamic Space Quick Setup Failed")
      .setColor("#36393F");

    try {
      let botPerms = interaction.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR);

      if (!botPerms) {
        newEmbed.addField(
          "<:no:860978971771928647> Checking bot's permissions",
          "Details: The bot must have the permission: `ADMINISTRATOR`"
        );
       return interaction.reply({ embeds: [newEmbed] });
      } else {
        embed.addField(
          "<:si:860978510079852544> Checking bot permissions",
          "Bot permissions are correctly working"
        );
      }
    } catch (error) {
      embed.addField(
        "<:no:860978971771928647> An error ocurred",
        "Please contact us if error persist"
      );
    }

    try {
      let highestRole = interaction.guild.roles.highest.position;
      let botRole = interaction.guild.me.roles.cache.first().position;

      if (highestRole > botRole) {
        embed.addField(
          "<:no:860978971771928647> Checking role position.",
          "Details: Please move the bot's role above all roles."
        );
      } else {
        embed.addField(
          "<:si:860978510079852544> Checking role position.",
          `Bot's role its above all roles.`
        );
      }
    } catch (error) {
      embed.addField(
        "<:no:860978971771928647> An error ocurred",
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
          "<:si:860978510079852544> Logs channel",
          "Initialized successfully"
        );
      }
    } catch (error) {
      embed.addField(
        "<:no:860978971771928647> An error ocurred",
        "Please contact us if error persist"
      );
    }

  const wait = new MessageEmbed().setDescription(
      ":alarm_clock: ***Please wait while the bot its checking all.***"
    )

    interaction.reply({ embeds: [wait] })
      .then((msg) => {
        setTimeout(function () {
          interaction.editReply({ embeds: [embed] }).catch(error => console.log(error));
        }, 10000);
      });
  },
};
