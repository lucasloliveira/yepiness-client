'use strict';

angular.module('yepinessApp')
  .controller('HeaderCtrl', function ($scope, $auth) {
    $scope.template = '/views/common/header.html';

    $scope.logout = function() {
      $auth.signOut()
        .then(function() {
        })
        .catch(function(resp) {
        });
    };
  });
