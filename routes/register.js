//server side

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
  const newregister = {
    username: req.body.name,
    password: req.body.newpasswd,
    emAdd: req.body.emAdd,
  };
  new Id(newregister).save().then(newregister => {
    pusher.trigger('login', 'os-vote', {

    });
  });
});

/*passport.use(new LocalStrategy((username, password, done) => {
  if (err) { return done(err); } else if (!user)
}));
*/
module.exports = router;
