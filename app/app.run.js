(function () {
  'use strict';

  angular.module('yepinessApp')
    .run(Run);

  // @ngInject
  function Run($rootScope, $auth, $state) {

    $rootScope.$on('auth:validation-success', function() {
      loggedSuccess();
    });

    $rootScope.$on('auth:validation-error', function() {
      logout();
    });

    $rootScope.$on('auth:login-success', function(ev) {
      loggedSuccess();
    });

    $rootScope.$on('auth:logout-success', function(ev) {
      logout();
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      $auth.validateUser().catch(function () {
        $state.go('login');
      });
    });

    var loggedSuccess = function() {
      $state.go('home');
      $rootScope.logged = true;
    };

    var logout = function() {
      $state.go('login');
      $rootScope.logged = false;
    };
  }
})();