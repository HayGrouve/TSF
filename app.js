const express = require('express');
const app = express();


var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err.message}`)
    }else{
        console.log(`App running on port ${port}`);
    }
});