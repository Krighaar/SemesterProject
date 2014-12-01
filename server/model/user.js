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

function addNewUser(newUser,callback) {
    user.create(newUser, (function (err, user) {
        if (err) {
            return callback(err)
        }
        callback(null, user);
    }))


}


module.exports = {
    getUsers: getUsers,
    addNewUser: addNewUser



}