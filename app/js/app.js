'use strict';

angular.module("Tango", ['ngMaterial', 'ngRoute', 'ui.router', 'ngFileUpload', 'angular-loading-bar', 'angularUtils.directives.dirDisqus', 'ngMap'])
  .config(function($httpProvider, $mdThemingProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('light-green')
      .backgroundPalette('grey')
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
        templateUrl: "app/views/home.html",
        controller: "searchCtrl"
      })
      .state('add', {
        url: "/gigs/new",
        templateUrl: "app/views/gigs/addGig.html"
      })
      .state('gigDetail', {
        url: "/gig/:gigid",
        templateUrl: "app/views/gigs/gig.detail.html"
      })
      .state('help', {
        url: "/help",
        templateUrl: "app/views/pages/help.html",
        controller: "helpCtlr"
      })
      .state('gigs', {
        url: "/gigs",
        views: {
          '': {
            templateUrl: "app/views/gigs/gigs.view.html",
          },
          'views@gigs': {
            templateUrl: "app/views/gigs/allGigs.html"
          }
        }
      })
      .state('editGig', {
        url: '/gig/edit/:gigid',
        templateUrl: 'app/views/gigs/edit.gig.html',
        controller: "editGigCtrl"
      })
      .state('profile', {
        url: '/user/profile/:username',
        templateUrl: 'app/views/user/user.profile.html',
        controller: "userProfileCtrl"
      })
      .state('pay', {
        url: '/gig/pay/:gigid',
        templateUrl: 'app/views/payment/payment.html',
        controller: "editGigCtrl"
      })
      .state('checkCategory', {
        parent: 'gigs',
        url: '/gigs/category/:catid',
        templateUrl: 'app/views/category/categoryView.html',
        controller: "categoryController"
      })
      .state('gigs.default', {
        url: '/all',
        templateUrl: 'app/views/gigs/allGigs.html',
        // controller: "gigsCtrl"
      })
      .state('search', {
        url: '/search/:gigName',
        templateUrl: 'app/views/gigs/search.html',
        // controller: "gigsCtrl"
      })
      .state('connections', {
        url: '/connections',
        templateUrl: 'app/views/chat/connection.view.html',
        controller: "connectionCtrl"
      })
      .state('messaging', {
        url: '/messages/:message_id',
        templateUrl: 'app/views/chat/messages.view.html',
        controller: "messageCtrl"
      })
      .state('editProfile', {
        url: "/user/edit/:userid",
        templateUrl: "app/views/user/edit.user.html",
        controller: "editUserCtrl"
      })
      .state('newPassword', {
        url: "/new/password",
        templateUrl: "app/views/auth/new.password.html",
        controller: "newPasswordCtrl"
      })
      .state('resetPassword', {
        url: "/reset/password/:randomToken",
        templateUrl: "app/views/auth/reset.password.html",
        controller: "resetPasswordCtrl"
      });
  });
