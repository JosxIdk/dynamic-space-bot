const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("view an user avatar")
    .addMentionableOption((option) =>
      option.setName("member").setDescription("The user to show information").setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("member") || interaction.member;

    if(!user){
      return interaction.reply(
        falseEmbed("This user doesn't exists")
      )
    }

    const embed = new MessageEmbed()
      .setDescription(
        `[Download Avatar](${user.displayAvatarURL({
          format: "png",
          dynamic: true,
        })})`
      )
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor("RANDOM")
      .setFooter(`Avatar requested by: ${interaction.user.tag}`);
      interaction.reply({ embeds: [embed] })
  },
};
