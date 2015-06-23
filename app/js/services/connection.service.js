'use strict';

var app = angular.module("Tango");

app.factory("connectionService", ['baseUrl','$http', function(baseUrl,$http){
  return {
    get: function(user_id){
      return $http.get(baseUrl + "/connection/"+user_id);
    }
  };
}]);
