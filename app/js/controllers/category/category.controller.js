'use strict';

var app = angular.module("Tango");

app.controller("categoryController", ['categoryService', '$scope', '$stateParams','$rootScope', function(categoryService, $scope, $stateParams,$rootScope) {
  categoryService.getAll()
    .success(function(data) {
      $scope.categories = data;
    })

  $scope.checkCategory = function(cat_id) {
    $location.path("/gigs/category/" + cat_id);
  }
  $scope.selectedCategory = $stateParams.catid;
  console.log($scope.selectedCategory);
  // $scope.setting.disabled = true;
}])
