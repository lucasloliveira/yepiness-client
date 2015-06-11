(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app
   * @description
   * # app
   *
   * Main module of the application.
   */
  angular
    .module('app')
    .config(Config);

  // @ngInject
  function Config($locationProvider, $urlRouterProvider, $authProvider, ENV, $mdThemingProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
      rewriteLinks: true
    }).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $authProvider.configure({
      apiUrl: ENV.apiEndpoint,
      authProviderPaths: {
        facebook: '/auth/facebook'
      }
    });

    $mdThemingProvider.theme('default')
      .accentPalette('orange');
  }
})();
