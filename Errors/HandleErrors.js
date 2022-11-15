const fs = require("fs");

process.on("uncaughtException", (error) => {
  fs.appendFile("errors.txt", `${error.stack}\n\n`, (e) => {
    if (e) {
      console.log("Falied logging error.");
    }
  });
  console.log("Ignoring uncaught exception: " + error);
});
