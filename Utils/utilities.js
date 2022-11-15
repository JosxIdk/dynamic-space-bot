const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  successEmbed: function simpleEmbed(content) {
    return {
      embeds: [
        new MessageEmbed()
          .setDescription(`<:si:860978510079852544> ***${content}***`)
          .setColor("GREEN"),
      ],
    };
  },
  falseEmbed: function falseEmbed(content) {
    return {
      embeds: [
        new MessageEmbed()
          .setDescription(`<:no:860978971771928647> ***${content}***`)
          .setColor(16711680),
      ],
    };
  },
  getFilesRecursively: function getFilesRecursively(directory, files) {
    const contents = fs.readdirSync(directory);
    files = files || [];
    for (const file of contents) {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute, files);
      } else {
        files.push(absolute);
      }
    }
    return files;
  },
  sleep: function (seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  },
};
