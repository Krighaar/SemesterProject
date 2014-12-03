/**
 * Created by Peter on 29-11-2014.
 */
var mongoose = require('mongoose');
var user = mongoose.model('User');



function addNewUser(newUser,callback) {
    user.create(newUser, (function (err, user) {
        if (err) {
            return callback(err)
        }
        callback(null, user);
    }))


}

function deleteUser(id,callback) {
    user.findByIdAndRemove(id, (function (err, user) {
        if (err) {
            return callback(err)
        }
        callback(null, user);
    }))


}



module.exports = {

    addNewUser: addNewUser,
deleteUser:deleteUser


}