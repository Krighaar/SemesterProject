angular.module('myAppRename.controllers',[]).
  controller('AppCtrl', function ($scope, $http, $window,$location, wishFactory) {

    function url_base64_decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }




    $scope.title = "Semester Project";
    $scope.username = "";
    $scope.isAuthenticated = false;
    $scope.isAdmin = false;
    $scope.isUser = false;
    $scope.message = '';
    $scope.error = null;
      $scope.isSuper=false;



    $scope.submit = function () {


     if ($scope.user==undefined)
     {$scope.error="Username and Password cannot be empty"
     }
      else if($scope.user.pw==undefined||$scope.user.userName==undefined)
      {$scope.error="Username and Password cannot be empty"
      }
      else{
      $http
        .post('/authenticate', $scope.user)
        .success(function (data, status, headers, config) {
          $location.path("/view3");
            console.log("success")
          $window.sessionStorage.token = data.token;
          $scope.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(url_base64_decode(encodedProfile));
          $scope.username = profile.username;
            wishFactory.getUser($scope.username).success(function(user){
            console.log("inside controllers "+JSON.stringify(user[0]))
              $scope.loggedInUser = user[0];
            })


            console.log("before check of admin: "+ JSON.stringify(profile))
          $scope.isAdmin = profile.role === "admin";
          $scope.isUser = !$scope.isAdmin;
          $scope.error = null;
            $scope.user= null;

        })
        .error(function (data, status, headers, config) {
            console.log("failed" + data)
          //Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          $scope.isAuthenticated = false;
          $scope.user= null;
          $scope.error = 'You failed to login. Invalid User or Password';
        });}
    };



    $scope.logout = function () {
      $scope.isAuthenticated = false;
      $scope.isAdmin =false;
      $scope.isUser = false;
      $scope.username="";
      $scope.isSuper=false;
      $scope.user="";
      delete $window.sessionStorage.token;
      $location.path("/view3");
    }


  })

  .controller('MyCtrl2', function ($scope) {
    // write MyCtrl2 here
  });



