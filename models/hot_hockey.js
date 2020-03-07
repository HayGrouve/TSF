const mongoose = require("mongoose");

var HotHockeySchema = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    type: String,
    result: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hot_hockey", HotHockeySchema);