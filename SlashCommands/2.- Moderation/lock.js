const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed, falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks the channel"),
  async execute(interaction) {
    const member = interaction.member;
    const everyone = interaction.guild.roles.cache.get(interaction.guild.id);
    if (!member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return interaction.reply(
        falseEmbed("You don't have the necessary permissions to do that")
      );
    if (!(member instanceof GuildMember)) {
      return interaction.reply(falseEmbed("Please specify a valid user"));
    }

    interaction.channel.permissionOverwrites.edit(everyone, {
      SEND_MESSAGES: false,
    });
    await interaction.reply(successEmbed('The channel has been locked successfully'));
  },
};
