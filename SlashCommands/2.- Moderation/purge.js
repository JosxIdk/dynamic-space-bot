const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, GuildMember } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Clears an amount of messages")
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("The user to clear message")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("messages")
        .setDescription("The ammount of messages to clear")
        .setRequired(false)
    ),
  async execute(interaction) {
    const author = interaction.member;
    const member = interaction.options.getMentionable("user");
    const messages = interaction.options.getInteger("messages");
    if (!author.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return interaction.reply(
        falseEmbed("You don't have the necessary permissions to do that")
      );
    }
    if (member) {
      if (!(member instanceof GuildMember)) {
        return interaction.reply(falseEmbed("Please specify a valid user"));
      }
      const messages = interaction.channel.messages.fetch();
      const userMessages = (await messages).filter(
        (m) => m.author.id === member.id
      );

      await interaction.channel.bulkDelete(userMessages);
      interaction.reply(successEmbed(`${member} messages has been cleared`));
    } else if (messages) {
      if (messages < 1)
        return interaction.reply(
          falseEmbed("The amount of messages must be greater than 1")
        );
      if (messages > 99)
        return interaction.reply(
          falseEmbed("You can't delete more than 100 messages")
        );
      interaction.channel.bulkDelete(messages + 1);
      interaction.reply(successEmbed(`I've deleted ${messages} successfully`));
    } else {
      interaction.reply(
        falseEmbed("Please provide a valid option: User or Messages")
      );
    }
  },
};
