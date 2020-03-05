var express = require("express"),
    router = express.Router(),
    Football = require('../models/football'),
    Football_h = require('../models/h_football'),
    middleware = require("../middleware/index");

// Football_h.create({
//     host: 'Barcelona',
//     guest: 'Mayorca',
//     coef: 1.7,
//     forecast: '1/X',
//     result: true
// }, (err, football) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(football);
//     }
// });      

router.get('/football', middleware.isLoggedIn, (req, res) => {
    Football.find({}, (err, foundFootball) => {
        if (err || !foundFootball) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render("football", { page: 'football', footballTabble: foundFootball });
        }
    }).limit(30);
});

router.get('/football/new', (req, res) => {
    res.render('football_new');
});

router.post('/football/new', (req, res) => {
    var forecastArr = [];
    for (var i = 0; i < req.body.id; i++) {
        var obj = {
            date: req.body.row.date[i],
            time: req.body.row.time[i],
            host: req.body.row.host[i],
            guest: req.body.row.guest[i],
            coef: Number.parseFloat(req.body.row.coef[i]),
            forecast: req.body.row.forecast[i],
        }
        forecastArr.push(obj);
    }
    Football.insertMany(forecastArr, (err, created) => {
        if (err || !created) {
            req.flash('error', 'Error creating football forecasts');
            res.redirect('/profile');
        } else {
            req.flash('success', 'Forecast created!');
            res.redirect('/football');
        }
    });
});

router.get('/h_football', (req, res) => {
    Football_h.find({}, (err, foundFootball_h) => {
        if (err || !foundFootball_h) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render("h_football", { page: 'h_football', footballTabble: foundFootball_h });
        }
    }).limit(30);
});

module.exports = router;