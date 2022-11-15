const genPassword = require("../Functions/passwordGen");
const db = require("../Db/Models/password");
module.exports = async (client, guild) => {
  let password = genPassword(29);
  try {
    db.findOne({ guild: guild.id }, async (err, data) => {
        data = new db({
          guild: guild.id,
          password: password,
        })

        await data.save()
    });
  } catch (error) {
    console.log(error.message)
    db.findOne({ guild: guild.id }, async (err, data) => {
        data = new db({
          guild: guild.id,
          password: password,
        })

        await data.save()
    });
  }
};
