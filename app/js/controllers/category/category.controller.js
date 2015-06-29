'use strict';

var app = angular.module("Tango");

app.controller("categoryController", ['categoryService', '$scope', '$stateParams', '$rootScope', '$location', function(categoryService, $scope, $stateParams, $rootScope, $location) {
  categoryService.getAll()
    .success(function(data) {
      $scope.categories = data;
    })

  $rootScope.selectedCategory = $stateParams.catid;



  $scope.catCheck = function(id, status) {
    console.log(1, $scope.cat);
    console.log(2, $scope.neew);
  }

  if (!$rootScope.selectedCategory) {
    $rootScope.loadDefault = function() {
      $location.path("/gigs/all");
    }
  }

}])
