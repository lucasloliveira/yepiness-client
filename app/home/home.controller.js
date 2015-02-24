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
    .controller('HomeCtrl', Home);

  function Home($scope, $http, ENV) {

    $scope.tabs = [
      {title: 'Indications Received', type: 'received'},
      {title: 'My Indications', type: 'sent'}
    ];

    $scope.groupedIndicationsSent = [
      {
        date: 'Saturday 8th June',
        indications: [
          {
            title: 'Font Awesome Sent',
            pictureUrl: '/images/yeoman.png',
            short: 'http://fortawesome.github.io/',
            url: 'yepin.es/13NfIj1',
            description: 'The complete set of 479 icons in Font Awesome 4.2.0'
          }
        ]
      }
    ];

    $scope.groupedIndicationsReceived = [
      {
        date: 'Saturday 8th June',
        indications: [
          {
            title: 'Fonts Received',
            pictureUrl: '/images/yeoman.png',
            short: 'http://fortawesome.github.io/',
            url: 'yepin.es/13NfIj1',
            description: 'The complete set of 479 icons in Font Awesome 4.2.0'
          },
          {
            title: 'Fonts Received',
            pictureUrl: '/images/yeoman.png',
            short: 'http://fortawesome.github.io/',
            url: 'yepin.es/13NfIj1',
            description: 'The complete set of 479 icons in Font Awesome 4.2.0'
          }
        ]
      }
    ];

    $scope.updateYep = function(newYep) {
      if($scope.yepUrl === undefined) {
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
        var urls = newYep.match(regexToken);
        if(urls !== null && urls.length > 0) {
          $scope.yepUrl = urls[0];
          $http.get(ENV.apiEndpoint + '/api/v1/crawl', {
            params: {
              url: $scope.yepUrl
            }
          }).success(function(response){
            console.log(response)
          });
        }
      }
    };

    $scope.changeTab = function(tab) {
      this.abaSelecionada = tab.title;
      if (tab.type === 'received') {
        this.groupedIndications = this.groupedIndicationsReceived;
      } else {
        this.groupedIndications = this.groupedIndicationsSent;
      }
    };

    $http.get(ENV.apiEndpoint + '/api/v1/user/friends/count').success(function(resp){
      $scope.user.friendsCount = resp;
    });
  }
})();