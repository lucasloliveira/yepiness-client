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
    .controller('FeedCtrl', Feed);

  function Feed($scope, User, YepService, Crawler) {

    $scope.current = 'feed/feed.html';

    $scope.create = function(){
      YepService.create($scope.newYep).success(function(response){
        var createdDate = new Date(response.created_at).format('{Weekday} {d} {Month}, {yyyy}', 'pt');
        $scope.groupedIndicationsSent.forEach(function(grouped){
          if(grouped.date === createdDate) {
            grouped.yeps.push(response);
            grouped.yeps = grouped.yeps.sortBy(function(yep){
              return new Date(yep.created_at).getTime();
            }, true);
          }
        });
        $scope.newYep = undefined;
        $scope.yepContent = undefined;
      }).error(function(response){
        console.log(response);
      });
    };

    $scope.updateYep = function(newYep) {
      if($scope.yepContent === undefined) {
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
        var urls = newYep.match(regexToken);
        if(urls !== null && urls.length > 0) {
          Crawler.crawl(newYep).success(function(response){
            $scope.yepContent = response;

            $scope.newYep.title = response.title;
            $scope.newYep.description = response.description;
            $scope.newYep.url = response.uri;
            $scope.newYep.shortUrl = response.uri;
            $scope.newYep.image = response.images.length > 0 ? response.images[0] : '';
          }).error(function(){
            $scope.removeYep();
          });
        }
      }
    };

    $scope.removeYep = function() {
      $scope.yepContent = undefined;
      $scope.newYep.title = undefined;
      $scope.newYep.url = undefined;
      $scope.newYep.description = undefined;
      $scope.newYep.image = undefined;
    };

    User.friendsCount().success(function(resp){
      $scope.user.friendsCount = resp;
    });

    /// YEPCONTROLLER METHODS
    $scope.tabs = [
      {title: 'Indications Received', type: 'received'},
      {title: 'My Indications', type: 'sent'}
    ];

    YepService.sent().success(function(response) {
      $scope.groupedIndicationsSent = groupYeps(response);
      $scope.populateYeps();
    });

    YepService.received().success(function(response) {
      $scope.groupedIndicationsReceived = groupYeps(response);
      $scope.populateYeps();
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
      $scope.abaSelecionada = tab.title;
      $scope.populateYeps();
    };

    $scope.populateYeps = function() {
      if($scope.abaSelecionada == 'received') {
        $scope.groupedIndications = $scope.groupedIndicationsReceived;
      } else {
        $scope.groupedIndications = $scope.groupedIndicationsSent;
      }
    };

  }
})();