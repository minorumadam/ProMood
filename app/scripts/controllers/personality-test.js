'use strict';

angular.module('promoodApp')

.controller('PersonalityTestController', function ($scope, $state, $ionicSlideBoxDelegate, $ionicPopup, $timeout, PersonalityService, $ionicViewService) {
  var questions,
  answers = PersonalityService.getAnswers();
  //console.log(answers);
  var initialize = function() {

    //$ionicSlideBoxDelegate.enableSlide(false);
    $ionicSlideBoxDelegate.stop();
    $timeout(function(){
      $ionicSlideBoxDelegate.enableSlide(0);
    },0);

    $scope.finishedTest = false;
    $scope.index = 0//answers.length;
    PersonalityService.getQuestions()
    .then(function(data) {
      questions = data;
      $scope.question = questions[$scope.index];
      //console.log($scope.question);
    });
  };


  $scope.onSwipeRight = function () {
    $scope.index = $scope.index - 1 ;
    if(questions[$scope.index]) {
      $ionicSlideBoxDelegate.previous();
    }
  };    

  var answer = function(value) {
    answers[$scope.index] = value;
    $scope.index++;

    if(questions[$scope.index]) {
      // Commment to not save MK
      PersonalityService.saveAnswers(answers);
      $scope.question = questions[$scope.index];
    }
    else {
        console.log("finishing from answer");
        finish();
    }
  };
    
  var finish = function() {
      PersonalityService.resolveTest();
      
      if (!$scope.finishedTest){
           $ionicPopup.alert({
             title:  "Good Job! Your time and patience will be rewarded soon. Ready to start?",
             okText: 'Yes'
           }).then(function (res) {
             $state.go("welcome");
           });
          
          $scope.finishedTest = true;
      }
  }

  $scope.answerNo = function() {
    answer(false);
    $ionicSlideBoxDelegate.next();
  };

  $scope.answerYes = function() {
    answer(true);
    $ionicSlideBoxDelegate.next();
  };

  if(true || !PersonalityService.getState()) {
	  if(localStorage.getItem('animationsCheckboxValue') == null)
		{
			localStorage.setItem('animationsCheckboxValue',true);
		}
    initialize();
  }
  else {
    $state.go("welcome");
  }
});
