'use strict';

angular.module('Tango')
  .controller('messageCtrl', ['$scope', '$location', '$stateParams', 'userService', '$mdBottomSheet', 'connectionService', '$rootScope', function($scope, $location, $stateParams, userService, $mdBottomSheet, connectionService, $rootScope) {

    userService.getByUsername($rootScope.user.username).success(function(data) {
      $rootScope.userData = data;
    });
    connectionService.getByConnection($stateParams.message_id).success(function(data) {
      console.log(data);
      $rootScope.connection = data;
    })

    // console.log($stateParams.messageCtrl)
    if ($stateParams.hasOwnProperty("message_id")) {
      var ref = new Firebase("https://tangong.firebaseio.com/messages/"+$stateParams.message_id);
      // ref.child($stateParams.message_id);

    }
    $scope.messages = [];
    ref.on("child_added", function(snapshot){
      $scope.messages.push(snapshot.val());
      console.log($scope.messages);
    })

    $scope.add = function(text){
      ref.push({user : $rootScope.user.username, text: text});
      $scope.text = " ";
    }


    $mdBottomSheet.hide({});




  }]);
