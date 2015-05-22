(function () {
  'use strict';

  angular.module('app')
    .run(Run);

  // @ngInject
  function Run($rootScope, Permission, $auth, $state) {

    $rootScope.$on('auth:validation-success', function() {
      loggedSuccess();
    });

    $rootScope.$on('auth:validation-error', function() {
      logout();
    });

    $rootScope.$on('auth:login-success', function() {
      loggedSuccess();
      $state.go('home');
    });

    $rootScope.$on('auth:logout-success', function() {
      logout();
    });

    var loggedSuccess = function() {
      $rootScope.logged = true;
    };

    var logout = function() {
      $state.go('signin');
      $rootScope.logged = false;
    };

    Permission.defineRole('user', function(){
      return $auth.validateUser();
    });
  }
})();
