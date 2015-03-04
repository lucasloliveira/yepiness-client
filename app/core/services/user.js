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
  }
})();