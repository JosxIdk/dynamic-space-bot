const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("userinfo command")
    .addMentionableOption((option) =>
      option.setName("user").setDescription("The user to show information").setRequired(true)
    ),
  async execute(interaction) {
      const user = interaction.options.getMentionable("user")
      const member = interaction.guild.members.cache.get(user.id)

    if(!user){
        const embed = new MessageEmbed()
        .setDescription(`<:no:860978971771928647> ***Mention a valid member!***`)
        .setColor(16711680)
        return interaction.reply({ embeds: [embed] })
    }
  
    const flags = interaction.user.flags.toArray()

    const embed = new MessageEmbed()
    .addField("🆔 User ID: ", `${interaction.user.id}`, true)
    .addField(`👤 Username: ${interaction.user.username}`, `(${interaction.user.tag})`, true)
    .addField("📅 Discord user since: ", `<t:${parseInt(interaction.user.createdAt / 1000)}>`, true)
    .addField("🙌 Server member since: ", `<t:${parseInt(member.joinedAt / 1000)}>`, true)
    .addField("‍🍳 Roles: ", `${member.roles.cache.map(x => x).join(' ').replace("@everyone", " ")}`, true)
    .addField("🚩 Flags: ", `${flags?.join(' | ') || "This user doesn't have flags"}`, true)
    .addField("🤖 Is bot: ", `${user.bot ? 'true' : 'false'}`, true)
    .setColor("#FF8C00")
    .setThumbnail(user.displayAvatarURL({ dynamic: true}))
    interaction.reply({ embeds: [embed] })
  },
};
