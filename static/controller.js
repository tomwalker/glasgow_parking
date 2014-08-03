'user strict';
angular
	.module('parking', ['parking.services', 'leaflet-directive'])


	.controller('parkingController',
				['$scope', 'meters', 'MapDistance', 'glasgowcenter',
				 function ($scope, meters, MapDistance, glasgowcenter) {

					 $scope.glasgowCenter = glasgowcenter;

					 $scope.meters = {};

					 $scope.dataRetrieve = function(location) {
						 console.log(meters());
						 meters(location).success(function(markers){
							 console.log(markers);
						 	 $scope.meters = markers;
						 });

					 };



					 if (!navigator.geolocation){
						 $scope.current_location = false;
						 return;
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
						 $scope.dataRetrieve($scope.current_location);

					 }

					 function error() {
						 console.log('error');
						 $scope.current_location = false;
						 $scope.dataRetrieve(false);
					 }
					 navigator.geolocation.getCurrentPosition(success, error);

				 }]);
