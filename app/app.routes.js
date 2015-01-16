(function () {
  'use strict';

  angular.module('yepinessApp')
    .config(Routes);

  // @ngInject
  function Routes($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl as home'
      })
      .state('login', {
        url: '/',
        templateUrl: 'session/login.html',
        controller: 'LoginCtrl as login'
      });
  }
})();