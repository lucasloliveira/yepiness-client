(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the app
   */
  angular.module('app')
    .controller('YepCtrl', Yep);

  function Yep($scope, YepService) {

//    $scope.tabs = [
//      {title: 'Indications Received', type: 'received'},
//      {title: 'My Indications', type: 'sent'}
//    ];
//
//    YepService.sent().success(function(response) {
//      $scope.groupedIndicationsSent = groupYeps(response);
//      $scope.populateYeps();
//    });
//
//    YepService.received().success(function(response) {
//      $scope.groupedIndicationsReceived = groupYeps(response);
//      $scope.populateYeps();
//    });
//
//    var groupYeps = function(list) {
//      var yeps = [];
//      var groupedYeps = list.groupBy(function(yep) {
//        return new Date(yep.created_at).format('{Weekday} {d} {Month}, {yyyy}', 'pt');
//      });
//      angular.forEach(Object.keys(groupedYeps), function(key) {
//        yeps.push({
//          date: key,
//          yeps: groupedYeps[key]
//        })
//      });
//      return yeps;
//    };
//
//    $scope.changeTab = function(tab) {
//      $scope.abaSelecionada = tab.title;
//      $scope.populateYeps();
//    };
//
//    $scope.populateYeps = function() {
//      if($scope.abaSelecionada == 'received') {
//        $scope.groupedIndications = $scope.groupedIndicationsReceived;
//      } else {
//        $scope.groupedIndications = $scope.groupedIndicationsSent;
//      }
//    };
//
  }
})();
