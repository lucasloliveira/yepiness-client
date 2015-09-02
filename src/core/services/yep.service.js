(function() {
  'use strict';

  angular.module('app')
    .service('YepService', YepService);

  // @ngInject
  function YepService($http, ENV) {
    var base = '/api/v1/yep';

    this.create = function(newYep) {
      return $http.post(ENV.apiEndpoint + base, {
        newYep: newYep
      });
    };

    this.update = function(yep) {
      return $http.put(ENV.apiEndpoint + base, {
        yep: yep
      })
    };

    this.sent = function() {
      return $http.get(ENV.apiEndpoint + base + '/sent');
    };

    this.received = function() {
      return $http.get(ENV.apiEndpoint + base + '/received');
    };
  }
})();
