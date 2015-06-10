'use strict';

var app = angular.module("Tango");

app.controller("categoryController", ['categoryService','$scope',function(categoryService,$scope){
	categoryService.getAll()
		.success(function(data){
			$scope.categories = data;
		})
}])