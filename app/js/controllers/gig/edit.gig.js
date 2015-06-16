'use strict';

angular.module('Tango')
  .controller('editGigCtrl', ['$rootScope', '$scope', 'gigService', '$location', '$stateParams', function($rootScope, $scope, gigService, $location, $stateParams){

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
          });
      });
    };
}]);
