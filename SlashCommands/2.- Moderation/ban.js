const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user")
    .addMentionableOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason to ban user")
        .setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMentionable("user");
    const reason = interaction.options.getString("reason");
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(
        falseEmbed("You don't have the necessary permissions to do that")
      );
    }
    if (!(member instanceof GuildMember)) {
      return interaction.reply(falseEmbed("Please specify a valid user"));
    }
    if (member.id === interaction.member.id) {
      return interaction.reply(falseEmbed("You can't ban yourself"));
    }
    if (!interaction.guild.members.cache.get(member.id).bannable) {
      return interaction.reply(falseEmbed("This user its not bannable"));
    }

    const guild = interaction.guild;
    const icons = guild.iconURL();

    const embed = new MessageEmbed()
      .setAuthor(
        `You have been banned of the server: ${interaction.guild}`,
        icons
      )
      .addField("***Reason:***", `${reason}`)
      .setColor("#FF8000");
    member.send({ embeds: [embed] }).catch((error) => {
      return;
    });

    await member
      .ban({ reason: reason })
      .catch(() =>
        interaction.reply(
          falseEmbed(
            "There was an error executing the command, verify my perms"
          )
        )
      );
    interaction.reply(successEmbed(`${member} has been banned successfully`));
  },
};
