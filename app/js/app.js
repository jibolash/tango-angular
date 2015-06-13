'use strict';

angular.module("Tango",['ngMaterial','ngRoute','ui.router','ngFileUpload'])
    .config(function($httpProvider, $mdThemingProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

     $mdThemingProvider.theme('default')
        .primaryPalette('green')
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
    .config(function($stateProvider, $urlRouterProvider) {
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
            });
    });
