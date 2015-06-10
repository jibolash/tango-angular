'use strict';

angular.module("Tango",['ngMaterial','ngRoute'])
	.config(function($httpProvider, $mdThemingProvider, $routeProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

     $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('blue')
    .backgroundPalette('brown');
  });

angular.module('Tango').run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

  $rootScope.loggedIn = Auth.isLoggedIn();
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    $rootScope.loggedIn = Auth.isLoggedIn();
    Auth.getUser().success(function(data){
          $rootScope.user = data;
        });
    });
}]);
