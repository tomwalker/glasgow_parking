'use strict';

/* Services */


var services = angular.module('parking.services', ['ngResource']);

services.factory('feed', ['$resource',
    function($resource) {
        return $resource('http://localhost:4242/api');
    }
]);







