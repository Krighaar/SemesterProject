/**
 * Created by Peter on 29-11-2014.
 */
var mongoose = require('mongoose');
var user = mongoose.model('User');

//get All users
function getUsers(callback) {
    user.find({}, (function (err, users) {
        if (err) {
            return callback(err)
        }
        callback(null, users);
    }))
}

//get User from @userName
function getUser(userName, callback) {

    user.find({userName:userName}, function (err, user) {
        if (err) {
                return callback(err)
        }
       callback(null,user)
    });
}
//get all wishes for ALL users
function getWishes(callback) {
    console.log("called")
    user.distinct('wishes', function (err, wishes) {
        if (err) {
            return callback(err);
        }
        callback(null, wishes)
    });
};

// get wishes from user by userID
function getWishFromUser(id, callback){
    user.distinct('wishes',{_id:id}, function (err, wishes) {
        if (err) {
           return callback(err)
        }
      callback(null, wishes)
    });
}

//get Friendlist
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

//update wish
function addWish(id,wish,callback){
    console.log("creating wish for id: "+id)
    console.log("creating wish: "+JSON.stringify(wish));

    user.findByIdAndUpdate(id,{ $push: {'wishes':wish}},{safe:true,upsert:true}, function(err, model) {
        console.log("inside update")
        if (err) {
            return callback(err);
        }
        callback(null, model);
    })

}

module.exports = {
    getUsers: getUsers,
    getUser:getUser,
    getWishes: getWishes,
    getWishFromUser:getWishFromUser,
    getFriends: getFriends,
    addWish:addWish
    //findWiki: findWiki,
    //getWikisWithCategory: getWikisWithCategory,
    //getCategories: getCategories

}