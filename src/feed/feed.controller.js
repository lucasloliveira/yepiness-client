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
    .controller('FeedCtrl', Feed);

  function Feed($scope, User, YepService, Crawler, categories) {

    $scope.categories = categories.data;
    $scope.current = 'feed/feed.html';


    $scope.newYep = {
      friends: []
    };

    $scope.createChip = function(event, some) {
      switch(event.keyCode) {
        case 13:
          //TODO: Fix this workaround when possible
          var last = $scope.newYep.friends.length - 1;
          var newChip = $scope.newYep.friends[last];
          if(!newChip.name) {
            $scope.newYep.friends[last] = {
              name: newChip
            };
          }
      }
    };

    $scope.create = function(){
      YepService.create($scope.newYep).success(function(response){
        var createdDate = new Date(response.created_at).format('{Weekday} {d} {Month}, {yyyy}', 'pt');
        var found = false;
        $scope.groupedIndicationsSent.forEach(function(grouped){
          if(grouped.date === createdDate) {
            found = true;
            grouped.yeps.push(response);
            grouped.yeps = grouped.yeps.sortBy(function(yep){
              return new Date(yep.created_at).getTime();
            }, true);
          }
        });
        if(!found) {
          $scope.groupedIndicationsSent.push({
            date: createdDate,
            yeps: [response]
          });
        }

        $scope.newYep = {
          friends: []
        };
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
          $scope.crawling = true;
          Crawler.crawl(newYep).success(function(response){
            $scope.crawling = false;
            $scope.yepContent = response;

            $scope.newYep.title = response.title;
            $scope.newYep.description = response.description;
            $scope.newYep.url = response.uri;
            $scope.newYep.shortUrl = response.uri;
            $scope.newYep.image = response.images.length > 0 ? response.images[0] : '';
          }).error(function(){
            $scope.crawling = false;
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

    User.friends().success(function(response) {
      $scope.user.friends = response;
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
        });
      });
      return yeps;
    };

    $scope.changeTab = function(tab) {
      $scope.abaSelecionada = tab.type;
      $scope.populateYeps();
    };

    $scope.populateYeps = function() {
      if($scope.abaSelecionada === 'received') {
        $scope.groupedIndications = $scope.groupedIndicationsReceived;
      } else {
        $scope.groupedIndications = $scope.groupedIndicationsSent;
      }
    };

    $scope.createChip = function(event, some) {
      switch(event.keyCode) {
        case 13:
          //TODO: Fix this workaround when possible
          var last = $scope.newYep.friends.length - 1;
          var newChip = $scope.newYep.friends[last];
          if(!newChip.name) {
            $scope.newYep.friends[last] = {
              name: newChip
            };
          }
      }
    };

    $scope.loadFriends = function($query){
      return $scope.user.friends.filter(function(friend){
        return friend.name.toLowerCase().indexOf($query.toLowerCase()) !== -1;
      });
    };

  }
})();
