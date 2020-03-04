const mongoose = require("mongoose");

var HockeySchema = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    result: Boolean,
    date: { type: Date, default: Date.now },
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hockey", HockeySchema);