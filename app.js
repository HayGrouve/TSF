const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    methodOverride = require("method-override");

//REQUIRING ROUTES
var indexRoutes = require("./routes/index");

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


app.get('/home', (req, res) => {
    res.render('home', {page: 'home'});
});

app.get('/hot', (req, res) => {
    res.render("hot", {page: 'hot'});
});
app.get('/football', (req, res) => {
    res.render("football", {page: 'football'});
});
app.get('/hockey', (req, res) => {
    res.render("hockey", {page: 'hockey'});
});

app.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err.message}`)
    } else {
        console.log(`App running on port ${port}`);
    }
});