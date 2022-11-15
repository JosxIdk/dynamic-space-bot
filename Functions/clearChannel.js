async function clearChannel(channel, n = 0, old = false) {
    let collected = await channel.messages.fetch();
    if (collected.size > 0) {
      if (old) {
        for (let msg of collected.array()) {
          await msg.delete();
          n++;
        }
      } else {
        let deleted = await channel.bulkDelete(100, true);
        if (deleted.size < collected.size) old = true;
        n += deleted;
      }
  
      return n + await clearChannel(channel, old);
    } else return 0;
  }

module.exports = clearChannel;