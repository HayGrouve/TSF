var express = require("express"),
    router = express.Router(),
    Hockey = require('../models/hockey'),
    middleware = require("../middleware/index");

// Hockey.create({
//     host: 'Team1',
//     guest: 'Team2',
//     coef: 1.2,
//     forecast: 'X',
//     result: false
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
    res.render("h_hockey", { page: 'h_hockey' });
});
module.exports = router;