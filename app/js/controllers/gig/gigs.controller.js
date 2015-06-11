'use strict';

angular.module('Tango')
	.controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window','Upload','$mdToast', function($scope, gigService, categoryService,$window,Upload,$mdToast){

	  gigService.allGigs().success(function(data){
	    $scope.gigs = data;
	    console.log(data);
	  });

		categoryService.getAll()
			.success(function(data){
				$scope.categories = data;
			});

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

			gigService.addGig(gig,id)
				.success(function(data){
					$scope.gig = '';
					$mdToast.show(
			      $mdToast.simple()
			        .content('Your Gig has been added!')
			        .position($scope.getToastPosition())
			        .hideDelay(6000)
			    );
				})
				.error(function(err){
				});
		};

		$scope.toastPosition = {
	    bottom: false,
	    top: true,
	    left: false,
	    right: true
  	};

  	$scope.getToastPosition = function() {
	    return Object.keys($scope.toastPosition)
	      .filter(function(pos) { return $scope.toastPosition[pos]; })
	      .join(' ');
  	};

}]);
