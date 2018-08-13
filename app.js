//server side

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('./config/db');
const app = express();

const login = require('./routes/login');
const poll = require('./routes/poll');
const usercreate = require('./routes/usercreate');

//Set public folder
app.use(express.static(path.join(__dirname, 'public'), { index: './login.html' }));

//Body parser rmiddleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable CORS
app.use(cors());

app.use(passport.initialize());

app.use('/poll', poll);
app.use('/login', login);
app.use('/usercreate', usercreate);

const port = 3000;

//Start server
app.listen(port, ()  => console.log('Server listening...'));
