'use strict';

angular.module('Tango')
  .controller('editGigCtrl', ['$rootScope', '$scope', 'gigService', '$location', '$stateParams', 'Upload', 'categoryService', '$mdToast', '$animate', function($rootScope, $scope, gigService, $location, $stateParams, Upload, categoryService, $mdToast, $animate) {
    gigService.oneGig($stateParams.gigid).success(function(data) {
      $scope.gig = data;
      // console.log(data);

      data.newCategory = data.category;
    });


    categoryService.getAll()
      .success(function(data) {
        $scope.categories = data;
      });

    $scope.checkCategory = function() {
      if ($scope.category._id === $rootScope.newCategory._id) {
        return "selected";
      }
    };

    $scope.saveChanges = function(gigid, gigData) {
      var localhost = "http://localhost:8000/api/gig";
      var heroku = "https://tangong-api.herokuapp.com/api/gig";
      var link = heroku;
      var gig = gigData;
      gig._id = gigid;
      gig.category = gig.category._id;
      gig.addedBy = (gig.hasOwnProperty("addedBy")) ? gig.addedBy._id : "";
      link += "/" + gigid;
      var upload = Upload.upload({
          url: link,
          method: "PUT",
          file: gig.image,
          fields: gig
        })
        .success(function(data) {
          $location.path("/gig/" + gigid);
          $mdToast.show({
            templateUrl: 'app/views/toasts/editToast.html',
            hideDelay: 6000,
            position: $scope.getToastPosition()
          });
        });
    };

    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };
  }]);
