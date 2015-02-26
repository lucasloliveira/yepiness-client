(function () {
  'use strict';

  angular.module('yepinessApp')
    .run(Run);

  // @ngInject
  function Run($rootScope, $state) {

    $rootScope.$on('auth:validation-success', function() {
      $state.go('home');
    });

    $rootScope.$on('auth:validation-error', function() {
      $state.go('login');
    });
  }
})();