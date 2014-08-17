'use strict';

var mapDistance = function() {
    // taken from http://www.movable-type.co.uk/scripts/latlong.html
    return {
        calculate: function (current, meter) {
            Number.prototype.toRad = function() {
                return this * Math.PI / 180;
            };
            var R = 6371;
            var dLat = (current.lat - meter.lat).toRad();
            var dLon = (current.lng - meter.lng).toRad();
            var lat1 = Number(meter.lat).toRad();
            var lat2 = Number(current.lat).toRad();
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d.toFixed(3);
        }
    };
};



function process(){
  return{
    feed: function (carfeed, location) {

        var map_markers = {};

        for (var meter in carfeed) {

            var name = carfeed[meter].situationRecord.carParkIdentity
                .substring(0, carfeed[meter].situationRecord.carParkIdentity.indexOf(':'))
                .split(' ').join('_'),

            latitude = carfeed[meter].situationRecord.groupOfLocations.locationContainedInGroup
                .pointByCoordinates.pointCoordinates.latitude,

            longitude = carfeed[meter].situationRecord.groupOfLocations.locationContainedInGroup
                .pointByCoordinates.pointCoordinates.longitude,

            full_icon,
            parkingMessage;

            if (carfeed[meter].situationRecord.carParkStatus === "carParkFull"){
                parkingMessage = '<strong>' + name + '</strong><br>Car park full';

                full_icon = {
                    iconUrl: './img/error.png',
                    iconSize:     [32, 32],
                    iconAnchor:   [16, 16],
                    popupAnchor:  [0, -12]
                };

            } else {
                parkingMessage = '<strong>' + name + '</strong><br>Free spaces: ' +
                    (carfeed[meter].situationRecord.totalCapacity -
                     carfeed[meter].situationRecord.occupiedSpaces);

                if (location !== false){
                    var distance = mapDistance().calculate(location,
														   {lat: latitude, lng: longitude});

                    if (distance < 1){
                        parkingMessage = parkingMessage.concat('<br> Distance: ' +
                                                               distance * 1000 + 'm');
                    } else {
                        parkingMessage = parkingMessage.concat('<br> Distance: ' +
                                                               distance + 'km');
                    }
                }


            }

            map_markers[name] = {
                lat: +latitude,
                lng: +longitude,
                message: parkingMessage,
                focus: false,
                icon: full_icon || '',
                draggable: false
            };
        } // end carfeed for loop

        return map_markers;
    }
  };
}

var glasgowCenter = {
    lat: 55.8588,
    lng: -4.2479,
    zoom: 14
};


function geolocate() {

    var output;

    function success(position) {
        var car_icon = {
            iconUrl: './img/car.png',
            iconSize:     [32, 32],
            iconAnchor:   [16, 16],
            popupAnchor:  [0, -12]
        };

        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        output = {
            lat: latitude,
            lng: longitude,
            message: 'You are here',
            focus: true,
            icon: car_icon,
            draggable: false
        };

    }

    function error() {
        output = {};
    }

    var process = function(){
        if (!navigator.geolocation){
            error();
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
        return output;
    };

    process();

    return{
        me: process
    };

}

angular
  .module('parking.services', [])
  .service('process', process)
  .value('glasgowcenter', glasgowCenter)
  .factory('geolocate', geolocate)
  .factory('meters', ['$http', 'process', 'geolocate', function($http, process, geolocate) {

      var map_markers = {},
          current_marker = {};
      var markers = function () {
          return $http.get('http://desolate-lowlands-9828.herokuapp.com/api')
              .success(function (data) {
                  var carfeed = data['payloadPublication']['situation'];
                  var current_marker = geolocate.me();
                  var current_location = {
                      lat: current_marker['lat'],
                      lng: current_marker['lng']
                  };
                  map_markers = process.feed(carfeed, current_location)
                  switch (true){
                      case current_location['lat'] > 55.875 || current_location['lat'] < 55.835:
                        break;
                      case current_location['lng'] > -4.21 || current_location['lng'] < -4.3:
                        break;
                      default:
                        map_markers['current'] = current_marker;
                  }
              });
      };

      markers();

      return {
          update: markers,
          get: function() {return map_markers;}
      };

  }]);
