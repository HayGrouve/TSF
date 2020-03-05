const mongoose = require("mongoose");

var FootballSchema = new mongoose.Schema({
    host: String,
    guest: String,
    coef: Number,
    forecast: String,
    result: Boolean,
    date: String,
    time: String
});

module.exports = mongoose.model("Football", FootballSchema);