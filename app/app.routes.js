(function () {
  'use strict';

  angular.module('yepinessApp')
    .config(Routes);

  // @ngInject
  function Routes($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'FeedCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      });
  }
})();