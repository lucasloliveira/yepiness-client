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

  function Feed($scope, User, Yep, Crawler) {

    $scope.current = 'feed/feed.html';

    $scope.create = function(){
      Yep.create($scope.newYep).success(function(response){
        console.log(response);
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
  }
})();