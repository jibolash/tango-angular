'use strict';

var app = angular.module("Tango");

app.factory("categoryService", ['baseUrl','$http', function(baseUrl,$http){
	return {
		getAll: function(){
			return $http.get(baseUrl+"/categories");
		}
	}
}])