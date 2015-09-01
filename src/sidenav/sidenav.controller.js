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
  function Sidenav($scope, CategoryService) {

    CategoryService.list().then(function(response){
      $scope.categories = response.data;
    });
  }

})();