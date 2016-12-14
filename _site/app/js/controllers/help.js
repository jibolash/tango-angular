'use strict';

angular.module('Tango')
  .controller('helpCtlr', ['$scope','$location', function($scope, $location){

    $scope.showHelp = function(){
      console.log(4);
      $location.path('/help');
    };

}]);
