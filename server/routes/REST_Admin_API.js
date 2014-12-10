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

router.delete('/wishes/:id', function(req, res){
    var wishId = req.params.id;
    console.log(wishId)
    facade.removeWish(wishId, function(err){
        if(err){
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wishId));
    })
})

router.delete('/userAdmin/:id', function (req, res, next) {
var idtodelete= req.params.id;

    userfacade.deleteUser(idtodelete, function(err, user){
        if(err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
var usernameTodelete=user.userName;
        console.log("deletingUsername "+usernameTodelete)
        facade.getUsers(function(err,users){
        console.log(    users.length)
            for(var i =0; i<users.length; i++)
            {
                for (var k = 0; k < users[i].friends.length; k++ )

                {
                    if (users[i].friends[k].user === usernameTodelete)

                    {console.log("found "+usernameTodelete)
                        var deletinguser={user:usernameTodelete};
                       facade.removeFromFriendList(users[i]._id,deletinguser,function(err,result){

                        console.log("friend remove success "+result)
                    })

                        facade.getWishByID(users[i]._id, "", function(err,result){

                            console.log("buyer remove success "+result)
                        })

                    }
                }

            }
        })
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
});

router.get('/wish/user/:id', function (req, res) {

        facade.getUserByWishID(req.params.id, function (err, user) {
            if (err) {
                res.status(err.status || 500);
                res.send(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type", "application/json");
            res.end(JSON.stringify(user));
        })
    });

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

//WIP, near completion, but there is a serious issue
router.put('/wish/:id', function (req, res) {

    var wish = req.body;
    console.log(req.body)

    facade.updateWish(req.params.id, req.body, function (err) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(req.params.body));
    })

})

router.put('/adminApi/userAdmin/:id', function (req, res) {

    var changingUser = req.body;
    console.log("changingUser"+req.body)

    userfacade.editUser(req.params.id, req.body, function (err, user) {
        console.log("inside update user")
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

// Remove wish
//router.put('/wishes/:id',function(req,res){
//
//    facade.removeWish(req.params.id , function(err, wishes) {
//        if (err) {
//            res.status(err.status || 500);
//            res.end(JSON.stringify({error: err.toString()}));
//            return;
//        }
//        res.header("Content-type", "application/json");
//        res.end(JSON.stringify(wishes));
//    })
//})

// add user to friendlist
router.put('/addfriend/:id',function(req,res){
console.log("inside add to friend api")

    console.log(req.body)
    facade.addToFriendList(req.params.id,req.body , function(err, friends) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(friends));
    })
})
// remove user to friendlist
router.put('/removefriend/:id',function(req,res){
    console.log("inside add to friend api")

    console.log(req.body)
    facade.removeFromFriendList(req.params.id,req.body , function(err, deletedFriend) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(deletedFriend));
    })
})

// Add to ToBuyList wish
router.put('/buy/wish/:id', function (req, res) {

    facade.buyWish(req.params.id,req.body, function (err, user) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringfy({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    })

})
router.put('/addToBuyList/wish/:id', function (req, res) {

    var buyer = req.body;
    console.log(req.body)

    facade.getWishByID(req.params.id, req.body, function (err, user) {
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
