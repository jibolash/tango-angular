'use strict';

angular.module("Tango", ['ngMaterial', 'ngRoute', 'ui.router', 'ngFileUpload', 'angular-loading-bar'])
  .config(function($httpProvider, $mdThemingProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('brown')
      .backgroundPalette('light-green');
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
    .config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
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
                url: "/gigs",
                templateUrl: "app/views/gigs.view.html",
                controller: "gigsCtrl"
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
            .state('editProfile', {
                url: "/user/edit/:userid",
                templateUrl: "app/views/edit.user.html",
                controller: "editUserCtrl"
            });

    });
