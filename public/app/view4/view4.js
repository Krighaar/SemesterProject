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

        $scope.list = [];

        //var currentUser =  wishFactory.getUser(user.userName);
        //var currentUser =  wishFactory.getUser("John");

        var id = "547858d4e4b03d53943a0f5b";
        
        
        wishFactory.getUser("John").success(function (user) {

            $scope.userInScope = user;
            console.log($scope.userInScope);

            console.log(user.friends);
        })
            .error(function (error) {
                $scope.status = "unable to get friendList"
            })

        wishFactory.getFriends(id).success(function (wish) {

            $scope.wishes = wish;
            console.log($scope.wishes);


        })
            .error(function (error) {
                $scope.status = "unable to get wishes"
            })

        $scope.remove = function remove(id,wishTitle) {
            wishFactory.removeWish(id,wishTitle)

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
            console.log($scope.friend)
            wishFactory.getUser($scope.friend).success(function (user) {
                console.log(user)
                $scope.userId = user[0]._id;
                console.log($scope.userId);

                wishFactory.getWishFromUser($scope.userId).success(function (wishes) {
                    console.log("printing wishes" + wishes[0].title);
                    $scope.friendsWishes = wishes;
                })
            })
        }
    }]);