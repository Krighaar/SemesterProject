'use strict';

angular.module('myAppRename.view7', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view7', {
      templateUrl: 'app/view7/view7.html',
      controller: 'View7Ctrl'
    });
  }])
  .controller('View7Ctrl', ['$scope', '$http','wishFactory','userFactory', function ($scope, $http,wishFactory,userFactory) {


var changingUser={};
var currentRole;

      $scope.editUser = function () {

        if($scope.isAdmin)
        {currentRole="superUser"}
        else
        {currentRole="user"}

        changingUser.userName=$scope.username;
        changingUser.role=currentRole;
        changingUser.pw=$scope.changingpw;

        console.log(changingUser)
              $http.put("/editUser",changingUser)
                  .success(function(data,status, headers,config){


                    console.log("change success "+JSON.stringify(data))

                  })
                  .error(function(data,status, headers, config){

                    console.log("change error")
                  })


              $scope.error="";

              alert("Your Password has been changed")
              $scope.changingUser="";
              $scope.changingpw="";

            }
  }]);