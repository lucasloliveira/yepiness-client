(function () {
  'use strict';

  angular.module('yepinessApp')
    .config(Routes);

  function Routes($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl as home'
      });
  };
})();