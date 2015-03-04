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
    .controller('YepCtrl', Yep);

  function Yep($scope, YepService) {

    $scope.current = 'feed/feed.html';

    $scope.tabs = [
      {title: 'Indications Received', type: 'received'},
      {title: 'My Indications', type: 'sent'}
    ];

    YepService.sent().success(function(response) {
      $scope.groupedIndicationsSent = [
        {
          date: 'Saturday 8th June',
          indications: response
        }
      ]
    });

    YepService.received().success(function(response) {
      $scope.groupedIndicationsReceived = [
        {
          date: 'Saturday 8th June',
          indications: response
        }
      ]
    });

    $scope.changeTab = function(tab) {
      this.abaSelecionada = tab.title;
      if (tab.type === 'received') {
        this.groupedIndications = this.groupedIndicationsReceived;
      } else {
        this.groupedIndications = this.groupedIndicationsSent;
      }
    };

  }
})();