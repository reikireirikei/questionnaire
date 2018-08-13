//server side

const express = require('express');
const router = express.Router();

//const mongoose = require('mongoose');
const passport = require('passport');

const Id = require('../models/Id');
const Pusher = require('pusher');
const LocalStrategy = require('passport-local').Strategy;

var pusherLogin = new Pusher({
  appId: '508005',
  key: '',
  secret: '',
  cluster: 'ap1',
  encrypted: true,
});

router.get('/', (req, res) => {
  res.send('Hi');
});

router.post('/', (req, res) => {
  const newId = {
    username: req.body.id,
    password: req.body.password,
  };
  new Id(newId).save().then(newId => {
    pusher.trigger('login', 'os-vote', {

    });
  });
});

/*passport.use(new LocalStrategy((username, password, done) => {
  if (err) { return done(err); } else if (!user)
}));
*/
module.exports = router;
