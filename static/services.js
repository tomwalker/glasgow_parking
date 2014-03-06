'use strict';

var services = angular.module('parking.services', ['ngResource']);

services.factory('feed', ['$resource',
    function($resource) {
        return $resource('http://desolate-lowlands-9828.herokuapp.com/api');
    }
]);