'use strict';

angular.module('promoodApp')
.controller('GoalsController', function ($scope, $rootScope, $state, FeelingService) {
  $rootScope.showHomeButton = true;
  $rootScope.showNoGoals = false;

  var initialize = function() {
    $scope.goals = FeelingService.getGoals();

		if($scope.goals.length == 0)
			{
				$rootScope.showNoGoals = true;
			}

    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");

  };

  $scope.removeGoal = function(index){
    FeelingService.removeGoal(index);
    $scope.goals = FeelingService.getGoals();
		if($scope.goals.length == 0)
			{
				$rootScope.showNoGoals = true;
			}
  };

  $scope.getGoalsCount = function(){
    return FeelingService.getGoals().length;
  };

  $scope.resumeGoal = function(goal){
		$rootScope.technicsToDo = [goal];
    $rootScope.technicsToDo.wasPostponed = true;
		$scope.goals = FeelingService.getGoals();
		$state.go('technics');
  };

  $scope.showGoalDescription = function(idDOM) {
	  var element = document.querySelector(idDOM);
	  if(element.style.display != 'inline-block'){
		  		element.style.display = 'inline-block';
		  }
		else{
			element.style.display = 'none';
		}
  };


  initialize();
});
