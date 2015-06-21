'use strict';

var app = angular.module("Tango");

var localhost = "http://localhost:8000/api";
var heroku = "https://tangong-api.herokuapp.com/api";

app.value("baseUrl", heroku);
