module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: ">help" }],
    type: "PLAYING",
    status: "online",
  });
  console.log(`Logged in as ${client.user.tag}`);
};
