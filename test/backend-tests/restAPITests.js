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


describe('RestAPI for getting All wishes', function () {
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
                        "Title": "wish a",
                        "Description": "desc wish a",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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
                        "Title": "wish ba",
                        "Description": "desc wish ba",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
                    },
                    {
                        "Title": "wish bb",
                        "Description": "desc wish bb",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": "Jack"
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
                        "Title": "wish c",
                        "Description": "desc wish c",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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


    it("should return 4 wishes", function (done) {
        http.get("http://localhost:" + testPort + "/adminAPI/wish", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var result = JSON.parse(chunk);
                result.length.should.equal(4)
                done();
            });
        })
    });


});

describe('RestAPI for getting All Users', function () {
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
                        "Title": "wish a",
                        "Description": "desc wish a",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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
                        "Title": "wish ba",
                        "Description": "desc wish ba",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
                    },
                    {
                        "Title": "wish bb",
                        "Description": "desc wish bb",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": "Jack"
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
                        "Title": "wish c",
                        "Description": "desc wish c",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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

    it("should return 3 users", function (done) {
        http.get("http://localhost:" + testPort + "/adminAPI", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var result = JSON.parse(chunk);
                result.length.should.equal(3);
                result[0].userName.should.equal("Jack");
                result[1].userName.should.equal("John");
                result[2].userName.should.equal("Smith");
                done();
            });
        })
    });
    it("should return 3 usersNames", function (done) {
        http.get("http://localhost:" + testPort + "/adminAPI", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var result = JSON.parse(chunk);
                result[0].userName.should.equal("Jack");
                result[1].userName.should.equal("John");
                result[2].userName.should.equal("Smith");
                done();
            });
        })
    });


});

describe('RestAPI for get one Users Wish by userName', function () {
    this.timeout(15000)
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
                        "Title": "wish a",
                        "Description": "desc wish a",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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
                        "Title": "wish ba",
                        "Description": "desc wish ba",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
                    },
                    {
                        "Title": "wish bb",
                        "Description": "desc wish bb",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": "Jack"
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
                        "Title": "wish c",
                        "Description": "desc wish c",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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

    it("should return all user Wishes from one User Should return 2 ", function () {
        http.get("http://localhost:" + testPort + "/adminAPI/finduser/John", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var result = JSON.parse(chunk);
                var id = result;


                http.get("http://localhost:" + testPort + "/adminAPI/wish/" + id, function (done) {
                    res.setEncoding("utf8");//response data is now a string
                    res.on("data", function (chunk) {
                        var result = JSON.parse(chunk);

                        console.log(result)

                        result.length.should.equal(2);
                        done();

                    });

                })
            });
        });
    });
});

describe('RestAPI get friendlist from one user by userName', function () {

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
                        "Title": "wish a",
                        "Description": "desc wish a",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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
                        "Title": "wish ba",
                        "Description": "desc wish ba",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
                    },
                    {
                        "Title": "wish bb",
                        "Description": "desc wish bb",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": "Jack"
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
                        "Title": "wish c",
                        "Description": "desc wish c",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "Buyer": ""
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

    it("should return 1 result result with title tit and it should have 1 link and category name Symphonic poems", function (done) {

        http.get("http://localhost:" + testPort + "/adminAPI/findUser/Jack", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var idOne = JSON.parse(chunk);
                var id = idOne[0]._id
                console.log(id)


                http.get("http://localhost:" + testPort + "/adminAPI/friends/" + id, function (res) {
                    res.setEncoding("utf8");//response data is now a string
                    res.on("data", function (chunk) {
                        var result = JSON.parse(chunk);

                        console.log(result)

                        result.length.should.equal(2);
                        done();

                    });

                })
            });
        });
    });
})

describe('RestAPI for Buy list, with a userName as buyer', function () {
    this.timeout(15000)
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
                        "Title": "wish a",
                        "Description": "desc wish a",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "buyer": "John"
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
                        "Title": "wish ba",
                        "Description": "desc wish ba",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
                        "buyer": ""
                    },
                    {
                        "Title": "wish bb",
                        "Description": "desc wish bb",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
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
                        "Title": "wish c",
                        "Description": "desc wish c",
                        "Size": "no size",
                        "Price": 500,
                        "Link": "no link",
                        "Bought": false,
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

    it("should return 1 result with Username John", function (done) {
        var buyerList = []
        http.get("http://localhost:" + testPort + "/adminAPI/wish", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var allWishes = JSON.parse(chunk);


                //find buyer = John
                for (var i = 0; i < allWishes.length; i++) {
                    console.log(allWishes[i])
                    if (allWishes[i].buyer === 'John') {
                        buyerList.push(allWishes[i]);
                    }
                }


                buyerList.length.should.equal(1);
                done();

            });

        });
    });
    //});
    it("should return 1 result with Username Jack", function (done) {
        var buyerList = []
        http.get("http://localhost:" + testPort + "/adminAPI/wish", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var allWishes = JSON.parse(chunk);


                //find buyer = Jack
                for (var i = 0; i < allWishes.length; i++) {
                    console.log(allWishes[i])
                    if (allWishes[i].buyer === 'Jack') {
                        buyerList.push(allWishes[i]);
                    }
                }


                buyerList.length.should.equal(1);
                done();

            });

        });
    });
})
