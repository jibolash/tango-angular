'use strict';

angular.module('Tango')
  .controller('editUserCtrl', ['$scope', 'userService', '$location', '$stateParams', '$mdToast', '$animate', 'AuthToken', function($scope, userService, $location, $stateParams, $mdToast, $animate, AuthToken) {

    userService.oneUser($stateParams.userid).success(function(data) {
      $scope.userData = data;
    });

    $scope.editUser = function(userid, userData) {
      userService.editUser(userid, userData).success(function(data) {
        console.log(data);
        AuthToken.setToken(data.token);
        $location.path("/user/profile/" + userData.username);
        $mdToast.show({
          template: '<md-toast>Profile updated successfully</md-toast>',
          hideDelay: 6000,
          position: $scope.getToastPosition()
        });
      });
    };

    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };
  }]);
