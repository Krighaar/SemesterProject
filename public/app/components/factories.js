'use strict';

/* Factories */


var app = angular.module('myAppRename.factories', [])

app.factory('InfoFactory', function () {
    var info = "Hello World from a Factory";
    var getInfo = function getInfo() {
        return info;
    }
    return {
        getInfo: getInfo
    }
})
app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        }
    };
})
app.factory('wishFactory', ['$http', function ($http) {

    var urlBase = '/adminApi';
    var wishFactory = {};

    wishFactory.createWish = function (wish) {
        return $http.post(urlBase, wish)
    }
    wishFactory.getWish = function () {
        return $http.get(urlBase + '/user')
    }
    wishFactory.removeWish=function(wish) {
        return $http.delete(urlBase +'/'+wish)
    }

    return wishFactory;
}]);
