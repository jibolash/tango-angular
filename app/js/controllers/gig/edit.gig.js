'use strict';

angular.module('Tango')
  .controller('editGigCtrl', ['$rootScope', '$scope', 'gigService', '$location', '$stateParams', 'Upload','categoryService', function($rootScope, $scope, gigService, $location, $stateParams, Upload,categoryService) {

    gigService.oneGig($stateParams.gigid).success(function(data) {
      $scope.gig = data;
      data.newCategory = data.category;
    });
    categoryService.getAll()
      .success(function(data) {
        $scope.categories = data;
      });
    $scope.checkCategory = function() {
      if ($rootScope.category._id === $rootScope.newCategory._id) {
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
      console.log(gig);
      link += "/" + gigid;
      var upload = Upload.upload({
          url: link,
          method: "PUT",
          file: gig.image,
          fields: gig
        })
        .success(function(data) {
          $location.path("/gig/"+gigid);
        });
    };
  }]);
