'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl',['$scope', 'wishFactory', function ($scope, wishFactory) {
        //$http({
        //    method: 'GET',
        //    url: 'adminApi/user'
        //}).
        //    success(function (data, status, headers, config) {
        //        $scope.users = data;
        //        $scope.wish = data;
        //        $scope.error = null;
        //    }).
        //    error(function (data, status, headers, config) {
        //        if (status == 401) {
        //            $scope.error = "You are not authenticated to request these data";
        //            return;
        //        }
        //        $scope.error = data;
        //    });



            wishFactory.getWish()
                .success(function (wish) {
                    $scope.whises = wish;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });


        $scope.createWish = function () {

            var wish = {
                owner: req.body.user,
                Title: req.body.title,
                Description: req.body.description,
                price: req.body.price,
                Link: req.body.link,
                bought: false
            };
            dataFactory.createWish(wish)
                .success(function () {
                    $scope.status = 'Inserted Customer! Refreshing customer list.';

                }).
                error(function (error) {
                    $scope.status = 'Unable to insert customer: ' + error.message;
                });

        }

    }]);



