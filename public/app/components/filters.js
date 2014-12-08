'use strict';

/* Filters */

angular.module('myAppRename.filters', []).
  filter('checkmark', function () {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  }).filter('emptyWishlist',function(){
        return function(wishlist){
            return (wishlist != '' || wishlist != undefined) ? wishlist : "Sorry no wish available"
        }
    });
