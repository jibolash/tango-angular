'use strict';

angular.module('Tango')
  .controller('userProfileCtrl', ['$scope', '$location', '$stateParams', 'userService', function($scope, $location, $stateParams, userService){

    userService.getByUsername($stateParams.username).success(function(data){
      $scope.userData = data;
    });

    userService.userGigs($stateParams.username).success(function(data){
        $scope.userGigs = data;
        console.log($scope.userGigs);
      });

    // $scope.showProfile = function(username){
    //   userService.userGigs(username).success(function(data){
    //     $scope.userGigs = data;
    //     console.log($scope.userGigs);
    //   });
    // };
  }]);
