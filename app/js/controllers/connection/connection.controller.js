'use strict';

angular.module('Tango')
  .controller('connectionCtrl', ['$scope', '$location', '$stateParams', 'userService', '$mdBottomSheet', 'connectionService', '$rootScope', function($scope, $location, $stateParams, userService, $mdBottomSheet, connectionService, $rootScope) {

    userService.getByUsername($rootScope.user.username).success(function(data) {
      $rootScope.userData = data;
    });
    connectionService.get($rootScope.user.id).success(function(data) {
      $rootScope.connections = data;
    })


    $mdBottomSheet.hide({});

    $scope.messaging = function(id) {
      $location.path("/messages/" + id);
    }


  }]);
