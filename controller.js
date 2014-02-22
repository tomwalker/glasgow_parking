var app = app || angular.module('parking', ['parking.services', 'ngCookies']);

app.config(['$httpProvider', function($httpProvider) {
   delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

app.controller('parkingController', ['$scope', '$http', 'feed',
        function ($scope, $http, feed) {
            
            $scope.dataRetrieve = function() {
                feed.get({}, function (data) {
		    console.log(data);
                    $scope.carfeed = angular.fromJson(data, [true]);
                    console.log('hi');
                });
            };
            $scope.a = $scope.dataRetrieve();
	    
            $scope.cheese = 'woof';

            $scope.data = "unknown";

            // $http.get('http://dashboard.glasgow.gov.uk/api/live/parking.php?type=json')
            //     .success(function(data){
            //         $scope.data=data;
	    // 	    console.log(data);
            //     });
	    

        
}]);