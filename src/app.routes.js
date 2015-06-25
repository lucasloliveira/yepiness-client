(function () {
  'use strict';

  angular.module('app')
    .config(Routes);

  // @ngInject
  function Routes($stateProvider) {
    $stateProvider
      .state('user', {
        url: '',
        abstract: true,
        templateUrl: 'home/home.html',
        data: {
          permissions: {
            only: ['user'],
            redirectTo: 'signin'
          }
        }
      })
      .state('home', {
        parent: 'user',
        views: {
          'header': {
            templateUrl: 'header/header.html',
            controller: 'HeaderCtrl'
          },
          'sidenav': {
            templateUrl: 'sidenav/sidenav.html',
            controller: 'SidenavCtrl'
          },
          'feed': {
            templateUrl: 'feed/feed.html',
            controller: 'FeedCtrl'
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
