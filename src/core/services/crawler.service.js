(function() {
  'use strict';

  angular.module('yepinessApp')
    .service('Crawler', Crawler);

  // @ngInject
  function Crawler($http, ENV) {
    var base = '/api/v1/crawler';

    this.crawl = function (newYep){
      return $http.get(ENV.apiEndpoint + base, {
        params: {
          yepContent: newYep
        }
      });
    };
  }
})();