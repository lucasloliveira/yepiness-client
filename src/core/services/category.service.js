(function() {
  'use strict';

  angular.module('app')
    .service('Category', Category);

  // @ngInject
  function Category($http, ENV) {
    var base = '/api/v1/category';

    this.list = function() {
      return $http.get(ENV.apiEndpoint + base);
    }
  }
})();
