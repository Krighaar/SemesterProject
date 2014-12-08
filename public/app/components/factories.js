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
        return $http.put(urlBase+'/'+wish,wish)
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

    wishFactory.getWishFromWishId = function(id){
        return $http.get(urlBase +'/wish/wish/'+id)
    }
    wishFactory.getUserFromWishId = function(id){
        return $http.get(urlBase +'/wish/user/'+id)
    }

    //add friend til friend lsit
    wishFactory.addFriendToList = function(id,friendName){
        console.log(id)
        return $http.put(urlBase+'/addfriend/'+id,friendName);
    }

    //
    wishFactory.addWishToBuyList = function(id,wish){
        console.log("id is: "+id)
        console.log("wish is: "+wish)
        return $http.put(urlBase+'/addToBuyList/wish/'+id,wish)
    }

    wishFactory.buyWish = function(wishId, bought){
        return $http.put(urlBase+'/buy/wish/'+wishId,bought)
    }

    return wishFactory;
}]);

app.factory('userFactory', ['$http', function ($http) {


    var urlBase = 'adminApi/userAdmin/';
    var userFactory = {};
    userFactory.getAllUsers = function(){
        return $http.get("/adminApi")
    }
    userFactory.removeUser = function(id){
        return $http.delete(urlBase+id)
    }

    userFactory.addUser = function(userjson){
        return $http.post(urlBase,userjson)
    }

    userFactory.getAllUsers = function(){
        return $http.get('adminApi/')
    }

    return userFactory;
}]);
