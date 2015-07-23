(function() {
  'use strict';

  angular.module('app')
    .service('CategoryService', CategoryService);

  // @ngInject
  function CategoryService($http, ENV) {
    var base = '/api/v1/category';

    this.list = function (){
      return $http.get(ENV.apiEndpoint + base);
    };
  }
})();
