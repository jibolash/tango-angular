'use strict';

var app = angular.module("Tango");

app.factory('gigService', ['$http','baseUrl', 'Upload', function($http, baseUrl, Upload){

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

  gigFactory.searchCategory = function(category){
    return $http.get(baseUrl + '/gigs/search/category/'+category);
  };

  gigFactory.uploadImage =  function(image, method, url, gig){
    return Upload.upload({
      url: baseUrl+ '/gigs',
      method: POST,
      data: gig,
      file: image
    });
  };

  return gigFactory;

}]);
