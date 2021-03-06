const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Hot_football = require('./models/hot_football'),
    Hot_hockey = require('./models/hot_hockey'),
    middleware = require("./middleware/index"),
    methodOverride = require("method-override");

//REQUIRING ROUTES
var indexRoutes = require("./routes/index");
var footballRoutes = require("./routes/football");
var hockeyRoutes = require("./routes/hockey");

var url = process.env.DATABASEURL || "mongodb://localhost/tsf";
var port = process.env.PORT || 3000;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:', err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This is secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    app.locals.moment = require('moment');
    next();
});

app.use(indexRoutes);
app.use(footballRoutes);
app.use(hockeyRoutes);


app.get('/hot_football', middleware.isLoggedIn, (req, res) => {
    Hot_football.find({}, (err, foundHot) => {
        if (err || !foundHot) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render("hot_football", { page: 'hot_football', footballTabble: foundHot });
        }
    }).limit(30);
});

app.get('/hot_football/new', middleware.isAdmin, (req, res) => {
    res.render('hot_football_new');
});

app.post('/hot_football/new', middleware.isAdmin, (req, res) => {
    var forecastArr = [];
    for (var i = 0; i < req.body.id; i++) {
        var obj = {
            date: Date.parse(req.body.row.date[i]),
            type: req.body.row.type[i],
            host: req.body.row.host[i],
            guest: req.body.row.guest[i],
            coef: Number.parseFloat(req.body.row.coef[i]),
            forecast: req.body.row.forecast[i],
        }
        forecastArr.push(obj);
    }
    Hot_football.insertMany(forecastArr, (err, created) => {
        if (err || !created) {
            req.flash('error', 'Error creating hot forecasts');
            res.redirect('/profile');
        } else {
            req.flash('success', 'Forecast created!');
            res.redirect('/hot_football');
        }
    });
});

app.get('/hot_hockey', middleware.isLoggedIn, (req, res) => {
    Hot_hockey.find({}, (err, foundHot) => {
        if (err || !foundHot) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render("hot_hockey", { page: 'hot_hockey', footballTabble: foundHot });
        }
    }).limit(30);
});

app.get('/hot_hockey/new', middleware.isAdmin, (req, res) => {
    res.render('hot_hockey_new');
});

app.post('/hot_hockey/new', middleware.isAdmin, (req, res) => {
    var forecastArr = [];
    for (var i = 0; i < req.body.id; i++) {
        var obj = {
            date: Date.parse(req.body.row.date[i]),
            type: req.body.row.type[i],
            host: req.body.row.host[i],
            guest: req.body.row.guest[i],
            coef: Number.parseFloat(req.body.row.coef[i]),
            forecast: req.body.row.forecast[i],
        }
        forecastArr.push(obj);
    }
    Hot_hockey.insertMany(forecastArr, (err, created) => {
        if (err || !created) {
            req.flash('error', 'Error creating hot forecasts');
            res.redirect('/profile');
        } else {
            req.flash('success', 'Forecast created!');
            res.redirect('/hot_hockey');
        }
    });
});

app.get('*', (req, res) => {
    req.flash('error', 'Address not found');
    res.redirect('/home');
});

app.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err.message}`)
    } else {
        console.log(`App running on port ${port}`);
    }
});