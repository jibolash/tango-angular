'use strict';

angular.module("Tango")
  .controller("loginCtrl",['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.login = function(ev){
      $mdDialog.show({
        templateUrl: 'app/views/login.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true
      })
      .then(function(){

      });
    };


  }]);
