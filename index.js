const { getFilesRecursively } = require("./Utils/utilities");
const client = require('./Classes/Client')
require("dotenv").config();
require("./Classes/Bot");
require('./Errors/HandleErrors');

/* Slashs */
for (const file of getFilesRecursively('./SlashCommands')) {
    const command = require(`./${file}`)
    client.SlashCommands.set(command.data.name, command)
  } 

