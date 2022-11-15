const Discord = require('discord.js');
const db = require("../Db/Models/password");
module.exports = async (client, guild) => {
  setTimeout(function () {
    let owner = guild.ownerId;
    db.findOne({ guild: guild.id }, async (err, data) => {
      if (err) throw err;

      try {
        client.users.cache.get(owner).send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Thank you for choosing SB Utilities")
              .setDescription(
                `<a:OK:970416703458664488> \`SB Utilities\` has been added to **${guild}** successfully!\n<:join700961551074590842:774032514393964545> To set up DynamicSpace, use: \`setup\` command.\n<:info:790752882022023169> Pst: Setting up Dynamic Space can take a while, please be patient.\n**Rescue Password:**\n<:rescueKey:884249560719962213> ||${data.password}|| *[Click to show]*\nPlease save this password somewhere **safe**. This is requested by using some commands or when the owner account cannot be accessed and you have no control. **Do not share it with someone else!**\n**Paid version:**\nYou can get better moderation and security by buying **[Premium](https://discord.com)**\n**Useful links:**\n**Dashboard:** https://localhost/dashboard\n**Guide:** https://localhost/Guide\n**Command List** https://localhost/commands\n**Status** https://localhost/status\n**Need more help?**\n[Join our support server](https://discord.gg/ARcUcAcqQr)`
              )
              .setColor("#39393F"),
          ],
        });
      } catch (error) {
        console.log(error.message);
        const channelPass = guild.channels.cache
          .filter((x) => x.type === "GUILD_TEXT")
          .random();
        let guildCreate =
          channelPass.permissionsFor(client.user).has("SEND_MESSAGES") &&
          channelPass.permissionsFor(client.user).has("EMBED_LINKS");

        console.log(channelPass);
        if (!guildCreate) return;
        if (channelPass.nsfw) return;
        if (guildCreate) {
          channelPass.send({
            embeds: [
              new Discord.MessageEmbed()
                .setTitle("Thank you for choosing SB Utilities")
                .setDescription(
                  `<a:OK:970416703458664488> \`SB Utilities\` has been added to **${guild}** successfully!\n<:join700961551074590842:774032514393964545> To set up DynamicSpace, use: \`setup\` command.\n<:info:790752882022023169> Pst: Setting up Dynamic Space can take a while, please be patient.\n**Rescue Password:**\n<:rescueKey:884249560719962213> ||I can't dm the owner, so owner please use the command rescuepass|| *[Click to show]*\nPlease save this password somewhere **safe**. This is requested by using some commands or when the owner account cannot be accessed and you have no control. **Do not share it with someone else!**\n**Paid version:**\nYou can get better moderation and security by buying \`**[Premium](https://discord.com)**\`\n**Useful links:**\n**Dashboard:** https://localhost/dashboard\n**Guide:** https://localhost/Guide\n**Command List** https://localhost/commands\n**Status** https://localhost/status\n**Need more help**\n[Join our support server](https://discord.gg/ARcUcAcqQr)`
                )
                .setColor("#39393F"),
            ],
          });
        }
      }
    });
  }, 1000);
};
