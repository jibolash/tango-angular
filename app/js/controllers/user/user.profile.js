'use strict';

angular.module('Tango')
  .controller('userProfileCtrl', ['$scope', '$location', '$stateParams', 'userService', function($scope, $location, $stateParams, userService){

    userService.getByUsername($stateParams.username).success(function(data){
      $scope.userData = data;
    });

    userService.userGigs($stateParams.username).success(function(data){

        $scope.userGigs = data;
      });

    // $scope.deleteUser = function(userid){
    //   userService.deleteUser(userid).success(function(data){
    //     $location.path('/gigs');
    //   });
    // };

    // $scope.showConfirm = function(ev, gigid) {
    //   console.log(1, gigid)
    //   var confirm = $mdDialog.confirm()
    //     .title('Do you want to permanently delete this gig?')
    //     .content('There is no way for you to retrieve it...')
    //     .ariaLabel('Lucky day')
    //     .ok('Yes')
    //     .cancel('No')
    //     .targetEvent(ev);
    //   $mdDialog.show(confirm).then(function() {
    //     $scope.deleteGig(gigid);
    //   }, function() {});
    // };
  }]);
