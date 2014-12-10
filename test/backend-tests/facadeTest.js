/**
 * Created by Peter on 01-12-2014.
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
var wish = require('../../server/model/wish')

/*
 #By request from LAM we have created the Facade Test in seperate File
 ##The file we are testing in here is the wish.js
 */
describe('Testing facade - Get ALL users', function () {
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

    it("should return 3 users, with userNames: jack, John, Smith", function (done) {

        wish.getUsers(function (err, result) {
                if (err)
                    return "error: " + err

                result.length.should.equal(3);
                result[0].userName.should.equal("Jack");
                result[1].userName.should.equal("John");
                result[2].userName.should.equal("Smith");
                done();
            }
        );
    });

});

describe('Testing facade - Get ALL wishes', function () {
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

    it("should return 4 wishes, with title: wish a, wish ba, wish bb, wish c", function (done) {

        wish.getWishes(function (err, text) {
                if (err)
                    return "error: " + err


                console.log("text is: " + JSON.stringify(text))

                text.length.should.equal(4);
                text[0].title.should.equal("wish a")
                text[1].title.should.equal("wish ba")
                text[2].title.should.equal("wish bb")
                text[3].title.should.equal("wish c")

                done();
            }
        );
    });

});

describe('Testing facade - Get friend list', function () {
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
                    },
                    {
                        "user": "Smith"
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

    it("should return 1 user - now we find his two friends", function (done) {
            wish.getUser('Jack', function (err, id) {
                if (err)
                    return "error: " + err
                id.length.should.equal(1);
                done();
            });

        }
    )

    it("should return 2 friends", function (done) {
            wish.getUser('Jack', function (err, id) {
                if (err)
                    return "error: " + err
                id.length.should.equal(1);
                wish.getFriends(id[0]._id, function (err, result) {
                        if (err)
                            return "error: " + err
                        console.log(result)
                        result.length.should.equal(2);
                        done();
                    }
                )
            });

        }
    )
});

describe('Testing facade - Get Wish list from one user', function () {
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
                    },
                    {
                        "user": "Smith"
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

    it("should return 1 wish from user Jack", function (done) {
            wish.getUser('Jack', function (err, id) {
                if (err) {
                    return "error: " + err
                }

                wish.getWishFromUser(id[0]._id, function (err, result) {
                        if (err)
                            return "error: " + err
                        console.log(result)
                        result.length.should.equal(1);
                        done();
                    }
                )
            });
        }
    )

    it("should return 2 wishes from user John", function (done) {

            wish.getUser('John', function (err, id) {
                if (err)
                    return "error: " + err

                wish.getWishFromUser(id[0]._id, function (err, result) {
                        if (err)
                            return "error: " + err
                        console.log("wishes in john: " + result)
                        result.length.should.equal(2);
                        done();
                    }
                )
            });

        }
    )
});

describe('Testing facade - Modify a wish', function () {
    this.timeout(30000)
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
                    },
                    {
                        "user": "Smith"
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

    it("should return 1 wish with Title wish c", function (done) {
            this.timeout(30000)

            wish.getUser('Smith', function (err, user) {
                if (err)
                    return "error: " + err

                //console.log("writing user: " + user)


                wish.getWishFromUser(user[0]._id, function (err, result) {
                    if (err)
                        return "error: " + err
                    //console.log(result)
                    result[0].title.should.equal('wish c');
                    //console.log("wish result: " + JSON.stringify(result[0]))
                    var wishResult = result[0];
                    //console.log("printing wishResult: "+wishResult)

                    modifiedWish = {
                        "title": "wish changed",
                        "description": wishResult.description,
                        "size": wishResult.size,
                        "price": wishResult.price,
                        "link": wishResult.link,
                        "bought": wishResult.bought,
                        "buyer": wishResult.buyer,
                        _id: wishResult._id
                    }

                    wish.updateWish(wishResult._id, modifiedWish, function (err, result) {
                        if (err) {
                            console.log("eror "+err)
                            return "error: " + err
                        }
                        console.log("printing result in test " + result);
                        result.wishes[0].title.should.equal("wish changed")

                        done();
                    })

                })


            });
        }
    )
    //it("should return 1 wish with Title wish c", function (done) {
    //        wish.getUser('Smith', function (err, id) {
    //            if (err) {
    //                return "error: " + err
    //            }
    //
    //            wish.getWishFromUser(id[0]._id, function (err, result) {
    //                    if (err)
    //                        return "error: " + err
    //                    console.log(result)
    //                    result[0].title.should.equal('wish c');
    //                    wish = result[0].title.should.equal('wish c');
    //                    done();
    //                }
    //            )
    //        });
    //    }
    //)
});