'use strict';

angular.module("Tango")
  .controller("loginCtrl",['$scope', '$mdDialog', '$mdToast', '$animate', '$location', '$rootScope', 'userService', 'Auth', function($scope, $mdDialog, $mdToast, $animate, $location, $rootScope, userService, Auth){

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

    $scope.signup = function(ev){
      $mdDialog.show({
        templateUrl: 'app/views/signup.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true
      })
      .then(function(){
      });
    };

    $scope.doLogin = function(loginData){
      Auth.login($scope.loginData.username, $scope.loginData.password)
        .success(function(data){
          if(data.message === "User not found"){
            $scope.loginError = true;
          }
          else if(data.message === "Wrong password"){
            $scope.loginError = true;
          }
          else{
            $rootScope.loggedIn = true;
            $mdDialog.hide();
            $scope.loginError = false;
          }
        });
    };

    $scope.logout = function(){
      Auth.logout();
      $scope.user = {};
      $rootScope.loggedIn = false;
    };

    $scope.toastPosition = {
      bottom: true,
      top: true,
      left: true,
      right: true
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    $scope.doSignup = function(userData, ev){
      userService.addUser(userData).success(function(data){
        $mdDialog.hide();
        $mdToast.show({
          templateUrl: 'app/views/proceed.html',
          hideDelay: 6000,
          position: $scope.getToastPosition()
        });
     });
    };
  }]);
