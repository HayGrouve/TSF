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
    var forecastArr = [req.body.row];
    var rowObj = req.body.row
    console.log(forecastArr);
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