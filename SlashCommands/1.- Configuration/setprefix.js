const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const prefixSchema = require("../../Db/Models/prefix");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setprefix")
    .setDescription("set a custom prefix")
    .addStringOption((option) =>
      option
        .setName("prefix")
        .setDescription("the prefix to use")
        .setRequired(true)
    ),
  async execute(interaction) {
    const prefix = interaction.options.getString("prefix");
    const perms = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
    if(!perms){
        return interaction.reply(
            falseEmbed("You don't have the necessary permissions")
        )
    }

    if(!prefix){
        return interaction.reply(
            falseEmbed("Please specify a valid prefix")
        )
    }

    if(prefix.length > 3){
        return interaction.reply(
            falseEmbed("<:no:860978971771928647> ***The prefix cannot exceed 3 characters***")
        )
    }

    prefixSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) data.delete();
        data = new prefixSchema({
          Guild: interaction.guild.id,
          Prefix: prefix,
        });
        data.save();
        interaction.reply(
            successEmbed(`<:si:860978510079852544> ***Your prefix has been changed to: ${prefix}***`)
        )
        if (!data) {
            data = new prefixSchema({
              Guild: interaction.guild.id,
              Prefix: prefix,
            });
            data.save();
            interaction.reply(
                successEmbed(`<:si:860978510079852544> ***Your prefix has been changed to: ${prefix}***`)
            )
          }
        });
  },
};
