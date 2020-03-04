const mongoose = require("mongoose");

var FlagSchema = new mongoose.Schema({
    image: String,
});

module.exports = mongoose.model("Flag", FlagSchema);