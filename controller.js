var app = app || angular.module('parking', ['parking.services',
					    'ngCookies', 'leaflet-directive']);

app.config(['$httpProvider', function($httpProvider) {

    // $httpProvider.defaults.headers.get = { 'Access-Control-Allow-Origin' : '*' }
    // $httpProvider.defaults.headers.get = { 'Accept' : '*/*' }

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
}]);

app.controller('parkingController',
	       ['$scope', '$http', 'feed',
		function ($scope, $http, feed) {
		    
		    $scope.dataRetrieve = function() {
			feed.get(function (data) {
	    		    console.log(data);
			    // $scope.carfeed = angular.fromJson(data, [true]);
	    		    $scope.carfeed = data['payloadPublication']['situation'];
			    console.log('hi');
			});
		    };
		    $scope.a = $scope.dataRetrieve();

		    $scope.glasgowCenter = {
			lat: 55.8588,
			lng: -4.2479,
			zoom: 13
		    };
		    
		    // $scope.cheese = 'woof';

		    $scope.data = "ping";


		    
		}]);