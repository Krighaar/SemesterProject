'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', 'wishFactory', function ($scope, wishFactory) {

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
        $scope.$apply();
        wishFactory.getWishFromUser("54785877e4b03d53943a0f58")
            .success(function (wish) {
                $scope.whises = wish;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        $scope.createWish = function createWish(wish) {

            console.log($scope.newWish._id)
            if ($scope.newWish._id != null) {

                console.log("updated");

                //Creating wishes isn't finished, needs a lot of polishing, existing bugs


                wishFactory.createWish(wish, '54785877e4b03d53943a0f58').success(function () {
                    $scope.status = 'Inserted Customer! Refreshing customer list.';

                }).
                    error(function (error) {
                        $scope.status = 'Unable to insert customer: ' + error.message;
                    });
            }
            else {

//                wishFactory.createWish(wish)
//                    .success(function () {
//                        $scope.status = 'Inserted Customer! Refreshing customer list.';
//                        console.log(wish)
//
//                    }).
//                    error(function (error) {
//                        $scope.status = 'Unable to insert customer: ' + error.message;
//                    });
//                wishFactory.getWishFromUser("54785877e4b03d53943a0f58")
//                    .success(function (wish) {
//                        $scope.whises = wish;
//                    })
//                    .error(function (error) {
//                        $scope.status = 'Unable to load customer data: ' + error.message;
//                    });
            }
            $scope.newWish = {};
        }

        //WORK IN PROGRESS, DO NOT EXPECT IT TO WORK
        $scope.remove = function remove(wishId) {
            wishFactory.removeWish(wishId)
            wishFactory.getWishFromUser("54785877e4b03d53943a0f58")
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
