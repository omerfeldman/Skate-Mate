const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./DB/db');
const Crud_Functions = require('./DB/CRUD_Operations');
const { request } = require('https');
const create_DB = require('./DB/create_DB');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/index', (req, res) => {
    console.log(req.body);
    res.render('index')
})

app.post('/index', Crud_Functions.loginUser);



app.get('/registration', (req, res) => {
    res.render('registration.ejs')
})

app.post('/registration', (Crud_Functions.createNewUser));

//create db,tables, insert data and drop table


app.get('/delete', (create_DB.DropTable));

app.get('/create',(create_DB.CreateTable));

app.get('/insert',(create_DB.InsertMyData));

app.get('/show',(create_DB.ShowTable));

app.get('/homepage',(req, res) => {
    res.render('card.ejs')
});

app.post('/card',Crud_Functions.updateLocation)

app.post('/profile',(Crud_Functions.findMates));


app.get('/profile', (req, res) => {
    res.render('profile',{myUser: Crud_Functions.LoggedUsers})
});


app.get('*', (req, res) => {
    res.send("I am not familiar with that path, please try different route")
});

app.listen(port, () => {
    console.log('port listen http://loaclhost:3000/')
});