'use strict';



function process(){
  return{
    feed: function (carfeed, location) {

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

        var map_markers = {};

        for (var meter in carfeed) {
            var name = carfeed[meter].situationRecord.carParkIdentity
                .substring(0, carfeed[meter].situationRecord.carParkIdentity.indexOf(':'))
                .split(' ').join('_');

            var latitude = carfeed[meter].situationRecord.groupOfLocations.locationContainedInGroup
                .pointByCoordinates.pointCoordinates.latitude;

            var longitude = carfeed[meter].situationRecord.groupOfLocations.locationContainedInGroup
                .pointByCoordinates.pointCoordinates.longitude;

            if (carfeed[meter].situationRecord.carParkStatus === "carParkFull"){
                var parkingMessage = '<strong>' + name + '</strong><br>Car park full';

                var full_icon = {
                    iconUrl: './error.png',
                    iconSize:     [32, 32],
                    iconAnchor:   [16, 16],
                    popupAnchor:  [0, -12]
                };

            } else {
                var parkingMessage = '<strong>' + name + '</strong><br>Free spaces: ' +
                    (carfeed[meter].situationRecord.totalCapacity -
                     carfeed[meter].situationRecord.occupiedSpaces);

                if (location !== false){
                    console.log('location is not false');
                    // var distance = mapDistance.calculate(location, {lat: latitude, lng: longitude});

                    // if (distance < 1){
                    //     parkingMessage = parkingMessage.concat('<br> Distance: ' +
                    //                                            distance * 1000 + 'm');
                    // } else {
                    //     parkingMessage = parkingMessage.concat('<br> Distance: ' +
                    //                                            distance + 'km');
                    // }
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

angular
  .module('parking.services', [])
  .service('process', process)
  .value('glasgowcenter', glasgowCenter)

  .factory('meters', ['$http', 'process', function($http, process) {

      var map_markers = {};

      var markers = function (location) {
          location = typeof location !== 'undefined' ? location : false;
          return $http.get('http://desolate-lowlands-9828.herokuapp.com/api')
              .success(function (data) {
                  var carfeed = data['payloadPublication']['situation'];
                  var output = process.feed(carfeed, location);
                  map_markers = output;
              });
      };

      markers();

      var provide = function(){
          console.log(map_markers);
          return map_markers;
      };

      return {

          update: markers,
          get: provide

      };

  }]);
