(function () {
  'use strict';

  angular.module('app')
    .config(Routes);

  // @ngInject
  function Routes($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'FeedCtrl',
        data: {
          permissions: {
            only: ['user'],
            redirectTo: 'signin'
          }
        }
      })
      .state('profile', {
        url: '/profile/:uid',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('signin', {
        url: '/signin',
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
