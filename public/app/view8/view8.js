'use strict';

angular.module('myAppRename.view8', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view8', {
    templateUrl: 'app/view8/view8.html',
    controller: 'View8Ctrl'
  });
}])

.controller('View8Ctrl',['$scope', '$http','userFactory', function ($scope, $http,userFactory) {

$scope.adddingpw;


      $scope.addUser = function (addinguser) {
        addinguser.pw=SHA256($scope.addingpw);
          console.log(JSON.stringify(addinguser))
      userFactory.addUser(addinguser).success(function (addeduser) {
        alert("You are added to mongo")




      })
    }

        $scope.createUser=function(addinguser){
            console.log(JSON.stringify(addinguser))

            $http.post("/createUser",addinguser)
                .success(function(data,status, headers,config){

                    console.log("create success "+JSON.stringify(data))

                })
                .error(function(data,sutatus, headers, config){

                    console.log("create error")
                })



        }





    }]);