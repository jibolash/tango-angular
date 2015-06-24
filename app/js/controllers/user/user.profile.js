'use strict';

angular.module('Tango')
  .controller('userProfileCtrl', ['$rootScope', '$scope', '$location', '$stateParams', 'userService', '$mdBottomSheet', '$mdDialog', 'Auth', function($rootScope, $scope, $location, $stateParams, userService, $mdBottomSheet, $mdDialog, Auth) {

    userService.getByUsername($stateParams.username).success(function(data) {
      $scope.userData = data;
    });

    userService.userGigs($stateParams.username).success(function(data) {
      $scope.userGigs = data;
    });

    $mdBottomSheet.hide({});

    $scope.deleteUser = function(userid) {
      userService.deleteUser(userid).success(function(data) {
        Auth.logout();
        $scope.user = {};
        $rootScope.loggedIn = false;
        $location.path('/');
      });
    };

    $scope.showConfirmDelete = function(ev, userid) {
      console.log(1, userid);
      var confirm = $mdDialog.confirm()
        .title('Do you want to permanently close your account on tango?')
        .content('There is no way for you to retrieve it, we will be sad to see you leave...')
        .ariaLabel('Lucky day')
        .ok('Yes')
        .cancel('No')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.deleteUser(userid);
      }, function() {});
    };
  }]);
