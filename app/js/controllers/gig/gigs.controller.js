'use strict';

angular.module('Tango')
	.controller('gigsCtrl', ['$scope', 'gigService','categoryService','$window', '$mdToast', '$animate', '$http', 'Upload',function($scope, gigService, categoryService, $window, $mdToast, $animate, $http, Upload){

	  gigService.allGigs().success(function(data){
	    $scope.gigs = data;
	  });

		categoryService.getAll()
			.success(function(data){
				$scope.categories = data;
			});

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'http://localhost:8000/api/gigs',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };


		//adding without image
		// $scope.doAdd = function(gig){
		// 	var id = $window.localStorage.getItem('token');
		// 	gigService.addGig(gig, id)
		// 		.success(function(data){
		// 			// $scope.gig = '';
		// 			$mdToast.show(
		// 	      $mdToast.simple()
		// 	        .content('Your Gig has been added!')
		// 	        .position($scope.getToastPosition())
		// 	        .hideDelay(6000)
		// 	    );
		// 		})
		// 		.error(function(err){
		// 		});
		// };

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
