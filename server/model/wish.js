/**
 * Created by Peter on 29-11-2014.
 */
var mongoose = require('mongoose');
var user = mongoose.model('User');


//get All users - TESTED
function getUsers(callback) {
    user.find({}, (function (err, users) {
        if (err) {
            return callback(err)
        }
        callback(null, users);
    }))
}

//get User from @userName - TESTED
function getUser(userName, callback) {

    user.find({userName: userName}, function (err, user) {
        if (err) {
            return callback(err)
        }
        callback(null, user)
    });
}

//get all wishes for ALL users - TESTED
function getWishes(callback) {
    console.log("called")
    user.distinct('wishes', function (err, wishes) {
        if (err) {
            return callback(err);
        }
        callback(null, wishes)
    });
};

// get wishes from user by userID - TESTED
function getWishFromUser(id, callback) {
    user.distinct('wishes', {_id: id}, function (err, wishes) {
        if (err) {
            return callback(err)
        }
        callback(null, wishes)
    });
}

//get Friendlist - TESTED
function getFriends(id, callback) {
    console.log(id)
    console.log("called")
    user.distinct('friends', {_id: id}, function (err, wishes) {
        if (err) {
            return callback(err);
        }
        console.log(wishes)
        callback(null, wishes)
    });
};

//TODO test this !
//update wish
function addWish(id, wish, callback) {
    console.log("creating wish for id: " + id)
    console.log("creating wish: " + JSON.stringify(wish));

    user.update({_id: id}, {$push: {'wishes': wish}}, {safe: true, upsert: true}, function (err, model) {
        console.log("inside update")
        if (err) {
            return callback(err);
        }
        callback(null, model);
    })

}

//Get wishes by wishID
function getWishByID(wishID, callback) {
    console.log("inside getWIshID " + wishID)
    user.update({'wishes._id':wishID},{$set:{'buyer':"new buyer"}},{safe: true, upsert: true}, function (err, foundOne) {
        if (err) {
            return callback(err)
        }
        console.log(JSON.stringify(foundOne))
        callback(null,foundOne)


    })
}
function getUserByWishID(wishID, callback) {
    console.log("inside getUserByWishID " + wishID)
    user.findOne({'wishes._id':wishID},function (err, foundOne) {
        if (err) {
            return callback(err)
        }
        console.log(JSON.stringify(foundOne))
            callback(null,foundOne.userName)

            }
        );





}

function updateBuyer(id, buyerUserName, callback) {
    user.update({'wishes.title': id}, {$set: {wishes: {buyer: buyerUserName}}}, function (err, result) {
        if (err) {
            return callback(err)
        }
        callback(null, result)
    })
}


function findbyID(id, wishTitle, callback) {
    console.log("inside findID")
    user.find({}, {'wishes.buyer':wishTitle} ,function (err, wishes) {
        if (err) {
            return callback(err)
        }
        callback(null, wishes)
    });
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    getWishes: getWishes,
    getWishFromUser: getWishFromUser,
    getFriends: getFriends,
    addWish: addWish,
    getWishByID: getWishByID,
    findById: findbyID,
    updateBuyer: updateBuyer,
    getUserByWishID: getUserByWishID
    //findWiki: findWiki,
    //getWikisWithCategory: getWikisWithCategory,
    //getCategories: getCategories

}