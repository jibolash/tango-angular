'use strict';

angular.module('Tango')
  .controller('gigDetailCtrl', ['$scope', 'gigService', '$stateParams','$rootScope', function($scope, gigService, $stateParams,$rootScope) {

    $scope.gigid = $stateParams.gigid;
    $scope.url = "http://localhost:3000/#!/gig/" + $stateParams.gigid;

    gigService.oneGig($stateParams.gigid)
      .success(function(data) {
        $scope.Address = data.address;
        $scope.gigInfo = data;
        $scope.t_details
        // $scope.t_details = {
        //   'provider' : data.addedBy.username,
        //   'service' : data.title,
        //   'user' : $rootScope.user.username
        // }
        var twittermessage = data.title;
        document.getElementById('twitterLink').setAttribute("data-text", twittermessage);
      });



  }]);
