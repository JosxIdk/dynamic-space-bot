const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Role: Object,
})

module.exports = mongoose.model('channel', Schema)
