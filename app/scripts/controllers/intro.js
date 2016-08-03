'use strict';

angular.module('promoodApp')

.controller('IntroController', function ($scope, $rootScope, $state, GoalsService) {
  
  ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    //StatusBar.hide();
  });
  
  $scope.redirectToMindfulness = function() {
    GoalsService.getTechnics().then(function(result){
      $scope.technics = result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;
      
      var oneTechnic = _.where($scope.technics, {title:'Training'});
//    $scope.technics = [{}, oneTechnic[0]];
        
      var technic = oneTechnic[0];
      technic.id = "T30_BIS";
        
      $rootScope.technicsToDo = [];
      $rootScope.technicsToDo.push(technic);
      $state.go('technics');
    });
  }
});
