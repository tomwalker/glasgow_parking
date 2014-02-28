var app = app || angular.module('parking', ['parking.services', 'ngCookies']);

// app.config(['$httpProvider', function($httpProvider) {
// 	$httpProvider.defaults.useXDomain = true;
// 	delete $httpProvider.defaults.headers.common["X-Requested-With"];
// }]);

app.controller('parkingController', ['$scope', '$http', 'feed',
        function ($scope, $http, feed) {
			// $httpProvider.defaults.useXDomain = true;
			delete $http.defaults.headers.common["X-Requested-With"];				
            
            $scope.fetch = function() {
				console.log('clicked');
                feed.jsonpquery(function (data) {
					console.log(data);
                    $scope.carfeed = angular.fromJson(data, [true]);
                    console.log('hi');
                });
            };
            // $scope.a = $scope.dataRetrieve();
	    
            $scope.cheese = 'woof';

            // $scope.data = "unknown";

            // $http.jsonp('http://dashboard.glasgow.gov.uk/api/live/parking.php?callback=JSON_CALLBACK')
            //     .then(function(data){
            //         $scope.carfeed = data;
	    	// 		console.log(data);
            //     });
				// .error(function(data){
				// 	console.log('error detected');
				// 	console.log(data);
				// 	$scope.carfeed = 'chicken and chips';
				// });
			
	    

        
}]);





