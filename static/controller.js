'use strict';
angular
    .module('parking', ['parking.services', 'leaflet-directive'])

    .controller('parkingController',
                ['$scope', 'meters', 'glasgowcenter',
                 function ($scope, meters, glasgowcenter) {
                     $scope.meters = {};
                     $scope.glasgowCenter = glasgowcenter;

                     var dataRetrieve = function(location) {
                         meters.update(location).success(function(){
                             $scope.meters = meters.get();
                         });
                     };



                     if (!navigator.geolocation){
                         $scope.current_location = false;
                         dataRetrieve(false);
                     }

                     function success(position) {
                         var car_icon = {
                             iconUrl: './car.png',
                             iconSize:     [32, 32],
                             iconAnchor:   [16, 16],
                             popupAnchor:  [0, -12]
                         };

                         var latitude  = position.coords.latitude;
                         var longitude = position.coords.longitude;

                         $scope.meters['current'] = {
                             lat: latitude,
                             lng: longitude,
                             message: 'You are here',
                             focus: true,
                             icon: car_icon,
                             draggable: false
                         };

                         $scope.current_location = {
                             lat: latitude,
                             lng: longitude
                         };
                         console.log('not error');
                         dataRetrieve($scope.current_location);

                     }

                     function error() {
                         console.log('error');
                         $scope.current_location = false;
                         dataRetrieve(false);
                     }

                     navigator.geolocation.getCurrentPosition(success, error);

                 }]);
