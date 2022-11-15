const discordRest = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { getFilesRecursively } = require("./Utils/utilities");

const token = require('./config.json').token;
const appId = require('./config.json').appId;
const guildId = require('./config.json').guildId;

const commands = [];

for (const file of getFilesRecursively("./SlashCommands")) {
  const command = require(`./${file}`);
  if(!command.data) return;
  commands.push(command.data.toJSON());
}

const rest = new discordRest.REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(appId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch((error) => console.log(error));
