var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');
var facade = require('../model/wish')


router.get('/wish', function (req, res) {

    facade.getWishes(function (err, wishes) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");

        res.end(JSON.stringify(wishes));
    })


});
router.get('/', function (req, res) {

    facade.getUsers(function (err, users) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");

        res.end(JSON.stringify(users));
    })

});
module.exports = router;
