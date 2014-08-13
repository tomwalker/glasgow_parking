'use strict';

describe('controllers', function(){
    beforeEach(module('parking.controllers'));

    var $scope = {};

    it('should have access to glasgow coordinates', inject(function($controller) {
        var myCtrl1 = $controller('parkingController', { $scope: $scope, });

        expect(myCtrl1).toBeDefined();
        expect($scope.glasgowCenter.lat).toEqual(55.8588);
    }));

});

describe('controller calling meters service', function() {
    var scope;
    var meterService;
    var controller;
    var q;
    var deferred;

    beforeEach(module('parking.controllers'));

    // define the mock
    beforeEach(function() {
        meterService = {
            get: function(){
                return 'hi';
            },

            update: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        q = $q;
        controller = $controller('parkingController', { $scope:scope, meters: meterService });
    }));

    it('should call meters.update when the controller is activated', function() {
        spyOn(meterService, 'update').andCallThrough();

        controller.dataRetrieve();

        deferred.resolve();

        scope.$root.$digest();

        expect(meterService.update).toHaveBeenCalled();

    });

    it('should set scope.meters after meter service has been updated', function() {
        controller.dataRetrieve();

        deferred.resolve();

        scope.$root.$digest();

        expect(scope.meters).not.toBe({});
    });
});
