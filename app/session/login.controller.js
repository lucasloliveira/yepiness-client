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

  Login.$inject = ['$state']

  function Login($state) {
    var vm = this;
    vm.title = 'Titulo do site';
    vm.submitLogin = submitLogin;


    function submitLogin() {
      return $state.go('home');
    };
  }

})();