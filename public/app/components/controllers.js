angular.module('myAppRename.controllers', []).
  controller('AppCtrl', function ($scope, $http, $window,$location) {

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
    delete $window.sessionStorage.token; //Erases token when reloading page, temporary fix for authentication problems



    $scope.submit = function () {
      $scope.user.pw =SHA256($scope.user.pw);
      console.log("req.body.pw "+JSON.stringify($scope.user.pw))
      $http
        .post('/authenticate', $scope.user)
        .success(function (data, status, headers, config) {
          $location.path("/view1");
            console.log("success")
          $window.sessionStorage.token = data.token;
          $scope.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(url_base64_decode(encodedProfile));
          $scope.username = profile.username;
          $scope.isAdmin = profile.role == "admin";
          $scope.isUser = !$scope.isAdmin;
          $scope.error = null;
        })
        .error(function (data, status, headers, config) {
            console.log("failed")
          //Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          $scope.isAuthenticated = false;

          $scope.error = 'You failed to login. Invalid User or Password';
        });
    };


$scope.createUser=function(addinguser){
  console.log(JSON.stringify(addinguser))

  $http.post("/createUser",addinguser)
      .success(function(data,status, headers,config){

console.log("success "+JSON.stringify(data))

      })
      .error(function(data,sutatus, headers, config){

console.log("error")
      })



}
    $scope.logout = function () {
      $scope.isAuthenticated = false;
      $scope.isAdmin =false;
      $scope.isUser = false;
      delete $window.sessionStorage.token;
      $location.path("/view1");
    }


  })

  .controller('MyCtrl2', function ($scope) {
    // write MyCtrl2 here
  });



