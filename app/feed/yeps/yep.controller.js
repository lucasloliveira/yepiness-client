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

  function Yep($scope) {

    $scope.current = 'feed/feed.html';

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
            url: 'http://fortawesome.github.io/',
            short: 'yepin.es/13NfIj1',
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
            url: 'http://fortawesome.github.io/',
            short: 'yepin.es/13NfIj1',
            description: 'The complete set of 479 icons in Font Awesome 4.2.0'
          },
          {
            title: 'Fonts Received',
            pictureUrl: '/images/yeoman.png',
            url: 'http://fortawesome.github.io/',
            short: 'yepin.es/13NfIj1',
            description: 'The complete set of 479 icons in Font Awesome 4.2.0'
          }
        ]
      }
    ];

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