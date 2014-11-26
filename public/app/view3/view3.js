'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', 'wishFactory', function ($scope, wishFactory) {


        wishFactory.getWish()
            .success(function (wish) {
                $scope.whises = wish;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        $scope.createWish = function createWish(wish) {

            wishFactory.createWish(wish)
                .success(function () {
                    $scope.status = 'Inserted Customer! Refreshing customer list.';

                }).
                error(function (error) {
                    $scope.status = 'Unable to insert customer: ' + error.message;
                });
            wishFactory.getWish()
                .success(function (wish) {
                    $scope.whises = wish;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }

        $scope.remove = function remove(userName) {
            wishFactory.removeWish(userName)
            wishFactory.getWish()
                .success(function (wish) {
                    $scope.whises = wish;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }

        $scope.edit = function(wish){
            console.log(wish)
            $scope.newWish = wish;
        }

    }]);



