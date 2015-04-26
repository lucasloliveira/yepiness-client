(function () {
  'use strict';

  angular.module('yepinessApp')
    .config(Routes);

  // @ngInject
  function Routes($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'FeedCtrl'
      })
      .state('profile', {
        url: '/profile/:uid',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('signin', {
        url: '/',
        templateUrl: 'signin/signin.html',
        controller: 'SigninCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup/signup.html',
        controller: 'SignupCtrl'
      });
  }
})();
