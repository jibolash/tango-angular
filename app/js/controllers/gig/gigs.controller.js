'use strict';

angular.module('Tango')
	.controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window', '$mdToast', '$animate', function($scope, gigService, categoryService, $window, $mdToast, $animate){

	  gigService.allGigs().success(function(data){
	    $scope.gigs = data;
	  });

		categoryService.getAll()
			.success(function(data){
				$scope.categories = data;
			});

		$scope.doAdd = function(gig){
			var id = $window.localStorage.getItem('token');
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
