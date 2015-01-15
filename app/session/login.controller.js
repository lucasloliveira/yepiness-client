(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name yepinessApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the yepinessApp
   */
  angular.module('yepinessApp')
    .controller('LoginCtrl', Login);

  // @ngInject
  function Login($state) {
    var vm = this;
    vm.submitLogin = function() {
      return $state.go('home');
    };
  }

})();