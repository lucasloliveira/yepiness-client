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
  function Config($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }
})();