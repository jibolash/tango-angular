'use strict';

angular.module('Tango')
	.controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window', function($scope, gigService, categoryService,$window){
	  gigService.allGigs().success(function(data){
	    $scope.gigs = data;
	  });
		categoryService.getAll()
			.success(function(data){
				$scope.categories = data;
			})
		$scope.doAdd = function(gig){
			var id = $window.localStorage.getItem('token');
			gigService.addGig(gig,id)
				.success(function(data){
					$scope.gig = '';
				})
				.error(function(err){
				});
		};
}]);
