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



        userFactory.getAllUsers().success(function(users) {
                $scope.allUsers = users;
            }

        )



      $scope.removeUser=function(id) {

          userFactory.removeUser(id).success(function (deletedUser) {

              userFactory.getAllUsers().success(function(users) {
                  alert(deletedUser.userName+" is deleted")
                  $scope.allUsers = users;
              })





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