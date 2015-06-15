'use strict';

angular.module('Tango')
  .controller('editGigCtrl', ['$rootScope', '$scope', 'gigService', '$location', function($rootScope, $scope, gigService, $location){

    $rootScope.editGig = function(gigid){
      gigService.oneGig(gigid).success(function(data){
        $rootScope.gig = data;
        data.newCategory = data.category;
        $location.path('gig/edit/'+ gigid);

      });

      $rootScope.checkCategory = function(){
        if($rootScope.category._id===$rootScope.newCategory._id){
          return "selected";
        }
      };
    };

    $scope.saveChanges = function(gigid, gigData){
      gigService.editGig(gigid, gigData).success(function(data){
        gigService.oneGig(gigid)
          .success(function(data2){
            $scope.gigInfo = data2;
            $location.path('/gig/' + gigid)
          });
      });
    };
}]);
