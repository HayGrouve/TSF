const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Hot = require('./models/hot'),
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


app.get('/hot', middleware.isLoggedIn, (req, res) => {
    Hot.find({}, (err, foundHot) => {
        if (err || !foundHot) {
            req.flash('error', 'No items found');
            res.redirect('/home');
        } else {
            res.render("hot", { page: 'hot', footballTabble: foundHot });
        }
    }).limit(30);
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