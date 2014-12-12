'use strict';

angular.module('myAppRename.view7', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view7', {
            templateUrl: 'app/view7/view7.html',
            controller: 'View7Ctrl'
        });
    }])
    .controller('View7Ctrl', ['$scope', '$http', 'wishFactory', 'userFactory', function ($scope, $http, wishFactory, userFactory) {

        $scope.error = "";
        var changingUser = {};
        var currentRole;

        $scope.editUser = function () {
            $scope.error = "";
            if ($scope.isAdmin) {
                currentRole = "superUser"
            }
            else {
                currentRole = "user"
            }

            changingUser.userName = $scope.username;
            changingUser.role = currentRole;
            changingUser.pw = $scope.changingpw;

            if (changingUser.pw == undefined) {
                $scope.error = "Password cannot be empty"
            }
            else {
                console.log(changingUser)
                $http.put("/editUser", changingUser)
                    .success(function (data, status, headers, config) {


                        console.log("change success " + JSON.stringify(data))
                        alert("Your Password has been changed")

                    })
                    .error(function (data, status, headers, config) {

                        console.log("change error")
                        alert("ERROR! Your Password has not been changed. If error continues, please contact admin ")
                    })


                $scope.error = "";


                $scope.changingUser = "";
                $scope.changingpw = "";

            }
        }
    }]);