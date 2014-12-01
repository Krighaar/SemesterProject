var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');

//using new Databae
//get ALL users
router.get('/', function (req, res) {
    user.find({},(function (err, users) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");

        res.end(JSON.stringify(users));
    }))
});


//Using new Database
//get a user from Database
router.get('/user', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    user.find({}, 'userName', function (err, users) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(users));
    });
});

// using new user database
// get All wishes from all users!
router.get('/wish', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    user.distinct('wishes', function (err, wishes) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wishes));
    });
});

// using new user database
//Get wishes by user id
router.get('/wish/:id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    user.distinct('wishes',{_id: req.params.id}, function (err, user) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    });
})


//find User from UserName
router.get('/findUser/:userName', function (req, res) {
    console.log("in rest api findUSer: "+req.params.userName)
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    user.find({userName: req.params.userName}, function (err, user) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    });
})


router.get('/friends/:id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }

    user.distinct('friends',{_id:req.params.id} ,function(err, output){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }

        res.header("Content-type", "application/json");
        res.end(JSON.stringify(output));
    });
});

//get wish from friend on friendlist
//router.get('/friends/:fid/:id', function (req, res) {
//    if (typeof global.mongo_error !== "undefined") {
//        res.status(500);
//        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
//        return;
//    }
//
//    user.find('wishes',{_id:req.params.id}, function(err, output){
//        if(err){
//            res.status(err.status || 400);
//            res.end(JSON.stringify({error: err.toString()}));
//            return;
//        }
//
//        res.header("Content-type", "application/json");
//        res.end(JSON.stringify(output));
//    });
//});

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
router.put("/", function (req, res, next) {

    var id=req.body._id;

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

//router.delete('/:id', function (req, res) {
//    if (typeof global.mongo_error !== "undefined") {
//        res.status(500);
//        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
//        return;
//    }
//    user.findOneAndRemove({_id: req.params.id}, function (err, user) {
//        if (err) {
//            res.status(err.status || 500);
//            res.end(JSON.stringify({error: err.toString()}));
//            return;
//        }
//        res.header("Content-type", "application/json");
//        res.end(JSON.stringify(user));
//    });
//})

router.put('/:id', function(req, res){
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error);
        return;
    }
    console.log(req.params.id)
    console.log(req.params.title)

    user.update({_id: req.params.id},{ $set: {'wishes': 'req.body.Title'}}), function(err, user) {
        console.log("inside update")
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringfy({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    }
})


module.exports = router;
