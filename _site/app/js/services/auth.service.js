'use strict';

var app = angular.module('Tango');

//heroku
app.factory('Auth', ['$http', '$q', 'AuthToken','baseUrl','$location', function($http, $q, AuthToken, baseUrl,$location){

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

    authFactory.checkLogin = function(){
      if(!this.isLoggedIn()){
        $location.path("/");
      }
    }

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
