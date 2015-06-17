'use strict';

angular.module('Tango')
  .controller('editGigCtrl', ['$rootScope', '$scope', 'gigService', '$location', '$stateParams', '$mdToast', '$animate', function($rootScope, $scope, gigService, $location, $stateParams, $mdToast, $animate){

    gigService.oneGig($stateParams.gigid).success(function(data){
        $scope.gig = data;
        data.newCategory = data.category;
      });

    $scope.checkCategory = function(){
        if($rootScope.category._id===$rootScope.newCategory._id){
          return "selected";
        }
      };

    $scope.saveChanges = function(gigid, gigData){
      gigService.editGig(gigid, gigData).success(function(data){
        gigService.oneGig(gigid)
          .success(function(data2){
            $scope.gigInfo = data2;
            $location.path('/gig/' + gigid);
            $mdToast.show({
              templateUrl: 'app/views/editToast.html',
              hideDelay: 6000,
              position: $scope.getToastPosition()
            });
          });
      });
    };

    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
}]);
