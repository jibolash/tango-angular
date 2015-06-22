'use strict';

angular.module('Tango')
  .directive('addressBasedGoogleMap', function() {
    return {
      restrict: "A",
      template: "<div id='addressMap'></div>",
      scope: {
        address: "=",
        zoom: "="
      },
      controller: function($scope) {
        var geocoder;
        var latlng;
        var map;
        var marker;
        var initialize = function() {
          geocoder = new google.maps.Geocoder();
          var mapOptions = {
            zoom: $scope.zoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById('addressMap'), mapOptions);
        };
        var markAdressToMap = function() {
          geocoder.geocode({
              'address': $scope.address
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
                });
              }
            });
        };
        $scope.$watch("address", function() {
          if ($scope.address !== undefined) {
            markAdressToMap();
          }
        });
        initialize();
      },
    };
  });
