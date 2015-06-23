'use strict';

angular.module('Tango')
  .controller('gigDetailCtrl', ['$scope', 'gigService', '$stateParams', function($scope, gigService, $stateParams) {

    $scope.gigid = $stateParams.gigid;
    $scope.url = "http://localhost:3000/#!/gig/" + $stateParams.gigid;

    // gigService.oneGig($stateParams.gigid)
    //   .success(function(data) {
    //     $scope.Address = data.address;
    //     $scope.gigInfo = data;
    //     var twittermessage = data.title;
    //     document.getElementById('twitterLink').setAttribute("data-text", twittermessage);
    //   });

    gigService.oneGig($stateParams.gigid)
      .success(function(data) {
        if (data.address) {
          $scope.showMap = true;
          $scope.Address = data.address;
        }
        else{
          $scope.showMap = false;
        }
        $scope.gigInfo = data;
        var twittermessage = data.title;
        document.getElementById('twitterLink').setAttribute("data-text", twittermessage);
      });
  }]);
