(function () {
  'use strict';

  angular.module('yepinessApp')
    .config(Routes);

  function Routes($stateProvider) {
    $stateProvider
//      .state('home', {
//        url: '/',
//        templateUrl: 'home/home.html',
//        controller: 'HomeCtrl as home'
//      })
      .state('login', {
        url: '/',
        templateUrl: 'session/login.view.html',
        controller: 'LoginCtrl as login'
      });
  }
})();