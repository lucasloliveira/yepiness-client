(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name yepinessApp
   * @description
   * # yepinessApp
   *
   * Main module of the application.
   */
  angular
    .module('yepinessApp')
    .config(Config);

  // @ngInject
  function Config($locationProvider, $urlRouterProvider, $authProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $authProvider.configure({
      apiUrl: 'http://localhost:3000'
    });
  }
})();