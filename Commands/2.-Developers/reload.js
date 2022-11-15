const Discord = require("discord.js");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "reload";
    this.aliases = [];
    this.devOnly = true;
    this.category = "Developers";
    this.description = "Reloads a command";
    this.usage = "reload {category} {command}";
  }
  async run(client, message, args) {
    if (
      ![
        "838812671100321843",
        "823639623166591008",
        "811810262893461565",
      ].includes(message.author.id)
    )
      return;
    const category = args[0];
    const cmd = args[1];
    let command =
      client.comandos.get(cmd)
    if (!category) {
      return message.reply(
        "<a:fail:970412936763957338> | ***Specify a category***"
      );
    }

    if (!cmd) {
      return message.reply(
        "<a:fail:970412936763957338> | ***Specify the command***"
      );
    }

    if (!command) {
      return message.reply(
        "<a:fail:970412936763957338> | ***That command doesnt exists!***"
      );
    }
    try {
      delete require.cache[
        require.resolve(`..//${category}/${command.name}.js`)
      ];
      client.comandos.delete(command.name);

      const commandContent = require(`..//${category}/${command.name}.js`);
      client.comandos.set(commandContent.name, commandContent);
    } catch (error) {
      console.log(error);
      return message.reply(
        `<a:fail:970412936763957338> | ***Error:*** \`${command.name}\`\n\`${error.message}\``
      );
    }
    message.reply(
      `<a:OK:970416703458664488> | ***The command: \`${command.name}\` of the category: \`${category}\` has been reloaded successfully!***`
    );
  }
};
