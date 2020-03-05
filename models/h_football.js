const mongoose = require("mongoose");

var FootballSchema_h = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    result: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Football_h", FootballSchema_h);