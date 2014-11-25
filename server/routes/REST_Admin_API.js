var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');

/* GET A User From The DataBase */
router.get('/user', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    user.find({}, function (err, users) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(users));
    });
});

router.post("/", function (req, res, next) {
    var wish = {

        owner: req.body.user,
        Title: req.body.title,
        Description: req.body.description,
        price: req.body.price,
        Link: req.body.link,
        bought: false
    }
    user.createNew(wish, function (err, newWish) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        console.log("New Wish added: " + newWish);
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(newWish));
    })

})

module.exports = router;
