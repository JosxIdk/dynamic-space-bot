const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
  guild: String,
  enabled: String,
})

module.exports = mongoose.model('automod', Schema)