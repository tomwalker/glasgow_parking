'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
    beforeEach(module('parking.controllers'));

    var scope, controller, $scope = {};

    beforeEach(inject(function($controller, $rootScope, $q) {
        var meters = {
            update: function () {
                var def = $q.defer();
                return def.promise;
            },
            get: function() {
                return 'meter data';
            }
        };
        spyOn(meters, 'update').andCallThrough();
        scope = $rootScope.$new();
        controller = $controller('parkingController', {
            $scope: scope,
            meters: meters
        });
    }));




    it('should have access to glasgow coordinates', inject(function($controller) {
        var myCtrl1 = $controller('parkingController', { $scope: $scope, });
        console.log($scope.meters);

        expect(myCtrl1).toBeDefined();
        expect($scope.glasgowCenter.lat).toEqual(55.8588);
    }));

    // it('should ....', inject(function($controller) {
    //   //spec body
    //   var myCtrl2 = $controller('MyCtrl2', { $scope: {} });
    //   expect(myCtrl2).toBeDefined();
    // }));
});
