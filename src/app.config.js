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
  function Config($locationProvider, $urlRouterProvider, $authProvider, ENV) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $authProvider.configure({
      apiUrl: ENV.apiEndpoint,
      authProviderPaths: {
        facebook: '/auth/facebook'
      }
    });
  }
})();
