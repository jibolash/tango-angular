'use strict';

var app = angular.module('Tango');

app.factory('userService', ['$http','baseUrl', function($http,baseUrl){

  var userFactory = {};

  userFactory.allUsers = function(){
    return $http.get(baseUrl + '/users');
  };

  userFactory.oneUser = function(userid){
    return $http.get(baseUrl + '/user/' + userid);
  };

  userFactory.getByUsername = function(username){
    return $http.get(baseUrl + '/user/username/' + username);
  };

  userFactory.getByEmail = function(email){
    return $http.get(baseUrl + '/user/username/' + email);
  };

  userFactory.addUser = function(userData){
    return $http.post(baseUrl + '/users', userData);
  };

  userFactory.editUser = function(userid, userData){
    return $http.put(baseUrl + '/user/'+ userid, userData);
  };

  userFactory.deleteUser = function(userid){
    return $http.delete(baseUrl + '/user/'+userid);
  };

  userFactory.userGigs = function(username){
    var promise = $http.get(baseUrl + '/gigs/search/user/' + username);
    return promise;
  };

  userFactory.forgotPassword = function(email){
    return $http.post(baseUrl + '/forgot', email);
  };

  userFactory.resetPassword = function(token, password){
    return $http.post(baseUrl + '/reset/'+ token, password);
  };

  return userFactory;

}]);
