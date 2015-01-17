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

    this.tabs = [
      {title: "Indications Received"},
      {title: "My Indications"}
    ];

    this.abaSelecionada = 'opa!';

    this.changeTab = function(tab) {
      this.abaSelecionada = tab.title;
    };
  }
})();