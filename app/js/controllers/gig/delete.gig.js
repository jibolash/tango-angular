'use strict';

angular.module('Tango')
  .controller('deleteGigCtrl', ['$scope', 'gigService', function($scope, gigService){

    gigService.oneGig($stateParams.gigid)
      .success(function(data){
        $scope.gigInfo = data;
        console.log($scope.gigInfo);
      });

}]);
