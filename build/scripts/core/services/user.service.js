(function() {
  'use strict';

  angular.module('app')
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
      return $http.post(ENV.apiEndpoint + base + '/friends/add/' + friendId);
    };

    this.receivedRequests = function() {
      return $http.get(ENV.apiEndpoint + base + '/friends/received');
    };

    this.sentRequests = function() {
      return $http.get(ENV.apiEndpoint + base + '/friends/sent');
    };

    this.acceptFriend = function(friendId) {
      return $http.post(ENV.apiEndpoint + base + '/friends/accept/' + friendId);
    };

    this.declineFriend = function(friendId) {
      return $http.post(ENV.apiEndpoint + base + '/friends/decline/' + friendId);
    };

    this.removeFriend = function(friendId) {
      return $http.post(ENV.apiEndpoint + base + '/friends/remove/' + friendId);
    };

  }
  User.$inject = ["$http", "ENV"];
})();
