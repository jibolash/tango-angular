'use strict';

angular.module('Tango')
  .controller('resetPasswordCtrl', ['$scope', 'userService', '$stateParams', function($scope, userService, $stateParams) {

    $scope.token = $stateParams.randomToken;
    $scope.savePassword = function(token, password) {
      if ($scope.newPassword1 === $scope.newPassword2) {
        userService.resetPassword(token, {'password': password})
          .success(function(data) {
            $scope.loginMessage = true;
            $scope.passwordError = false;
          });
      } else {
        $scope.passwordError = true;
      }
    };
  }]);
