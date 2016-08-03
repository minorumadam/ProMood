'use strict';

angular.module('promoodApp')

.controller('TestLonelinessController', function ($scope, $rootScope, $state, GoalsService) {

  ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    //StatusBar.hide();
  });

  $scope.redirectToLonelinessTest = function() {
    GoalsService.getTechnics().then(function(result){

      window.localStorage['lonelinessTestAlreadyEjecuted'] = angular.toJson(false);

      $scope.technics = result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;

      var oneTechnic = _.where($scope.technics, {title:'Test Loneliness'});
      //      $scope.technics = [{}, oneTechnic[0]];

      $rootScope.technicsToDo = [];
      $rootScope.technicsToDo.push(oneTechnic[0]);
      $state.go('technics');
    });
  }
});
