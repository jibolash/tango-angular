'use strict';

angular.module('Tango')
  .controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window','Upload', '$location', function($scope, gigService, categoryService, $window, Upload, $location){

    gigService.allGigs().success(function(data){
      $scope.gigs = data;
    });

    categoryService.getAll()
      .success(function(data){
        $scope.categories = data;
      });

    $scope.postGig  = function(){
      $location.path('/gigs/new')
    };

    $scope.doAdd = function(gig){
      var id = $window.localStorage.getItem('token');

      var localhost = "http://localhost:8000/api/gigs";
      var heroku = "https://tangong-api.herokuapp.com/api/gigs";

      gig.image = gig.image[0];
      var upload = Upload.upload({
        url: localhost,
        method: "POST",
        file: gig.image,
        fields: gig
      })
      .success(function(data){
        $scope.showRecentGigs();
      });
    };

    $scope.showRecentGigs = function(){
      $location.path('/gigs');
    };
}]);
