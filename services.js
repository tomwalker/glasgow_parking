'use strict';

/* Services */


var services = angular.module('parking.services', ['ngResource']);

services.factory('feed', ['$resource',
    function($resource) {
        return $resource('http://dashboard.glasgow.gov.uk/api/live/parking.php?type=json');
    }
]);





