'use strict';

angular.module('myAppRename.view8', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view8', {
    templateUrl: 'app/view8/view8.html',
    controller: 'View8Ctrl'
  });
}])

.controller('View8Ctrl',['$scope', '$http','userFactory', function ($scope, $http,userFactory) {




      $scope.addUser = function (addinguser) {

          userFactory.getAllUsers().success(function(users) {
              $scope.allUsers = users;
          var alreadyFound=false;
          console.log("found "+alreadyFound)
        for(var i=0;i<$scope.allUsers.length;i++)
          {console.log("in loop")
              if( $scope.allUsers[i].userName===addinguser.userName)
          {  alreadyFound=true;
              console.log("found "+alreadyFound)
          }}


          if(!alreadyFound){
        addinguser.pw=SHA256($scope.addingpw);
          console.log(JSON.stringify(addinguser))
      userFactory.addUser(addinguser).success(function (addeduser) {


              $http.post("/createUser",addinguser)
                  .success(function(data,status, headers,config){


                      console.log("create success "+JSON.stringify(data))

                  })
                  .error(function(data,status, headers, config){

                      console.log("create error")
                  })





          $scope.error="";

        alert("You are added to mongo")
          $scope.addingUser="";
           $scope.addingpw="";

      })}
          else
{$scope.error="The username is already exist. Please sign in or create an acount with another username"
    $scope.addingUser="";
    $scope.addingpw="";
}})
    }







    }]);