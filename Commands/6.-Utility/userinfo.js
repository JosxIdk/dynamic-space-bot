const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "userinfo";
    this.aliases = [];
    this.category = "Utility";
    this.description = "Shows a user's info";
    this.usage = "userinfo (user)";
  }
  async run(client, message, args) {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
      const member = message.guild.members.cache.get(user.id)

    if(!user){
        const embed = new Discord.MessageEmbed()
        .setDescription(`<a:fail:970412936763957338> ***Mention a valid member!***`)
        .setColor(16711680)
        return message.channel.send({ embeds: [embed] })
    }
  
    const flags = user.flags.toArray()

    const embed = new Discord.MessageEmbed()
    .addField("🆔 User ID: ", `${user.id}`, true)
    .addField(`👤 Username: ${user.username}`, `(${user.tag})`, true)
    .addField("📅 Discord user since: ", `<t:${parseInt(user.createdAt / 1000)}>`, true)
    .addField("🙌 Server member since: ", `<t:${parseInt(member.joinedAt / 1000)}>`, true)
    .addField("‍🍳 Roles: ", `${member.roles.cache.map(x => x).join(' ').replace("@everyone", " ")}`, true)
    .addField("🚩 Flags: ", `${flags?.join(' | ') || "This user doesn't have flags"}`, true)
    .addField("🤖 Is bot: ", `${user.bot ? 'true' : 'false'}`, true)
    .setColor("#FF8C00")
    .setThumbnail(user.displayAvatarURL({ dynamic: true}))
    message.channel.send({ embeds: [embed] })
  }
};
