const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user")
    .addMentionableOption((option) =>
      option.setName("user").setDescription("The user to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason to kick user")
        .setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMentionable("user");
    const reason = interaction.options.getString("reason");
    if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply(
        falseEmbed("You don't have the necessary permissions to do that")
      );
    }
    if (!(member instanceof GuildMember)) {
      return interaction.reply(falseEmbed("Please specify a valid user"));
    }
    if (member.id === interaction.member.id) {
      return interaciton.reply(falseEmbed("You can't kick yourself"));
    }
    if (!interaction.guild.members.cache.get(member.id).kickable) {
      return interaction.reply(falseEmbed("This user its not kickable"));
    }

    const guild = interaction.guild;
    const icons = guild.iconURL();

    const embed = new MessageEmbed()
      .setAuthor(
        `You have been kicked of the server: ${interaction.guild}`,
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
    interaction.reply(successEmbed(`${member} has been kicked successfully`));
  },
};
