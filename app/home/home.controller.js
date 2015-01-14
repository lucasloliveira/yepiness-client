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
    .controller('HomeCtrl', Home);

  function Home() {
    var vm = this;
    vm.title = 'Titulo do site';
    vm.checkSomething = checkSomething;


    function checkSomething() {
      return 'ok';
    };
  }

})();