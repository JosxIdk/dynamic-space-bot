const Discord = require("discord.js");
const { Client } = require("discord.js");
const prefixSchema = require("../Db/Models/prefix");
const modlogsSchema = require("..//db/models/modlogs")
const { SpotifyPlugin } = require('@distube/spotify');
const { DisTube } = require('distube');
const Spotify = new SpotifyPlugin();

const client = new Client({
  intents: 32767,
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION", "USER"],
});

client.SlashCommands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.comandos = new Discord.Collection();
client.slash = new Discord.Collection();
client.skipvote = new Map();

const distube = new DisTube(client, { 
  searchSongs: 0,
  emitNewSongOnly: true,
	searchCooldown: 5,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: true,
	leaveOnStop: true,
	plugins: [Spotify],
})

 client.distube = distube;

 client.modlogs = async function ({ Member, Action, Reason}, message) {
  const data = await modlogsSchema.findOne({ Guild: message.guild.id });
  if(!data) return;

console.log(data.Channel)

  const channel = message.guild.channels.cache.get(data.Channel);
  const logsEmbed = new Discord.MessageEmbed()
  .setAuthor(`New case reported`)
  .addField("Type:", `${Action}`, `${Member.avatar}`)
  .addField("Offender:", `<@${Member.id}> - ${Member.id}`)
  .addField("Moderator:", `${message.author}`)
  .addField("Reason:", `${Reason}`)
  .setColor("#FF8000")

  channel.send({ embeds: [logsEmbed]})
}

client.prefix = async function (message, interaction) {
  let custom;

  const data = await prefixSchema.findOne({
    Guild: message.guild.id || interaction.guild.id || null,
  });

  if (data) {
    custom = data.Prefix;
  } else {
    custom = ">";
  }
  return custom;
};

module.exports = client;
