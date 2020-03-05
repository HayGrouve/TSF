const mongoose = require("mongoose");

var HockeySchema_h = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    result: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hockey_h", HockeySchema_h);