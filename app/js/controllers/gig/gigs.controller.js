'use strict';

angular.module('Tango')
  .controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window','Upload', function($scope, gigService, categoryService,$window,Upload){
    gigService.allGigs().success(function(data){
      $scope.gigs = data;
    });
    categoryService.getAll()
      .success(function(data){
        $scope.categories = data;
      });

    $scope.doAdd = function(gig){
      var id = $window.localStorage.getItem('token');

      var localhost = "http://localhost:8000/api";
      var heroku = "https://tangong-api.herokuapp.com/api";

      gig.image = gig.image[0];
      var upload = Upload.upload({
        url: heroku,
        method: "POST",
        file: gig.image,
        fields: gig
      })
      .success(function(data){
        $scope.gig = '';
      })
    };

}]);
