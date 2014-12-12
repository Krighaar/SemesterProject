/**
 * Created by Peter on 27-11-2014.
 */
'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'View4Ctrl'
        });
    }]).controller('View4Ctrl', ['$scope', 'wishFactory', function ($scope, wishFactory, emptyWishlist) {

        $scope.buyerList = []
        $scope.status = "";
        $scope.messageIfWishListIsEmpty = ""


        function getUserBuyList() {
            $scope.buyerList = [];

            wishFactory.getWish().success(function (wishes) {
                console.log("getting wishes in buyer list")
                for (var i = 0; i < wishes.length; i++) {
                 //   console.log("looking at wish: " + JSON.stringify(wishes[i]))
                    if (wishes[i].buyer == $scope.username && !wishes[i].bought) {
                        $scope.buyerList.push(wishes[i]);
                    }

                }
            })
                .error(function () {
                    $scope.status = "unable to get List"
                    console.log("not succes")
                })
        }

        if ($scope.isAuthenticated) {
            getUserBuyList();
            $scope.list = [];

            wishFactory.getUser($scope.username).success(function (user) {

                $scope.userInScope = user[0];
                $scope.UserInScopeID = $scope.userInScope._id;
                //console.log("user in scope " + $scope.UserInScopeID);

               // console.log(user.friends);

                wishFactory.getFriends($scope.UserInScopeID).success(function (friends) {
                    $scope.friendList = friends;
                })
                    .error(function (error) {
                        $scope.status = "unable to get friend List"
                    })
            })

        }
        $scope.remove = function remove(id, wishTitle) {
            wishFactory.removeWish(id, wishTitle).success(function () {

                $scope.messageIfWishListIsEmpty = ""
                getUserBuyList()
                $scope.update();
            })

        }

        $scope.moveFromToList = function getCheckboxes() {
            //console.log("gets inside function");
            var checkedValue = null;

            for (var i = 0; $scope.friendsWishes; ++i) {
                console.log($scope.friendsWishes[i])
                if ($scope.friendsWishes[i].bought.checked) {
                    $scope.list.push($scope.friendsWishes[i])
                }
            }
            for (var i = 0; i < $scope.list.length; i++) {
                console.log($scope.list[i])
                console.log($scope.list[i].title)
            }

            $scope.messageIfWishListIsEmpty = ""
            getUserBuyList()
            $scope.update();
        }

        //get all wishes with user as boyer


        //Remove wish from tobuy list Sets buyer to Empty
        $scope.releaseWish = function (wish) {
            var buyer = {
                buyer: ""
            }
            wishFactory.addWishToBuyList(wish._id, buyer).success(function (msg) {

                $scope.messageIfWishListIsEmpty = ""
                getUserBuyList()
                $scope.update();
                console.log("wish removed from tobuy " + msg)
            })
        }

        $scope.update = function () {
            if ($scope.isAuthenticated) {
                $scope.friendsWishes = [];
                $scope.friend = $scope.friendSelected
                //console.log("update, friends selected: " + $scope.friendSelected)
                //console.log("printing friends in dropdown: " + $scope.friend)
                wishFactory.getUser($scope.friend).success(function (user) {
                    console.log(user)
                    $scope.userId = user[0]._id;
                  //  console.log("insinde upate id: " + $scope.userId);

                    wishFactory.getWishFromUser($scope.userId).success(function (wishes) {
                    //    console.log("printing wishes " + wishes);

                        for (var i = 0; i < wishes.length; i++) {
                            if (wishes[i].buyer === '' || wishes[i].buyer === undefined)
                                $scope.friendsWishes.push(wishes[i])
                        }

                        if (!$scope.friendsWishes.length > 0) {
                            $scope.messageIfWishListIsEmpty = "Sorry no wishes is available for this user."
                        }
                        else {
                            $scope.messageIfWishListIsEmpty = ""
                        }

                    })

                })
            }
        }
        //$scope.update();

        $scope.addWishToBuyList = function (wish) {
            console.log("wish id: " + wish._id)
            var buyer = {
                "buyer": $scope.username
            }
            wishFactory.addWishToBuyList(wish._id, buyer).success(function (msg) {

                $scope.messageIfWishListIsEmpty = ""
                getUserBuyList();
                $scope.update();
                console.log("wish added to tobuy " + msg)
            })

        }

        $scope.buyWish = function (wish) {
            var bought = {
                bought: true
            }
            wishFactory.buyWish(wish._id, bought).success(function (msg) {

                $scope.messageIfWishListIsEmpty = ""
                getUserBuyList()
                $scope.update();
                console.log("wish added to tobuy " + msg)


            })
        }


        $scope.removeFriend = function (user) {


            wishFactory.getUser($scope.username).success(function (currentUser) {

                var id = currentUser[0]._id;
                console.log("id in remove friend " + id)
                var theSelectedUser = {
                    user: user
                }


                wishFactory.removeFriendFromList(id, theSelectedUser).success(function () {

                    $scope.status = 'Removed user from friendslist!';

                    wishFactory.getFriends($scope.UserInScopeID).success(function (friends) {
                        $scope.friendList = friends;
                    })
                        .error(function (error) {
                            $scope.status = "unable to get friend List"
                        })


                }).error(function (error) {
                    $scope.status = 'Unable to remove user from friendlist: ' + error.message;
                });
            })


        }

    }
    ])
;