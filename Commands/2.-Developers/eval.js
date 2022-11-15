const { inspect } = require("util");
const Command = require("../../Utils/Command");

module.exports = class extends Command {
  constructor(options) {
    super(options);
    this.name = "eval";
    this.aliases = [];
    this.devOnly = true;
    this.category = "";
    this.description = "Evals a code";
    this.usage = "eval {code}";
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
    const filter = (reaction, user) =>
      reaction.emoji.name === "🔨" && user.id === message.author.id;
    try {
      let evaluated = eval(args.join(" "));
      let type = typeof evaluated;
      const msg = await message.reply(
        `\`\`\`js\n(${mayuscula(type)}) ${inspect(evaluated, {
          depth: 0,
        })}\`\`\``
      ); //message.reply(`(${mayuscula(type)}) ${inspect(evaluated, {depth: 0 })}`, { code: 'js' });
      try {
        await msg.react("🔨");
        await msg.awaitReactions(filter, {
          max: 1,
          errors: ["time"],
        });
        msg.delete();
      } catch {
        await msg.reactions.resolve("🔨").users.remove();
      }
    } catch (e) {
      let type = typeof evaluated;
      const msg = await message.reply(
        `\`\`\`js\n(${mayuscula(type)}) ${e.toString()}\`\`\``
      );
      try {
        await msg.react("🔨");
        await msg.awaitReactions(filter, {
          max: 1,
          errors: ["time"],
        });
        msg.delete();
      } catch {
        await msg.reactions.resolve("🔨").users.remove();
      }
    }
  }
};
function mayuscula(string) {
  string = string.replace(/[^a-z]/gi, "");
  return string[0].toUpperCase() + string.slice(1);
}
