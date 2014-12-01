/**
 * Created by Peter on 29-11-2014.
 */
var mongoose = require('mongoose');
var user = mongoose.model('User');


//get all wishes
function getWish(callback){
    console.log("called")
    user.distinct('wishes', function (err, wishes) {
        if (err) {
           return callback(err);
        }
       callback(null,wishes)
    });
};

//getFriends
function getFriends(id,callback){
    console.log(id)
    console.log("called")
    user.distinct('friends',{_id:id}, function (err, wishes) {
        if (err){
              return callback(err);
        }
        console.log(wishes)
        callback(null,wishes)
    });
};

module.exports = {
    getWish: getWish,
    getFriends: getFriends
    //findWiki: findWiki,
    //getWikisWithCategory: getWikisWithCategory,
    //getCategories: getCategories

}