var app = app || angular.module('parking', ['parking.services', 'ngCookies']);

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
	    		    $scope.carfeed = data;
			    console.log('hi');
			});
		    };
		    $scope.a = $scope.dataRetrieve();
		    
		    // $scope.cheese = 'woof';

		    $scope.data = "ping";

		    // $http({method:'GET',
		    // 	   url: 'http://dashboard.glasgow.gov.uk/api/live/parking.php?type=json',
		    // 	   headers: {}})
		    //     .success(function(data, status, headers, config){
		    // 	    $scope.feedout = data;
		    // 	    // console.log(data);
		    //     })
		    // 	.error(function(data, status, headers, config) {
		    // 	    // called asynchronously if an error occurs
		    // 	    // or server returns response with an error status.
		    // 	    $scope.feedout = 'moo';
		    // 	});
		    
		}]);