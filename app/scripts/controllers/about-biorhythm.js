'use strict';

angular.module('promoodApp')

.controller('AboutBiorhythm', function ($scope, $rootScope, $state, StateService, $ionicNavBarDelegate) {

  var initialize = function() {
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
  };

  $scope.goBack = function(){
    $rootScope.returningFromBioRhythmAbout = true;
    $state.go($rootScope.savedScope.returnTo);
    //ionicHistory.backView();
    //$state.go("not-so-good.pathology-description");
  }
  initialize();
});
