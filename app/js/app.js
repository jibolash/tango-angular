'use strict';

angular.module("Tango", ['ngMaterial', 'ngRoute', 'ui.router', 'ngFileUpload', 'angular-loading-bar', 'angularUtils.directives.dirDisqus', 'ngMap'])
  .config(function($httpProvider, $mdThemingProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('light-green')
      .backgroundPalette('grey');
  });

angular.module("Tango").run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

  $rootScope.loggedIn = Auth.isLoggedIn();
  $rootScope.$on('$stateChangeStart', function(event, next, current) {
    $rootScope.loggedIn = Auth.isLoggedIn();
    Auth.getUser().success(function(data) {
      $rootScope.user = data;
    });
  });
}]);

angular.module("Tango")
  .config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    cfpLoadingBarProvider.includeSpinner = false;
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "app/views/landing.html"
      })
      .state('add', {
        url: "/gigs/new",
        templateUrl: "app/views/addGig.html"
      })
      .state('gigDetail', {
        url: "/gig/:gigid",
        templateUrl: "app/views/gig.detail.html"
      })
      .state('help', {
        url: "/help",
        templateUrl: "app/views/help.html",
        controller: "helpCtlr"
      })
      .state('gigs', {
        url:"/gigs",
        views: {
          '' :{
            templateUrl: "app/views/gigs.view.html",
          },
          'views@gigs' : {
            templateUrl: "app/views/allGigs.html"
          }
        }
      })
      .state('editGig', {
        url: '/gig/edit/:gigid',
        templateUrl: 'app/views/edit.gig.html',
        controller: "editGigCtrl"
      })
      .state('profile', {
        url: '/user/profile/:username',
        templateUrl: 'app/views/user.profile.html',
        controller: "userProfileCtrl"
      })
      .state('pay', {
        url: '/gig/pay/:gigid',
        templateUrl: 'app/views/payment.html',
        controller: "editGigCtrl"
      })
      .state('checkCategory', {
        parent:'gigs',
        url: '/gigs/category/:catid',
        templateUrl: 'app/views/categoryView.html',
        controller: "categoryController"
      })
      .state('gigs.default', {
        url: '/all',
        templateUrl: 'app/views/allGigs.html',
        // controller: "gigsCtrl"
      })
      .state('connections', {
        url: '/connections',
        templateUrl: 'app/views/connection.view.html',
        controller: "connectionCtrl"
      })
      .state('messaging', {
        url: '/messages/:message_id',
        templateUrl: 'app/views/messages.view.html',
        controller: "messageCtrl"
      })
      .state('editProfile', {
        url: "/user/edit/:userid",
        templateUrl: "app/views/edit.user.html",
        controller: "editUserCtrl"
      })
      .state('newPassword', {
        url: "/new/password",
        templateUrl: "app/views/new.password.html",
        controller: "newPasswordCtrl"
      })
      .state('resetPassword', {
        url: "/reset/password/:randomToken",
        templateUrl: "app/views/reset.password.html",
        controller: "resetPasswordCtrl"
      });
  });
