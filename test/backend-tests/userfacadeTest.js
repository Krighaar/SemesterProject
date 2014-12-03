/**
 * Created by Tomoe
 */
global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var User = mongoose.model("User");
var user = require('../../server/model/user')
var wish = require('../../server/model/wish')

/*
    #By request from LAM we have created the Facade Test in seperate File
    ##The file we are testing in here is the wish.js
*/
describe('Testing userfacade ', function () {
    //Start the Server before the TESTS

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {

        User.remove({}, function () {
            var user1 = {

                "userName": "Jack",
                "wishes": [
                    {
                        "title": "wish a",
                        "description": "desc wish a",
                        "size": "no size",
                        "price": 500,
                        "link": "no link",
                        "bought": false,
                        "buyer": ""
                    }
                ],
                "friends": [
                    {

                        "user": "John"
                    }
                ]
            };
            var user2 = {

                "userName": "John",
                "wishes": [
                    {
                        "title": "wish ba",
                        "description": "desc wish ba",
                        "size": "no size",
                        "price": 500,
                        "link": "no link",
                        "bought": false,
                        "buyer": ""
                    },
                    {
                        "title": "wish bb",
                        "description": "desc wish bb",
                        "size": "no size",
                        "price": 500,
                        "link": "no link",
                        "bought": false,
                        "buyer": "Jack"
                    }

                ],
                "friends": [
                    {

                        "user": "Jack"
                    }
                ]
            };
            var user3 = {

                "userName": "Smith",
                "wishes": [
                    {
                        "title": "wish c",
                        "description": "desc wish c",
                        "size": "no size",
                        "price": 500,
                        "link": "no link",
                        "bought": false,
                        "buyer": ""
                    }
                ],
                "friends": [
                    {

                        "user": ""
                    }
                ]
            };
            User.create(user1, function (err) {
                User.create(user2, function (err) {
                    User.create(user3, function (err) {
                        done()
                    })
                });

            });
        })
    })


    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        mongoose.connection.db.dropDatabase();
        testServer.close();
    })




    describe('Testing deleteUser ', function () {
        it("should return 3 users, with userNames: jack and John", function (done) {


            user.addNewUser({"userName": "Tom"}, function (err, addedUser) {

                wish.getUsers(function(err,users){
                    if(err)
                        return "error"+err;

                    users.length.should.equal(4);



                user.deleteUser(addedUser._id, function (err, result) {
                        if (err)
                            return "error: " + err


                        result.userName.should.equal("Tom");

                        wish.getUsers(function (err, users) {
                            if (err)
                                return "error" + err;

                            users.length.should.equal(3);

                        })
                        done();
                    });
                });
            });
        });
    });


    describe('Testing addNewUser ', function () {
        it("should return 4 users, with userNames: jack, John, Smith and Tom", function (done) {



            var newUser = {"userName": "Tom"}


            user.addNewUser(newUser,function (err, result) {
                    if (err)
                        return "error: " + err


                    result.userName.should.equal("Tom");

                    wish.getUsers(function(err,users){
                        if(err)
                            return "error"+err;

                        users.length.should.equal(4);

                    })
                    done();
                }
            );
        });
    });


});

