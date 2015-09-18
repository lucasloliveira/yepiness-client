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

    this.updateCategory = function(yep) {
      return $http.put(ENV.apiEndpoint + base + '/' + yep.id + '/category/' + yep.category.id);
    };

    this.updateRating = function(yep, rating) {
      return $http.put(ENV.apiEndpoint + base + '/' + yep.id + '/rating/' + rating);
    };

    this.sent = function() {
      return $http.get(ENV.apiEndpoint + base + '/sent');
    };

    this.received = function() {
      return $http.get(ENV.apiEndpoint + base + '/received');
    };
  }
})();
