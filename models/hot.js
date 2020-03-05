const mongoose = require("mongoose");

var HotSchema = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    result: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hot", HotSchema);