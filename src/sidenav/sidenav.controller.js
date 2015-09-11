(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:SidenavCtrl
   * @description
   * # SidenavCtrl
   * Controller of the app
   */
  angular.module('app')
    .controller('SidenavCtrl', Sidenav);

  // @ngInject
  function Sidenav($rootScope, $scope, categories) {
    $scope.categories = categories.data;

    $scope.changeCategory = function (category) {
      $rootScope.$broadcast('filterCategory', category);
    }
  }

})();
