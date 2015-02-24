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
  function Login($state, $auth) {
    var vm = this;
    vm.submitLogin = function(loginForm) {
      $auth.submitLogin(loginForm).then(function(response){
        console.log(response);
        $state.go('home');
      }).catch(function(response) {
        console.log(response);
      });
    };

    vm.facebookLogin = function() {
      $auth.authenticate('facebook').then(function(resp) {

        $state.go('home');
      }).catch(function(resp) {
        console.log(resp);
      });
    };
  }

})();