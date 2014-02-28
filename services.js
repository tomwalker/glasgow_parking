'use strict';

/* Services */


var services = angular.module('parking.services', ['ngResource']);

services.factory('feed', ['$resource',
    function($resource) {
		var url = 'http://dashboard.glasgow.gov.uk/api/live/trafficEvents.php?type=json';
		// var url = 'http://dashboard.glasgow.gov.uk/api/live/parking.php';
        return $resource(url,
						{},
						{
							jsonpquery: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: false },
							get: { method: 'GET', isArray: false }
						});
    }
]);







