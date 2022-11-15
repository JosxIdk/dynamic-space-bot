const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember } = require("discord.js");
const { successEmbed, falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getpass")
    .setDescription("get a random pass"),
  async execute(interaction) {
    if (![interaction.guild.ownerId].includes(interaction.user))
    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            "<:no:860978971771928647> ***This command can only be executed by the server owner***"
          )
          .setColor(16711680),
      ],
    });
  db.findOne({ guild: interaction.guild.id }, async (err, data) => {
    if (!data)
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<:no:860978971771928647> ***This server its not in my database, please re-invite me to get a password***"
            )
            .setColor(16711680),
        ],
      });

    if (data) {
      try {
        interaction.author.send({
          embeds: [
            new MessageEmbed()
              .setDescription(`<:si:860978510079852544> ||${data.password}||`)
              .setColor("GREEN"),
          ],
        });

        interaction.react("✅");
      } catch (error) {
        console.log(error.message);
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                "<:no:860978971771928647> ***Please open your dms***"
              )
              .setColor(16711680),
          ],
        });
      }
    }
  });
  },
};
