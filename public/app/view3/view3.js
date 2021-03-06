'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', 'wishFactory', function ($scope, wishFactory) {

        var idUserLoggedIn;
        //$scope.toBuy = [];
        //$scope.moveFromToList = function getCheckboxes() {
        //    console.log("gets inside function");
        //    var checkedValue = null;
        //    var inputElements = document.getElementsByClassName('checkboxWishlist');
        //    for (var i = 0; inputElements[i]; ++i) {
        //        if (inputElements[i].checked) {
        //            checkedValue = inputElements[i].value;
        //            console.log(inputElements[i]);
        //            console.log($scope.whises);
        //        }
        //    }
        //}

        if ($scope.isAuthenticated) {
            wishFactory.getUser($scope.username).success(function (id) {
                console.log("id of logged in user: " + id[0]._id)
                idUserLoggedIn = id[0]._id;

                wishFactory.getWishFromUser(idUserLoggedIn)
                    .success(function (wish) {
                        $scope.whises = wish;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load customer data: ' + error.message;
                    });


            })

        }

        $scope.createWish = function createWish(wish) {

            console.log($scope.newWish._id)
            if ($scope.newWish._id != null) {


                wishFactory.updateWish($scope.newWish._id, $scope.newWish).success(function () {
                    $scope.status = 'Your wish is updated';
                }).
                    error(function (error) {
                        $scope.status = 'Unable to update your wish ';
                        console.log(error.message)
                    });
                $scope.newWish = null;


            }
            else {

                wishFactory.createWish(wish, idUserLoggedIn).success(function () {
                    $scope.status = 'Inserted Customer! Refreshing customer list.';

                }).
                    error(function (error) {
                        $scope.status = 'Unable to insert customer: ' + error.message;
                    });
//                wishFactory.createWish(wish)
//                    .success(function () {
//                        $scope.status = 'Inserted Customer! Refreshing customer list.';
//                        console.log(wish)
//
//                    }).
//                    error(function (error) {
//                        $scope.status = 'Unable to insert customer: ' + error.message;
//                    });
                wishFactory.getWishFromUser(idUserLoggedIn)
                    .success(function (wish) {
                        $scope.whises = wish;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load customer data: ' + error.message;
                    });
            }
            $scope.newWish = {};
        }

        $scope.removeWishByID = function (wishId) {
            console.log('before factory');
            wishFactory.removeWish(wishId);
            wishFactory.getWishFromUser(idUserLoggedIn)
                .success(function (wish) {
                    $scope.whises = wish;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }

        $scope.edit = function (wish) {
            $scope.newWish = wish;
        }

    }
    ])
;
