'use strict';

angular.module('yepinessApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });
  });