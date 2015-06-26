'use strict';

angular.module('Tango')
  .controller('gigsCtrl', ['$scope', 'gigService', 'categoryService', '$window', 'Upload', '$location', '$mdDialog', '$mdToast', '$stateParams', '$animate', function($scope, gigService, categoryService, $window, Upload, $location, $mdDialog, $mdToast, $stateParams, $animate) {

    if ($stateParams.hasOwnProperty("catid")) {
      categoryService.getOne($stateParams.catid).success(function(catData) {
        $scope.groupCategoryName = catData.name;
        gigService.searchCategory($stateParams.catid).success(function(data) {
          $scope.isempty = (data.length===0)? true:false;
          $scope.gigs = data;
        });
      })
    } else {

      gigService.allGigs().success(function(data) {
        $scope.gigs = data;
      });
    }


    categoryService.getAll()
      .success(function(data) {
        $scope.categories = data;
      });
    $scope.postGig = function() {
      $location.path('/gigs/new');
    };
    $scope.doAdd = function(gig) {
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
        $mdToast.show({
          templateUrl: 'app/views/deleteToast.html',
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

    $scope.state_list = ['Abuja','Anambra','Enugu','Akwa Ibom','Adamawa','Abia','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers'];
    $scope.city_list = ['Aba','Abakaliki','Abeokuta','Abuja','Akure','Asaba','Anambra','Atlanta','Awka','Bauchi','Benin City','Birnin Kebbi','Calabar','Dutse','Eket','Enugu','Gombe','Gusau','Ibadan','Ife','Ikeja','Ikot-Abasi','Ikot Ekpene','Ikoyi','Ilorin','Jalingo','Jimeta','Jos','Kaduna','Kano','Katsina','Karu','Kumariya','Lafia','Lagos','Lokoja','Maiduguri','Makurdi','Minna','Nsukka','Ogbomoso','Onitsha','Oron','Oshogbo','Owerri','Owo','Oyo','Port Harcourt','Potiskum','Sokoto','Suleja','Umuahia','Uyo','Warri','Wukari','Yenagoa','Yola','Zaria'
];
  }]);
