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

  function Home($http) {

//    $http.get('https://www.airpair.com/ruby-on-rails/posts/authentication-with-angularjs-and-ruby-on-rails').success(function(response) {
//      console.log(response);
//    }).error(function(error) {
//      console.log(error);
//    });

    this.tabs = [
      {title: 'Indications Received', type: 'received'},
      {title: 'My Indications', type: 'sent'}
    ];

    this.updateYep = function(newYep) {
      console.log(newYep);
    };

    this.groupedIndicationsSent = [
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

    this.groupedIndicationsReceived = [
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

    this.changeTab = function(tab) {
      this.abaSelecionada = tab.title;
      if (tab.type === 'received') {
        this.groupedIndications = this.groupedIndicationsReceived;
      } else {
        this.groupedIndications = this.groupedIndicationsSent;
      }
    };
  }
})();