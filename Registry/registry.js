const path = require("path");
const fs = require("fs");

module.exports = async function registerCommands(client, dir) {
  const arr = dir.split(process.platform === "win32" ? "\\" : "/");
  const category = arr[arr.length - 1];
  const files = await fs.readdirSync(path.join(__dirname, dir), (err) => {});
  for (const file of files) {
    const stat = await fs.lstat(
      path.join(__dirname, dir, file),
      async (err, stat) => {
        if (stat.isDirectory())
          await registerCommands(client, path.join(dir, file));
        else {
          if (file.endsWith(".js")) {
            const cmdName = file.substring(0, file.indexOf(".js"));
            try {
              const cmdModule = await require(path.join(__dirname, dir, file));
              const cmdClass = new cmdModule({ name: cmdName, category });
              client.comandos.set(cmdName, cmdClass);
            } catch (err) {
              process.exitCode = 1;
              console.error(
                "There was an error initializing the " +
                  cmdName +
                  " command\n ",
                err
              );
            }
          }
        }
      }
    );
  }
};
