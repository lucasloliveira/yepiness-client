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

  Config.$inject = ['$locationProvider', '$urlRouterProvider'];

  function Config($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }
})();