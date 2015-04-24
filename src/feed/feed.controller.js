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


    $scope.categories = [
      {
        icon: 'fa-book',
        name: 'Books/HQ/Manga'
      },
      {
        icon: 'fa-film',
        name: 'Movies'
      },
      {
        icon: 'fa-cc',
        name: 'TV series/Cartoons/Animes'
      },
      {
        icon: 'fa-youtube-play',
        name: 'Videos'
      },
      {
        icon: 'fa-music',
        name: 'Musics'
      },
      {
        icon: 'fa-microphone',
        name: 'Podcasts'
      },
      {
        icon: 'fa-gamepad',
        name: 'Games'
      },
      {
        icon: 'fa-mobile',
        name: 'Apps/Tools'
      },
      {
        icon: 'fa-map-marker',
        name: 'Places'
      },
      {
        icon: 'fa-university',
        name: 'Stuff/Brands'
      },
      {
        icon: 'fa-bookmark',
        name: 'Articles'
      },
      {
        icon: 'fa-beer',
        name: 'Events'
      },
      {
        icon: 'fa-graduation-cap',
        name: 'Courses'
      },
      {
        icon: 'fa-motorcycle',
        name: 'Sports/Activities'
      },
      {
        icon: 'fa-star',
        name: 'References'
      },
      {
        icon: 'fa-users',
        name: 'People/Services'
      }
    ];

    $scope.newYep = {
      friends: []
    };

    $scope.changeFriends = function(){

    };

    $scope.editFriends = function() {
      $scope.selectFriends = $scope.selectFriends ? false : true;
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

    $scope.selectCategory = function(category) {
      $scope.newYep.category = category;
    };

    $scope.removeCategory = function() {
      $scope.newYep.category = undefined;
    };

    $scope.acceptFriend = function(request) {
      User.acceptFriend(request.id).success(function(obj) {

      });
    };

    $scope.declineFriend = function(request) {
      console.log(request);
    };

    User.friendsCount().success(function(resp){
      $scope.user.friendsCount = resp;
    });

    User.friends().success(function(response) {
      $scope.user.friends = response;
    });

    User.receivedRequests().success(function(obj) {
      $scope.friendRequests = obj.response;
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

    $scope.loadFriends = function($query){
      return $scope.user.friends.filter(function(friend){
        return friend.name.toLowerCase().indexOf($query.toLowerCase()) !== -1;
      });
    };

  }
})();
