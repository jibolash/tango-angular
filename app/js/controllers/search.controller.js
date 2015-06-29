'use strict';

angular.module('Tango')
  .controller('searchCtrl', ['$scope', '$location', '$stateParams', 'userService', '$mdBottomSheet', 'connectionService', '$rootScope', 'Auth', function($scope, $location, $stateParams, userService, $mdBottomSheet, connectionService, $rootScope, Auth) {

    $scope.search = function(name){
      // $location.path("/search/"+name);
      console.log("hello");
    }
    // Auth.checkLogin();
  }]);
