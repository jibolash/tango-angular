'use strict';

angular.module('Tango')
  .controller('editGigCtrl', ['$rootScope', '$scope', 'gigService', '$location','categoryService', function($rootScope, $scope, gigService, $location,categoryService){

  categoryService.getAll()
    .success(function(data){
      $scope.categories = data;
    })
    $scope.editGig = function(gigid){
      gigService.oneGig(gigid).success(function(data){
        $rootScope.gig = data;
        $rootScope.newCategory = data.category;
        $location.path('gig/edit/'+ gigid);
      });
    };
    $scope.checkCategory = function(){
      if($scope.category._id===$rootScope.newCategory._id){
        return "selected";
      }
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
