var express = require("express"),
    router = express.Router(),
    Hockey = require('../models/hockey'),
    Hockey_h = require('../models/h_hockey'),
    middleware = require("../middleware/index");

// Hockey_h.create({
//     host: 'Team1',
//     guest: 'Team2',
//     coef: 1.2,
//     forecast: 'X',
//     result: true
// }, (err, Hockey) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(Hockey);
//     }
// });  

router.get('/hockey', middleware.isLoggedIn, (req, res) => {
    Hockey.find({}, (err, foundHockey) => {
        if (err || !foundHockey) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render('hockey', { page: 'hockey', hockeyTabble: foundHockey });
        }
    }).limit(30);
});

router.get('/hockey/new', middleware.isAdmin, (req, res) => {
    res.render('hockey_new');
});

router.post('/hockey/new', middleware.isAdmin, (req, res) => {
    var forecastArr = [];
    for (var i = 0; i < req.body.id; i++) {
        var obj = {
            date: Date.parse(req.body.row.date[i]),
            host: req.body.row.host[i],
            guest: req.body.row.guest[i],
            coef: Number.parseFloat(req.body.row.coef[i]),
            forecast: req.body.row.forecast[i],
        }
        forecastArr.push(obj);
    }
    Hockey.insertMany(forecastArr, (err, created) => {
        if (err || !created) {
            req.flash('error', 'Error creating hockey forecasts');
            res.redirect('/profile');
        } else {
            req.flash('success', 'Forecast created!');
            res.redirect('/hockey');
        }
    });
});

router.get('/h_hockey', (req, res) => {
    Hockey_h.find({}, (err, foundHockey_h) => {
        if (err || !foundHockey_h) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render('h_hockey', { page: 'h_hockey', hockeyTabble: foundHockey_h });
        }
    }).limit(30)
});
module.exports = router;