'use strict';

var app = angular.module("Tango");

app.controller("categoryController", ['categoryService','$scope',function(categoryService,$scope){
	var v;
	categoryService.getAll()
		.success(function(data){
			$scope.categories = data;
			v = data;
		})

		setTimeout(function(){
			console.log(v[0].iconLink);
		},2000)
}])