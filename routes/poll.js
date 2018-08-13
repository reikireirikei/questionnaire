//server side

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '508005',
  key: '638143ec28e4652f3c49',
  secret: '0948346c63109a8d5848',
  cluster: 'ap1',
  encrypted: true,
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };

  new Vote(newVote).save().then(vote => {// save() is data update
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os,
    });
    return res.json({ success: true, message: 'Thank you for voting' });

    //type of res.json() is Promise.
  });

  /*new Vote(newVote).save((err, vote) => {
    if (err) console.error(err);
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os,
    });
    return res.json({ success: true, message: 'Thnks for vo!' });
  });*/
});

module.exports = router;
