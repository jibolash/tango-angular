'use strict';

var app = angular.module("Tango");

app.factory("categoryService", ['baseUrl', '$http', function(baseUrl, $http) {
  return {
    getAll: function() {
      return $http.get(baseUrl + "/categories");
    },
    categoryGigs: function(categoryid) {
      return $http.get(baseUrl + "/gigs/search/category/" + categoryid);
    }
  };
}]);
