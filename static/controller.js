'use strict';
angular
  .module('parking', ['parking.services', 'leaflet-directive'])

  .controller('parkingController',['$scope', 'meters', 'glasgowcenter',
              function ($scope, meters, glasgowcenter) {
                  $scope.meters = {};
                  $scope.glasgowCenter = glasgowcenter;

                  var dataRetrieve = function() {
                      meters.update().then(function(){
                          $scope.meters = meters.get();
                      });
                  };

                  dataRetrieve();

              }]);
