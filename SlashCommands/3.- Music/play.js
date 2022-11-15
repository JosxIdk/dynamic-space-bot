const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../../Utils/utilities");
const { falseEmbed } = require("../../Utils/utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play command"),
  async execute(interaction, distube, args) {
    let noVoice = new MessageEmbed()
    .setDescription(
      "<a:fail:970412936763957338> ***You need to be in a voice channel to execute this command***"
    )
    .setColor(16711680);

  if (interaction.guild.me.voice.channel) {
    if (interaction.member.voice.channel !== interaction.guild.me.voice.channel)
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              "<a:fail:970412936763957338> ***You need to be in the same channel as me***"
            )
            .setColor(16711680),
        ],
      });
  }

  const song = args[0]
  let voiceChannel = interaction.member.voice.channel;
  if (!voiceChannel) return interaction.reply({ embeds: [noVoice] });

  if (!song)
    return interaction.reply(
      new MessageEmbed()
        .setDescription(
          "<a:fail:970412936763957338> ***Provide a song to play***"
        )
        .setColor(16711680)
    );

  if (!interaction.guild.me.voice.channel) {
    interaction.reply(
      `:mailbox_with_no_mail: ***Joining Voice Channel: ${voiceChannel}***`
    );
  }

  interaction.reply(
      `<:yt:847256714239148042> ***Searching the song: ${song}***`
    )
    .then(distube.play(interaction, song, voiceChannel));
  },
};
