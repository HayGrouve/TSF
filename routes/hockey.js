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