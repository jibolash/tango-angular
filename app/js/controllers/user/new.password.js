'use strict';
angular.module('Tango')
  .controller('newPasswordCtrl', ['$scope', 'userService', '$mdDialog', function($scope, userService, $mdDialog){

    $mdDialog.hide();

    $scope.showMessage = false;
    $scope.sendPassword = function(email){
      console.log('email', email);
      userService.forgotPassword({
        'email': email
      }).success(function(data){
        if(data.message === "Message Sent!"){
          $scope.showMessage = true;
          $scope.showNullMessage = false;
        }
        else{
          $scope.showMessage = false;
          $scope.showNullMessage = true;
        }
      });
    };
  }]);
