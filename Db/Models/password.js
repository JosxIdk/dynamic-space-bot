const { Schema, model } = require("mongoose")

module.exports = model(
    "password",
    new Schema({
        guild: String,
        password: String,
    })
);
    
