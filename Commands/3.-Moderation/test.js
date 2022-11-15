const Discord = require("discord.js");
const db = require("../../Db/Models/password");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "test";
    this.aliases = [];
  }
  async run(client, message, args) {
    console.log("hola")
  }
};
