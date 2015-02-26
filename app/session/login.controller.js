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
  function Login($scope, $state, $auth) {
    $scope.submitLogin = function(loginForm) {
      $auth.submitLogin(loginForm).then(function(){
        $state.go('home');
      }).catch(function(response) {
      });
    };

    $scope.facebookLogin = function() {
      $auth.authenticate('facebook').then(function() {
        $state.go('home');
      }).catch(function(resp) {
      });
    };
  }

})();