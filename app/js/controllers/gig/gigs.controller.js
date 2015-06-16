'use strict';

angular.module('Tango')
  .controller('gigsCtrl', ['$scope', 'gigService', 'categoryService', '$window', 'Upload', '$location', '$mdDialog', function($scope, gigService, categoryService, $window, Upload, $location, $mdDialog) {

    gigService.allGigs().success(function(data) {
      $scope.gigs = data;
    });

    categoryService.getAll()
      .success(function(data) {
        $scope.categories = data;
      });

    $scope.postGig = function() {
      $location.path('/gigs/new');
    };
    $scope.doAdd = function(gig) {
      var id = $window.localStorage.getItem('token');
      var localhost = "http://localhost:8000/api/gigs";
      var heroku = "https://tangong-api.herokuapp.com/api/gigs";

      gig.image = gig.image[0];
      var upload = Upload.upload({
          url: heroku,
          method: "POST",
          file: gig.image,
          fields: gig
        })
        .success(function(data) {
          $scope.showRecentGigs();
        });
    };

    $scope.showRecentGigs = function() {
      $location.path('/gigs');
    };

    $scope.deleteGig = function(gigid) {
      gigService.deleteGig(gigid).success(function(data) {
        $location.path('/gigs');
        console.log(2, data);
      });
    };

    $scope.showConfirm = function(ev, gigid) {
      console.log(1, gigid)
      var confirm = $mdDialog.confirm()
        .title('Do you want to permanently delete this gig?')
        .content('There is no way for you to retrieve it...')
        .ariaLabel('Lucky day')
        .ok('Yes')
        .cancel('No')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.deleteGig(gigid);
      }, function() {});
    };
  }]);
