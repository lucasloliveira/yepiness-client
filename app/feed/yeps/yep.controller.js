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
      $scope.groupedIndicationsSent = groupYeps(response);
    });

    YepService.received().success(function(response) {
      $scope.groupedIndicationsReceived = groupYeps(response);
    });

    var groupYeps = function(list) {
      var yeps = [];
      var groupedYeps = list.groupBy(function(yep) {
        return new Date(yep.created_at).format('{Weekday} {d} {Month}, {yyyy}', 'pt');
      });
      angular.forEach(Object.keys(groupedYeps), function(key) {
        yeps.push({
          date: key,
          yeps: groupedYeps[key]
        })
      });
      return yeps;
    };

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