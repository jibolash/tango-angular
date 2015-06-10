'use strict';

var app = angular.module("Tango");

app.factory('gigService', ['$http','baseUrl', function($http,baseUrl){

  var gigFactory = {};

  gigFactory.allGigs = function(){
    return $http.get(baseUrl + '/gigs');
  };

  gigFactory.oneGig = function(gigid){
    return $http.get(baseUrl + '/gig/' + gigid);
  };

  gigFactory.addGig = function(gigData,id){
    // gigData.addedBy = 3;
    return $http.post(baseUrl + '/gigs/', gigData);
  };

  gigFactory.editGig = function(gigid, gigData){
    return $http.put(baseUrl + '/gig/'+ gigid, gigData);
  };

  gigFactory.deleteGig = function(gigid){
    return $http.delete(baseUrl + '/gig/'+gigid);
  };

  gigFactory.searchGig = function(){

  };

  gigFactory.searchCategory =function(categoryName){
    return $http.get(baseUrl + '/gigs/search/category?category='+categoryName);
  };

  return gigFactory;

}]);