const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("pasport");

const Tweet = require("../../models/Tweet")
const validateTweetInput = require("./validation/tweets");


router.get('/', (req, res) => {
    Tweet.find()
        .sort({date: -1})
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json({notweetsfound: "No Tweets Found"}))
})

router.get('/user/:user_id', (req, res) => {
    Tweet.find({user: req.params.user_id})
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json({ notweetsfound: "No tweets found for the user"}))
})

router.get("/:id", (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err => res.status(400).json({ notweetfound: "No Tweet found with that ID"}))
})

router.post("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    
})

module.exports = router