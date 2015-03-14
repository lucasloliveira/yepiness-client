(function() {
  'use strict';

  angular.module('yepinessApp')
    .service('User', User);

  // @ngInject
  function User($http, ENV) {
    var base = '/api/v1/user';

    this.friendsCount = function (){
      return $http.get(ENV.apiEndpoint + base + '/friends/count');
    };

    this.friends = function(){
      return $http.get(ENV.apiEndpoint + base + '/friends');
    };

    this.get = function(id) {
      return $http.get(ENV.apiEndpoint + base + '/' + id);
    };

    this.addFriend = function(friendId) {
      return $http.post(ENV.apiEndpoint + base + '/addFriend/' + friendId);
    }
  }
})();
