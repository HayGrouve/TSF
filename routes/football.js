var express = require("express"),
    router = express.Router(),
    Football = require('../models/football'),
    middleware = require("../middleware/index");

// Football.create({
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

router.get('/h_football', (req, res) => {
    res.render("h_football", { page: 'h_football' });
});

module.exports = router;