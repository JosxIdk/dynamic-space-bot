const mongoose = require('mongoose')

const modlogsSchema = new mongoose.Schema({
 
  Guild: { type: String },
    webhookID: {type: String},
    webhookTOKEN: {type: String},
  Channel: { type: String },
})
module.exports = mongoose.model('modlogsSchema', modlogsSchema)