const Discord = require("discord.js");
module.exports = class Command {
  constructor(options) {
    if (typeof options.name !== "string")
      throw new Error("options.name must be a string");
    if (typeof options.category !== "string")
      throw new Error("options.category must be a string");

    this.name = options.name;
    this.aliases = [];
    this.category = options.category;
    this.usage = "";
    this.description = "";
    this.guildOnly = true;
    this.nsfwOnly = false;
    this.devOnly = false;
  }
  async run(client, message, args, distube, interaction) {
    throw new Error(`${this.constructor.name} doesn't have a run method`);
  }
};
