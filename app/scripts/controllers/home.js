'use strict';

/**
 * @ngdoc function
 * @name yepinessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yepinessApp
 */
angular.module('yepinessApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
