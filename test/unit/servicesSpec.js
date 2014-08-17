'use strict';

/* jasmine specs for services go here */

describe('service', function() {

    var jsonBlob,$httpBackend;

	beforeEach(module('parking.services'));

    beforeEach(inject(function(){
        var jasmineSuccess = jasmine.createSpy();
        var jasmineError = jasmine.createSpy();

		spyOn(navigator.geolocation,"getCurrentPosition").andCallFake(function() {
            var position = { coords: { latitude: 55.8588, longitude: -4.2479 } };
            arguments[0](position);
        });

    }));

	beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');

        jsonBlob = [
            {"situationRecord":{
                "groupOfLocations":{
                    "locationContainedInGroup":{
                        "pointByCoordinates":{
                            "pointCoordinates":{
                                "latitude":"55.85988984843241",
                                "longitude":"-4.282341367108816"
                            }}}},
                "carParkIdentity":"SECC:CPG25C",
                "carParkStatus":"enoughSpacesAvailable",
                "occupiedSpaces":"8","totalCapacity":"1600"}},
            {"situationRecord":{
                "groupOfLocations":{
                    "locationContainedInGroup":{
                        "pointByCoordinates":{
                            "pointCoordinates":{
                                "latitude":"55.95988984843241",
                                "longitude":"-4.182341367108816"
                            }}}},
                "carParkIdentity":"Zoo:CPG25C",
                "carParkStatus":"carParkFull",
                "occupiedSpaces":"10","totalCapacity":"10"}}
        ];

        $httpBackend.whenGET('http://desolate-lowlands-9828.herokuapp.com/api').respond(
            {"payloadPublication": {
                "situation":
                    jsonBlob
            }}
        );

		this.addMatchers({
			toEqualData: function(expect) {
				return angular.equals(expect, this.actual);
			}
		});

	}));

	describe('glasgowcenter', function() {
		it('should return glasgow centre coordinates', inject(function(glasgowcenter) {
			expect(glasgowcenter).toEqual({
				lat: 55.8588,
				lng: -4.2479,
				zoom: 14});
		}));
	});

	describe('geolocate', function() {
		it('should return false when cannot use browser coordinates', inject(function(geolocate) {

			var expected_output = {
				lat: 55.8588,
				lng: -4.2479,
				message: 'You are here',
				focus: true,
				icon: {
					iconUrl: './img/car.png',
					iconSize:     [32, 32],
					iconAnchor:   [16, 16],
					popupAnchor:  [0, -12]
				},
				draggable: false
			};

			expect(geolocate.me()).toEqual(expected_output);
		}));
	});

	describe('process', function() {
		it('should return map markers without distance when location is false', inject(function(process) {
            var carfeed = jsonBlob;

            var output = process.feed(carfeed, false);
            expect(output.SECC.message).toEqual('<strong>SECC</strong><br>Free spaces: 1592');
            expect(output.Zoo.message).toEqual('<strong>Zoo</strong><br>Car park full');
		}));
	});

	describe('meters', function() {
		it('should return map markers with distance when location found', inject(function(meters) {
            var output;
            meters.update().then(function(data){
                output = meters.get();
            });
            $httpBackend.flush();

            expect(output.current.lat).toBeDefined();
            expect(output.SECC.message).toContain('Distance');
            expect(output.Zoo.message).toNotContain('Distance');
		}));
	});

	describe('meters', function() {
		it('should not show current location when outside Glasgow', inject(function(meters) {
            // stop the previous spy to change coordinates
            navigator.geolocation.getCurrentPosition.isSpy = false;
		    spyOn(navigator.geolocation,"getCurrentPosition").andCallFake(function() {
                var position = { coords: { latitude: 55.9, longitude: -4.420 } };
                arguments[0](position);
            });

            var output;
            meters.update().then(function(data){
                output = meters.get();
            });

            $httpBackend.flush();

            expect(output.current).toBeUndefined();
            expect(output.SECC.message).toContain('Distance');
            expect(output.Zoo.message).toNotContain('Distance');
		}));
	});

});
