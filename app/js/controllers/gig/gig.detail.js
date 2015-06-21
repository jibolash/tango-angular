'use strict';

angular.module('Tango')
  .controller('gigDetailCtrl', ['$scope', 'gigService', '$stateParams', function($scope, gigService, $stateParams) {

    $scope.gigid = $stateParams.gigid;
    $scope.url = "http://localhost:3000/#!/gig/" + $stateParams.gigid;
    gigService.oneGig($stateParams.gigid)
      .success(function(data) {
        $scope.gigInfo = data;
        var twittermessage = data.title;
        document.getElementById('twitterLink').setAttribute("data-text", twittermessage);
      });
  }]);
