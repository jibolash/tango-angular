'use strict';

angular.module('Tango')
	.controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window','Upload', function($scope, gigService, categoryService,$window,Upload){
	  gigService.allGigs().success(function(data){
	    $scope.gigs = data;
	    console.log(data);
	  });
		categoryService.getAll()
			.success(function(data){
				$scope.categories = data;
			})
		$scope.doAdd = function(gig){
			console.log(6,gig);
			var id = $window.localStorage.getItem('token');
			gig.image = gig.image[0];
			var upload = Upload.upload({
				url:"http://localhost:8000/api/gigs",
				method:"POST",
				file:gig.image,
				fields:gig
			})
			.success(function(data){
				$scope.gig = '';
			})
			// gig.file = gig.image;
			// gigService.addGig(gig,id)
			// 	.success(function(data){
			// 		// $scope.gig = '';
			// 	})
			// 	.error(function(err){
			// 		console.log(err);
			// 	});
		};
}]);
