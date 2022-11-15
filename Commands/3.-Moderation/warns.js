const db = require("../../Db/Models/case");
const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "warns";
    this.aliases = [];
    this.category = "Moderation";
    this.description = "Show the warns of a user";
    this.usage = "warns {user}";
  }
  async run(client, message, args) {
    let member = message.mentions.members.first();
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<:no:860978971771928647> ***You don't have the neccessary permissions to do that!***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    if (!member) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          "<:no:860978971771928647> ***Please mention a member***"
        )
        .setColor(16711680);
      return message.channel.send({ embeds: [embed] });
    }

    db.findOne(
      { guildid: message.guild.id, user: member.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          const embed = new Discord.MessageEmbed()
            .setAuthor(
              `Warns of user: ${member.user.username} `,
              `${member.user.displayAvatarURL()}`
            )
            .setDescription(
              data.content
                .map(
                  (w, i) =>
                    `\`${i + 1}\` | Moderator: ${w.moderator}\nReason: ${
                      w.reason
                    }\n`
                )
                .toString()
            )
            .setColor(16711680);
          message.channel.send({ embeds: [embed] });
        } else {
          message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(
                  "<:no:860978971771928647> | ***This user has no warn cases registered***"
                )
                .setColor(16711680),
            ],
          });
        }
      }
    );
  }
};
