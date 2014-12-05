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
    }]).controller('View4Ctrl', ['$scope', 'wishFactory', function ($scope, wishFactory) {

        $scope.buyerList = []

        var updateTobuyList = function () {
            $scope.buyerList = []
            wishFactory.getWish().success(function (allWishes) {
                for (var i = 0; i < allWishes.length; i++) {
                    if (allWishes[i].buyer === $scope.username) {
                        console.log("insde for: " + JSON.stringify(allWishes[i]))
                        $scope.buyerList.push(allWishes[i]);
                    }
                }
            })
        }

        $scope.list = [];

        // get all wishes an filter for buyer
        updateTobuyList();

        //list used for buyerList


        //var currentUser =  wishFactory.getUser(user.userName);
        //var currentUser =  wishFactory.getUser("John");

        //var id = "547858d4e4b03d53943a0f5b";

        //TODO change user:  "john is hardcoded, should be logged in user!
        wishFactory.getUser($scope.username).success(function (user) {

            $scope.userInScope = user[0];
            $scope.UserInScopeID = $scope.userInScope._id;
            console.log("user in scope " + $scope.UserInScopeID);

            console.log(user.friends);
            //})
            //    .error(function (error) {
            //        $scope.status = "unable to get friendList"
            //    })

            wishFactory.getFriends($scope.UserInScopeID).success(function (friends) {
                $scope.friendList = friends;
            })
                .error(function (error) {
                    $scope.status = "unable to get friend List"
                })
        })
        $scope.remove = function remove(id, wishTitle) {
            wishFactory.removeWish(id, wishTitle)

        }

        $scope.moveFromToList = function getCheckboxes() {
            console.log("gets inside function");
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
        }

        //get all wishes with user as boyer

        $scope.getUserBuyList = function () {
            $scope.buyerList.clear();
            for (var i = 0; i < $scope.friendsWishes; i++) {
                if ($scope.friendsWishes[i].buyer === $scope.username) {
                    $scope.buyerList.push(friendsWishes[i]);
                }

            }
        }

        //wishFactory.getFriends(id).success(function (friends) {
        //    var i = 0;
        //    friends.forEach(function(friend){
        //
        //        console.log(friend.friends)
        //       $scope.list.push(friend.friends)
        //        console.log("thsi si scope: "+$scope.list[i])
        //        i++;
        //        });
        //
        //})
        //    .error(function (error) {
        //        $scope.status = "unable to get friendList"
        //    })


        //wishFactory.getWish()
        //    .success(function (friends) {
        //        $scope.fList = friends;
        //    })
        //    .error(function (error) {
        //        $scope.status = 'Unable to load customer data: ' + error.message;
        //    });

        $scope.update = function () {
            $scope.friend = $scope.friendSelected
            console.log("update, friends selected: "+$scope.friendSelected)
            console.log("printing friends in dropdown: "+$scope.friend)
            wishFactory.getUser($scope.friend).success(function (user) {
                console.log(user)
                $scope.userId = user[0]._id;
                console.log("insinde upate id: " + $scope.userId);

                wishFactory.getWishFromUser($scope.userId).success(function (wishes) {
                    console.log("printing wishes " + wishes[0].buyer);
                    $scope.friendsWishes = wishes;

                })

            })

        }
        $scope.update();


    }
    ])
;