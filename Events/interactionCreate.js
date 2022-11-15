const {
  Client,
  Intents,
  Interaction,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageButton,
  Util,
  MessageAttachment,
} = require("discord.js");
const fs = require("fs");
module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    const command = interaction.client.SlashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
};
