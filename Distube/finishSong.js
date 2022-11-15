const client = require('../Classes/Client')
module.exports = {
  name: "finishSong",
  once: false,
  async execute(queue, song) {
    const map = client.skipvote;
    map.clear();
  },
};
