/**
 * Created by Peter on 27-11-2014.
 */
'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'View4Ctrl'
        });
    }]).controller('View4Ctrl', ['$scope', 'wishFactory', function ($scope, wishFactory) {

        wishFactory.getWish()
            .success(function (friends) {
                $scope.fList = friends;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        $scope.update = function() {

                $scope.whi = $scope.item
            console.log($scope.whi)

        }
    }]);