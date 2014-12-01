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
    }]).controller('View5Ctrl', ['$scope', 'userFactory', function ($scope, userFactory) {
if($scope.isUser)
{$scope.isSuper=true;}


        $scope.list = [];

        //var currentUser =  wishFactory.getUser(user.userName);
        //var currentUser =  wishFactory.getUser("John");

 //       var id = "547858d4e4b03d53943a0f5b";

        userFactory.getAllUsers().success(function(users) {
                $scope.allUsers = users;
            }

        )



      $scope.removeUser=function(json) {

          userFactory.removeUser(userID).success(function (deletedUser) {







          })
              .error(function (error) {
                  $scope.status = "unable to get wishes"
              })
      }



        $scope.update = function () {
            $scope.friend = $scope.friendSelected
            console.log($scope.friend)
            wishFactory.getUser($scope.friend).success(function (user) {
                console.log(user)
                $scope.userId = user[0]._id;
                console.log("insinde upate id: "+$scope.userId);

                wishFactory.getWishFromUser($scope.userId).success(function (wishes) {
                    console.log("printing wishes" + wishes[0].title);
                    $scope.friendsWishes = wishes;
                })
            })
        }
    }]);