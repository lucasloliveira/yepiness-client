(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:ProfileCtrl
   * @description
   * # ProfileCtrl
   * Controller of the app
   */
  angular.module('app')
    .controller('ProfileCtrl', Profile);

  // @ngInject
  function Profile($scope, $stateParams, User) {

    User.get($stateParams.uid).success(function(response){
      $scope.profileUser = response;
    });

    $scope.addFriend = function(friendId) {
      User.addFriend(friendId).success(function(response){
        console.log(response.message);
      });
    };
  }

})();
