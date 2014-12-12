var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');
var facade = require('../model/wish')
var userfacade = require('../model/user')

router.post('/userAdmin', function (req, res, next) {

    userfacade.addNewUser(req.body, function (err, user) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    })

})

router.delete('/userAdmin/:id', function (req, res, next) {
    var idtodelete = req.params.id;

    userfacade.deleteUser(idtodelete, function (err, user) {
        if (err) {
            res.status(err.status || 500);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        var usernameTodelete = user.userName;
        console.log("deletingUsername " + usernameTodelete)
        facade.getUsers(function (err, users) {
            console.log(users.length)
            for (var i = 0; i < users.length; i++) {
                for (var k = 0; k < users[i].friends.length; k++) {
                    if (users[i].friends[k].user === usernameTodelete) {
                        console.log("found " + usernameTodelete)
                        var deletinguser = {user: usernameTodelete};
                        facade.removeFromFriendList(users[i]._id, deletinguser, function (err, result) {

                            console.log("friend remove success " + result)
                        })

                        facade.getWishByID(users[i]._id, "", function (err, result) {

                            console.log("buyer remove success " + result)
                        })

                    }
                }

            }
        })
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(user));
    })

})

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
