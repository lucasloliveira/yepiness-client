(function() {
  'use strict';

  angular.module('yepinessApp')
    .service('Yep', Yep);

  // @ngInject
  function Yep($http, ENV) {
    var base = '/api/v1/yep';

    this.create = function(newYep) {
      return $http.post(ENV.apiEndpoint + base, {
        newYep: newYep
      });
    }
  }
})();