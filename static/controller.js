'user strict';
angular
	.module('parking', ['parking.services', 'leaflet-directive'])


	.controller('parkingController',
				['$scope', 'meters', 'MapDistance', function ($scope, meters, MapDistance) {

					$scope.meters = {};

					$scope.dataRetrieve = function(location) {
						console.log(meters(location));
						meters(location).$promise.then(function(markers){
							$scope.meters = markers;
						});


					};


					$scope.glasgowCenter = {
						lat: 55.8588,
						lng: -4.2479,
						zoom: 14
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

						$scope.dataRetrieve($scope.current_location);

					}

					function error() {
						$scope.current_location = false;
						$scope.dataRetrieve();
					}
					navigator.geolocation.getCurrentPosition(success, error);

	}]);
