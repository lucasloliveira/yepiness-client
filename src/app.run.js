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

    $rootScope.$on('auth:login-success', function() {
      loggedSuccess();
      $state.go('home');
    });

    $rootScope.$on('auth:logout-success', function() {
      logout();
    });

    //$rootScope.$on('$locationChangeSuccess', function(resp) {
    //  $auth.validateUser().catch(function (response) {
    //    console.log(response);
    //    console.log(resp);
    //    $state.go('signin');
    //  });
    //});

    var loggedSuccess = function() {
      $rootScope.logged = true;
    };

    var logout = function() {
      $state.go('signin');
      $rootScope.logged = false;
    };
  }
})();
