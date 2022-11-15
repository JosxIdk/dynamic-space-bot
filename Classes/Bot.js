const client = require("./Client");
const Discord = require("discord.js");
const fs = require("fs");

const Mongo = require("../Db/Mongo");
const registerCommands = require('../Registry/registry');

registerCommands(client, '../Commands')
Mongo(`${process.env.mongo}`);

/* Handlers */
for (const file of fs.readdirSync("./Events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`../Events/${file}`);
    client.on(fileName, fileContents.bind(null, client));
  }
}

/* Backup */
for (const file of fs.readdirSync("./Backup/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`../Backup/${file}`);
    client.on(fileName, fileContents.bind(null, client));
  }
}

/* Guild Join */
for (const file of fs.readdirSync("./Join/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`../Join/${file}`);
    client.on(fileName, fileContents.bind(null, client));
  }
}

/* Bot Join */
for (const file of fs.readdirSync("./ServerJoin/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`../ServerJoin/${file}`);
    client.on(fileName, fileContents.bind(null, client));
  }
}

/* Distube */
const eventDistube = fs.readdirSync('./Distube').filter(file => file.endsWith('.js'));

for (const file of eventDistube) {
	const event = require(`../Distube/${file}`);
		client.distube.on(event.name, (...args) => event.execute(...args));
	}

client.login(process.env.token);