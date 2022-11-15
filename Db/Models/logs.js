const mongoose = require('mongoose')

const logs1 = new mongoose.Schema({
 
  guild: { type: String },
    webhookID: {type: String},
    webhookTOKEN: {type: String}
})
module.exports = mongoose.model('Logs', logs1)