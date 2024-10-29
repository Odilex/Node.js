const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
const port = 3000;

delete require.cache[require.resolve('./app')];

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userdb',
});

db.connect((err) => {
  if (err){ 
    throw err;}
    console.log('Mysql connected');
});
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

const indexRouter = require('./index');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log('server running on port ${port}');
});

