'use strict';

angular.module('Tango')
  .controller('editUserCtrl', ['$scope', 'userService', '$location', '$stateParams', '$mdToast', '$animate', function($scope, userService, $location, $stateParams, $mdToast, $animate) {

    userService.oneUser($stateParams.userid).success(function(data) {
      $scope.userData = data;
    });

    $scope.editUser = function(userid, userData) {
      userService.editUser(userid, userData).success(function(data){
        $location.path("/user/profile/" + userData.username);
      });
    };

    // $scope.saveChanges = function(gigid, gigData) {
    //   var localhost = "http://localhost:8000/api/gig";
    //   var heroku = "https://tangong-api.herokuapp.com/api/gig";
    //   var link = heroku;
    //   var gig = gigData;
    //   gig._id = gigid;
    //   console.log(2, gig);
    //   link += "/" + gigid;
    //   var upload = Upload.upload({
    //       url: link,
    //       method: "PUT",
    //       file: gig.image,
    //       fields: gig
    //     })
    //     .success(function(data) {
    //       $location.path("/gig/" + gigid);
    //       $mdToast.show({
    //         templateUrl: 'app/views/editToast.html',
    //         hideDelay: 6000,
    //         position: $scope.getToastPosition()
    //       });
    //     });
    // };

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
