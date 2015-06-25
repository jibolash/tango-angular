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
  $rootScope.incategory = true;

  $scope.catCheck = function(id,status){
    console.log(1,$scope.cat);
    console.log(2,$scope.neew);
  }
  // $scope.setting.disabled = true;

}])
