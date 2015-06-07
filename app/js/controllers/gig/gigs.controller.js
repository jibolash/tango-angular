'use strict';

angular.module('Tango').controller('gigsCtrl', ['$scope', 'gigService', function($scope, gigService){
  gigService.allGigs().success(function(data){
    $scope.gigs = data;
  });
}]);
