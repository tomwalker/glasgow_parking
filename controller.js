var app = app || angular.module('parking', ['parking.services', 'ngCookies']);

// app.config(['$routeProvider', '$httpProvider', 
//             function ($routeProvider, $httpProvider) {
//                 $httpProvider.defaults.useXDomain = true;
//                 delete $httpProvider.defaults.headers.common['X-Requested-With'];
//             }]);

app.run(function ($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
});

app.controller('parkingController', ['$scope', '$http', 'feed',
	function ($scope, $http, feed) {

		$scope.dataRetrieve = function() {
			feed.get({}, function (data) {
				$scope.carfeed = angular.fromJson(data, [true]);
				console.log('hi');
			});
		};
		$scope.a = $scope.dataRetrieve();
		$scope.cheese = 'woof';

		$scope.data = "unknown";
		$http.jsonp('http://dashboard.glasgow.gov.uk/api/live/parking.php?type=json')
			.success(function(data){
				$scope.data=data;
		});

		
}]);








