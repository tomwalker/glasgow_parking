var app = app || angular.module('parking', ['parking.services', 'leaflet-directive']);

// app.config(['$httpProvider', function($httpProvider) {

//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
// }]);

app.controller('parkingController',
               ['$scope', 'feed', function ($scope, feed) {

    function mapDistance(current, meter) {
        // taken from http://www.movable-type.co.uk/scripts/latlong.html
                
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        };
                
        var R = 6371;
        var dLat = (current.lat - meter.lat).toRad();
        var dLon = (current.lng - meter.lng).toRad();
        var lat1 = Number(meter.lat).toRad();
        var lat2 = Number(current.lat).toRad();

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d.toFixed(3);
    }

    $scope.meters = {};
                    
    $scope.dataRetrieve = function() {

        feed.get(function (data) {

            var carfeed = data['payloadPublication']['situation'];

			var x = 0;

            for (var meter in carfeed) {
                var name = carfeed[meter]
                    .situationRecord
                    .carParkIdentity
                    .substring(0,
                     carfeed[meter].situationRecord.carParkIdentity.indexOf(':'));

				name = name.split(' ').join('-');

                var latitude = carfeed[meter].situationRecord
                    .groupOfLocations.locationContainedInGroup
                    .pointByCoordinates.pointCoordinates.latitude;

                var longitude = carfeed[meter].situationRecord
                    .groupOfLocations.locationContainedInGroup
                    .pointByCoordinates.pointCoordinates.longitude;


                if (carfeed[meter].situationRecord.carParkStatus === "carParkFull"){
                    var parkingMessage = '<strong>' + name + '</strong><br>Car park full';
            
                    var full_icon = {
                        iconUrl: './error.png',
                        iconSize:     [32, 32],
                        iconAnchor:   [16, 16],
                        popupAnchor:  [0, -12]
                    };
                    
                    $scope.meters[name] = {
                        lat: latitude,
                        lng: longitude,
                        message: parkingMessage,
                        focus: false,
                        icon: full_icon,
                        draggable: false
                    };
        
                } else {
            
                    var parkingMessage = '<strong>' + name +
                        '</strong><br>Free spaces- ' +
                        (carfeed[meter].situationRecord.totalCapacity -
                         carfeed[meter].situationRecord.occupiedSpaces);

                    if ($scope.current_location !== false){
                        var distance = mapDistance($scope.current_location,
                                                   {lat: latitude, lng: longitude});
                        if (distance < 1){
                            parkingMessage = parkingMessage.concat('<br> Distance ' +
                                                                   distance * 1000 + 'm');
                        } else {
                            parkingMessage = parkingMessage.concat('<br> Distance ' +
                                                                   distance + 'km');
                        }
                    }

                    $scope.meters[name] = {
                        lat: latitude,
                        lng: longitude,
                        message: parkingMessage,
                        focus: false,
                        draggable: false
                    };
                }


            }
			console.log($scope.meters);
            
        });                     // end of feed.get


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

    $scope.dataRetrieve();

    }

    function error() {
        $scope.current_location = false;
    $scope.dataRetrieve();
    }


    navigator.geolocation.getCurrentPosition(success, error);


}]);
