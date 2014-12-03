var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');
var facade = require('../model/wish')
var userfacade = require('../model/user')

//using new Databae
//get ALL users
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

/*
 NOT USED IN NEW DB
 */

//Using new Database
//get a user from Database
//router.get('/user', function (req, res) {
//   facade.getUser(function (err,user))
//});


// using new user database
// get All wishes from all users!
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

// using new user database
//Get wishes by user id
router.get('/wish/:id', function (req, res) {

    facade.getWishFromUser(req.params.id, function (err, wishes) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wishes));
    })

})


//find User from UserName
router.get('/findUser/:userName', function (req, res) {

    facade.getUser(req.params.userName, function (err, user) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    })
})

router.post('/userAdmin', function (req, res, next) {

        userfacade.addNewUser(req.body, function(err, user){
            if(err) {
                res.status(err.status || 500);
                res.send(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type", "application/json");
            res.end(JSON.stringify(user));
        })

    })

        //console.log("in rest api findUSer: "+req.params.userName)
    //if (typeof global.mongo_error !== "undefined") {
    //    res.status(500);
    //    res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
    //    return;
    //}
    //user.find({userName: req.params.userName}, function (err, user) {
    //    if (err) {
    //        res.status(err.status || 500);
    //        res.end(JSON.stringify({error: err.toString()}));
    //        return;
    //    }
    //    res.header("Content-type", "application/json");
    //    res.end(JSON.stringify(user));
    //});

//get Friend list
router.get('/friends/:id', function (req, res) {

    facade.getFriends(req.params.id, function (err, friends) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(friends));
    })


    //if (typeof global.mongo_error !== "undefined") {
    //    res.status(500);
    //    res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
    //    return;
    //}
    //
    //user.distinct('friends',{_id:req.params.id} ,function(err, output){
    //    if(err){
    //        res.status(err.status || 400);
    //        res.end(JSON.stringify({error: err.toString()}));
    //        return;
    //    }
    //
    //    res.header("Content-type", "application/json");
    //    res.end(JSON.stringify(output));
    //});
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


//Not used with new DB - can be deleted PETER
/*
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

 */

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

//update a wish - not working ATM
router.put('/:id', function (req, res) {

    var wish = req.body;
    console.log(req.body)

    facade.addWish(req.params.id, req.body, function (err, user) {
        console.log("inside update")
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    })

})

//get Wish from WishID
router.get('/wishes/:id',function(req,res){
    console.log("inside /wishes/id")
    facade.getWishByID(req.params.id, function(err, wishes){
        if(err){
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wishes));
    })
})

router.put('/buy/:id', function (req, res) {

    var buyer = req.body;
    console.log(req.body)

    facade.updateBuyer(req.params.id, req.body, function (err, user) {
        console.log("inside update")
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringfy({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    })

})

router.get('/test/:id/:title', function (req,res) {

    facade.findById(req.params.id,req.params.title, function (err, wish) {
        if (err) {
            res.status(err.status || 500)
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wish));
    })
})

module.exports = router;
