'use strict';

angular.module('myAppRename.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'app/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'userFactory', 'wishFactory', function ($scope, userFactory, wishFactory) {

      var allCatArray = [];
      var filteredArray = [];

      userFactory.getAllUsers().success(function (users) {
        $scope.AllUsers = users;

      });
      wishFactory.getWish().success(function(wishes){
        $scope.AllWishes = wishes;

      $scope.currentPage = 1;
      for (var i = 0; i < wishes.length; i++) {
        allCatArray.push(wishes[i]);
        $scope.responseArray.push(wishes[i]);
      }
      $scope.totalItems = $scope.responseArray.length
    })

      $scope.$watch('currentPage', function () {
        if ($scope.currentPage < 0) {
          $scope.currentPage = 1
        }
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filteredCategories = $scope.responseArray.slice(begin, end);
      });

      $scope.numPerPage = 10;
      $scope.currentPage = 0;
      $scope.responseArray = [];
      $scope.maxSize = 10;

        $scope.addFriend = function addFriend(user) {
            console.log("selected user: " + user)

            wishFactory.getUser($scope.username).success(function (currentUser) {

                var id = currentUser[0]._id;//'547f81a51bbb964c2195d3c4'
                var theUser = {
                    user: user
                }
console.log(id)
                wishFactory.addFriendToList(id, theUser).success(function () {
                    $scope.status = 'Inserted user to friendslist!';
                }).
                    error(function (error) {
                        $scope.status = 'Unable to insert user to friendlist: ' + error.message;
                    });
            });
        }
}]);