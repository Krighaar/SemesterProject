'use strict';

angular.module('myAppRename.view8', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view8', {
    templateUrl: 'app/view8/view8.html',
    controller: 'View8Ctrl'
  });
}])

.controller('View8Ctrl',['$scope', 'userFactory', function ($scope, userFactory) {

      $scope.addUser = function () {

      userFactory.addUser($scope.addingUser).success(function (addeduser) {
        alert("You are added to mongo")
        console.log(addeduser);

      })
    }






    }]);