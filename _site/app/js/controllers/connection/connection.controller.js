'use strict';

angular.module('Tango')
  .controller('connectionCtrl', ['$scope', '$location', '$stateParams', 'userService', '$mdBottomSheet', 'connectionService', '$rootScope', 'Auth', function($scope, $location, $stateParams, userService, $mdBottomSheet, connectionService, $rootScope, Auth) {


    Auth.checkLogin();

    Auth.getUser().success(function(data) {
      $rootScope.userData = data;
      connectionService.get($rootScope.userData.id).success(function(data) {
        $rootScope.connections = data;
      })
    });
    // userService.getByUsername($rootScope.user.username).success(function(data) {
    //   $rootScope.userData = data;
    // });



    $mdBottomSheet.hide({});

    $scope.messaging = function(id) {
      $location.path("/messages/" + id);
    }


  }]);
