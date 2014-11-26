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

        owner: req.body.owner,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        link: req.body.link,
        bought: false,
        selected: ""
    }
    user.create(wish, function (err, newWish) {
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
router.put("/:_id", function (req, res, next) {

    var id=req.params._id;

    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }



    user.findByIdAndUpdate(id,req.body,function (err, changedWish) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type","application/json");

        res.end(JSON.stringify(changedWish));

    })

})
module.exports = router;
