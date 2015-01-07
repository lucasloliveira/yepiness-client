'use strict';

angular.module('yepinessApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
//        resolve: {
//          auth: function($auth, $state) {
//            return $auth.validateUser().catch(function() {
//              $state.go('login');
//            });
//          }
//        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
  });