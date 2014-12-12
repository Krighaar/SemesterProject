/**
 * Created by Peter on 27-11-2014.
 */
'use strict';

angular.module('myAppRename.view5', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }]).controller('View5Ctrl', ['$scope', '$http', 'userFactory', function ($scope, $http, userFactory) {
        $scope.isSuper = false;
        console.log($scope.isUser)
        console.log($scope.isAdmin)
        if ($scope.isAdmin) {
            $scope.isSuper = true;
        }


        $scope.list = [];


            userFactory.getAllUsers().success(function (users) {
                    $scope.allUsers = users;
                    console.log(JSON.stringify(users))
                }
            )

        $scope.removeUser = function (deletinguser) {
            var deletingId = deletinguser._id;
            var deletingUser = {
                userName: deletinguser.userName
            }

            userFactory.removeUser(deletingId).success(function (deletedUser) {

                userFactory.getAllUsers().success(function (users) {
                    alert(deletedUser.userName + " is deleted")
                    $scope.allUsers = users;
                })

            })
                .error(function (error) {
                    $scope.status = "unable to get wishes"
                })

            $http.delete("/deleteUser", {data: deletingUser, headers: {'Content-Type': 'application/json'}})
                .success(function (data, status, headers, config) {

                    console.log("delete success " + JSON.stringify(data))

                })
                .error(function (data, sutatus, headers, config) {

                    console.log("delete error")
                })


        }


        //$scope.update = function () {
        //    $scope.friend = $scope.friendSelected
        //    console.log($scope.friend)
        //    wishFactory.getUser($scope.friend).success(function (user) {
        //        console.log(user)
        //        $scope.userId = user[0]._id;
        //        console.log("insinde upate id: "+$scope.userId);
        //
        //        wishFactory.getWishFromUser($scope.userId).success(function (wishes) {
        //            console.log("printing wishes" + wishes[0].title);
        //            $scope.friendsWishes = wishes;
        //        })
        //    })
        //}
    }]);