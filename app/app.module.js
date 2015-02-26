(function () {
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
    .module('yepinessApp', ['config', 'ui.router', 'ui.bootstrap', 'ng-token-auth', 'monospaced.elastic']);
})();