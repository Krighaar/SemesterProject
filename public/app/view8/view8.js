'use strict';

angular.module('myAppRename.view8', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view8', {
            templateUrl: 'app/view8/view8.html',
            controller: 'View8Ctrl'
        });
    }])

    .controller('View8Ctrl', ['$scope', '$http', 'userFactory', function ($scope, $http, userFactory) {

        $scope.error = "";


        $scope.addUser = function (addinguser) {
            if (addinguser == undefined) {
                $scope.error = "Username and Password cannot be empty"
            }
            else if (addinguser.userName == undefined || addinguser.pw == undefined) {
                $scope.error = "Username and Password cannot be empty"
            }
            else {
                userFactory.getAllUsers().success(function (users) {
                    $scope.allUsers = users;
                    var alreadyFound = false;
                    console.log("found " + alreadyFound)
                    for (var i = 0; i < $scope.allUsers.length; i++) {
                        console.log("in loop")
                        if ($scope.allUsers[i].userName === addinguser.userName) {
                            alreadyFound = true;
                            console.log("found " + alreadyFound)
                        }
                    }


                    if (!alreadyFound) {
                        addinguser.pw = $scope.addingpw;
                        console.log(JSON.stringify(addinguser))
                        userFactory.addUser(addinguser).success(function (addeduser) {

                            $http.post("/createUser", addinguser)
                                .success(function (data, status, headers, config) {

                                    alert("You are added to Database")
                                    console.log("create success " + JSON.stringify(data))

                                })
                                .error(function (data, status, headers, config) {
                                    alert("Something is wrong. If error continues, please contact admin.")
                                    console.log("create error")


                                })


                            $scope.error = "";


                            $scope.addingUser = "";
                            $scope.addingpw = "";

                        })
                    }
                    else {
                        $scope.error = "The username is already exist. Please sign in or create an acount with another username"
                        $scope.addingUser = "";
                        $scope.addingpw = "";
                    }
                })
            }


        }

    }]);