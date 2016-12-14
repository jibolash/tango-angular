'use strict';

angular.module('Tango')
  .controller('messageCtrl', ['$scope', '$location', '$stateParams', 'userService', '$mdBottomSheet', 'connectionService', '$rootScope', 'Auth', function($scope, $location, $stateParams, userService, $mdBottomSheet, connectionService, $rootScope, Auth) {


    Auth.checkLogin();
    Auth.getUser().success(function(data) {
      $rootScope.userData = data;
    })

    connectionService.getByConnection($stateParams.message_id).success(function(data) {
      $scope.connection = data;
    })
    if ($stateParams.hasOwnProperty("message_id")) {
      var ref = new Firebase("https://tangong.firebaseio.com/messages/" + $stateParams.message_id);
      // ref.child($stateParams.message_id);
    }
    $scope.messages = [];
    ref.on("child_added", function(snapshot) {
      $scope.messages.push(snapshot.val());
      $scope.showNotif = ($scope.messages.length>0) ? false : true;
      console.log($scope.messages);
      $scope.$apply();
    })

    $scope.add = function(text) {
      if (text.length > 0) {
        ref.push({
          user: $rootScope.user.username,
          text: text
        });
      }
    }


    $mdBottomSheet.hide({});




  }]);
