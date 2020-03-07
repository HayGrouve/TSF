const mongoose = require("mongoose");

var HotFootballSchema = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    type: String,
    result: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hot_football", HotFootballSchema);