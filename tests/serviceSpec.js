'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	beforeEach(module('parking.services'));

	beforeEach(inject(function(_$httpBackend_, meters){
		$m = meters;
		mockBackend = _$httpBackend_;

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
            var jasmineSuccess = jasmine.createSpy();
            var jasmineError = jasmine.createSpy();

			spyOn(navigator.geolocation,"getCurrentPosition").andCallFake(function() {
                var position = { coords: { latitude: 55.1234, longitude: -4.4321 } };
                arguments[0](position);
            });

			var expected_output = {
				lat: 55.1234,
				lng: -4.4321,
				message: 'You are here',
				focus: true,
				icon: {
					iconUrl: './car.png',
					iconSize:     [32, 32],
					iconAnchor:   [16, 16],
					popupAnchor:  [0, -12]
				},
				draggable: false
			};

			expect(geolocate.me()).toEqual(expected_output)
		}));
	});

	// describe('process', function() {
	// 	it('should return map markers without distance when location is false', inject(function(process) {


	// 	}));
	// });


});
