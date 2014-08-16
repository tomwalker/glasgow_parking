'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('glasgow parking app', function() {

    browser.get('index.html');

    it('should load html with the correct title', function() {
        expect(browser.getTitle()).toEqual('Live Glasgow Council Parking Spaces');
    });

    it('should have markers', function() {
        element.all(by.css('.leaflet-marker-icon')).then(function(markers) {
            expect(markers.length).toBe(12);
        });

    });

    it('should show a car as the last marker', function() {
        element.all(by.css('.leaflet-marker-icon')).last().then(function(final_marker) {
            expect(final_marker.getAttribute('src')).toContain("car.png");
        });

    });





});
