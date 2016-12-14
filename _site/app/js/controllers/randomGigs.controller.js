'use strict';

angular.module('Tango')
  .controller('gigsCtrl', ['$scope', 'gigService', 'categoryService', '$window', 'Upload', '$location', '$mdDialog', '$mdToast', '$stateParams', '$animate', function($scope, gigService, categoryService, $window, Upload, $location, $mdDialog, $mdToast, $stateParams, $animate) {



      gigService.randomGigs().success(function(data){
        $scope.randomGigs = data;


