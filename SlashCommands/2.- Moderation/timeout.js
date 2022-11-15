const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");
const ms = require('ms')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Put in timeout a member")
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("The user to timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("length")
        .setDescription("The length of timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason to kick user")
        .setRequired(true)
    ),
  async execute(interaction) {
    const author = interaction.member;
    const member = interaction.options.getMentionable("user");
    const reason = interaction.options.getString("reason");
    const length = interaction.options.getString('length');

    const timeInMs = ms(length);
    if (!timeInMs)
      return interaction.reply(falseEmbed("Please specify a valid time"));
    if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return interaction.reply(
        falseEmbed("You don't have the necessary permissions to do that")
      );
    member.timeout(timeInMs, reason);
    interaction.reply(
      successEmbed(`${member} has been timed out for ${length}`)
    );
  },
};