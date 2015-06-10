'use strict';

var app = angular.module('Tango');

const baseUrl = 'http://localhost:8000/api'; //localhost
//const baseUrl = 'https://tangong-api.herokuapp.com/api'; //heroku

//service handlingn requests to the api concerning users
app.factory('userService', ['$http', function($http){

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

  userFactory.addUser = function(userData){
    return $http.post(baseUrl + '/users', userData);
  };

  userFactory.editUser = function(userid, userData){
    return $http.put(baseUrl + 'user/'+ userid, userData);
  };

  userFactory.deleteUser = function(userid){
    return $http.delete(baseUrl + 'user/'+userid);
  };

  return userFactory;

}]);

app.factory('gigService', ['$http', function($http){

  var gigFactory = {};

  gigFactory.allGigs = function(){
    return $http.get(baseUrl + '/gigs');
  };

  gigFactory.oneGig = function(gigid){
    return $http.get(baseUrl + '/gig/' + gigid);
  };

  gigFactory.addGig = function(gigData,id){
    gigData.addedBy = id;
    return $http.post(baseUrl + '/books', gigData);
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

  app.factory('Auth', ['$http', '$q', 'AuthToken', function($http, $q, AuthToken){

    var authFactory = {};

    authFactory.login = function(username, password) {
      return $http.post(baseUrl + '/authenticate', {
        username: username,
        password: password
      })
      .success(function(data){
        AuthToken.setToken(data.token);
        return data;
      })
      .error(function(err){
        console.log(err)
      });
    };

    authFactory.logout = function(){
      AuthToken.setToken();
    };

    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken()){
        return true;
      }
      else{
        return false;
      }
    };

    authFactory.getUser = function(){
      if(AuthToken.getToken()){
        return $http.get(baseUrl + '/me');
      }
      else{
        return $q.reject({message: 'User has no token'});
      }
    };

    return authFactory;
  }]);

  //service authenticating token
  app.factory('AuthToken', ['$window', function($window){
    var authTokenFactory = {};

    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token');
    };

    authTokenFactory.setToken = function(token){
      if(token){
        $window.localStorage.setItem('token', token);
      }
      else{
        $window.localStorage.removeItem('token');
      }
    };
    return authTokenFactory;
  }]);


  app.factory('AuthInterceptor', ['$q', '$location', 'AuthToken', function($q, $location, AuthToken){

    var interceptorFactory = {};

    interceptorFactory.request = function(config){
      var token = AuthToken.getToken();
      if(token){
        config.headers['x-access-token'] = token;
      }
      return config;
    };

    interceptorFactory.responseError = function(response){
      if(response.status === 403){
        AuthToken.setToken();
        $location.path('/login');
      }
      return $q.reject(response);
    };
    return interceptorFactory;
  }]);
