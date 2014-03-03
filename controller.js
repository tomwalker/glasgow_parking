var app = app || angular.module('parking', ['parking.services',
                                            'ngCookies', 'leaflet-directive']);

app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
}]);

app.controller('parkingController',
               ['$scope', 'feed', function ($scope, feed) {
                    
    $scope.dataRetrieve = function() {
        feed.get(function (data) {
            console.log(data);
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

	$scope.data = "ping";

}]);

