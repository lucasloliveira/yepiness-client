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
  .module('yepinessApp', ['ui.router'])
  .config(function($locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

  });
