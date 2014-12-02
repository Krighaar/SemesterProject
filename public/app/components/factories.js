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

    wishFactory.getUser = function(userName){
        return $http.get(urlBase+ '/findUser/'+userName)
    }

    wishFactory.getWish = function () {
        return $http.get(urlBase + '/wish')
    }
    wishFactory.removeWish=function(wish) {
        return $http.delete(urlBase +'/'+wish)
    }
    wishFactory.createWish=function(wish, id) {
        console.log(id)
        return $http.put(urlBase+'/'+id,wish);
    }
    wishFactory.getFriendsList=function() {
        return $http.get(urlBase+'/friends');
    }

    wishFactory.getFriends=function(id) {
        return $http.get(urlBase +'/friends/'+id)
    }

    wishFactory.getWishFromUser = function(id) {
        return $http.get(urlBase +'/wish/'+id)
    }

    return wishFactory;
}]);

app.factory('userFactory', ['$http', function ($http) {

    var urlJAVAREST = 'sunnycop.cloudapp.net:9876/user';
    var urlBase = 'adminApi/userAdmin';
    var userFactory = {};
    userFactory.getAllUsers = function(){
        return $http.get("/adminApi")
    }
    userFactory.removeUser = function(userjson){
        return $http.delete(urlBase,userjson)
    }

    userFactory.addUser = function(userjson){
        return $http.post(urlBase,userjson)
    }


    return userFactory;
}]);
