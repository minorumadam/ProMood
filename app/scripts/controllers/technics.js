'use strict';

angular.module('promoodApp')

.controller('TechnicsController', function ($scope, $rootScope, $state, $timeout, $interval,
                                            $ionicSlideBoxDelegate, NotificationsService, FeelingService, GoalsService,
                                            PersonalityService, TrainingsService, CalendarService, $ionicPopup, $ionicScrollDelegate, ngAudio) {
  var technicTimer;
  var initialize = function(){

    //document.addEventListener("deviceready", onDeviceReady, false);

    angular.element(document.querySelector("#leftMenutButton")).removeClass("pink");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("blue");

    $scope.lonelinessTestAlreadyEjecuted = angular.fromJson(window.localStorage['lonelinessTestAlreadyEjecuted']);
    $scope.proclivityTestAlreadyEjecuted = angular.fromJson(window.localStorage['proclivityTestAlreadyEjecuted']);

    GoalsService.getTechnics().then(function(result){

      // needs to be saved
      var problemSolving = _.where(result, {title:'Problem Solving'});
      $scope.problemSolving = problemSolving[0];
      $scope.technicNumber = 0;

      $scope.technics = $rootScope.technicsToDo ? $rootScope.technicsToDo : result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;

      // ****
      //var oneTechnic = _.where($scope.technics, {title: 'Procastination'});
      //$scope.technics = [{}, oneTechnic[0]];
      // *****

      $scope.technic = $scope.technics[$scope.technicNumber];
      $scope.onTechnic = true;
      $scope.onGotMoreTime = false;
      $scope.step = 0;

      $scope.$watch('step', function() {
        /*console.log('currentStep: ' + ($scope.step + 1) + '    ($scope.step= ' + $scope.step + ' )' +
            '(good counter = ' + $scope.goodImageStillDisturbedCounter + ')  ' +
            '(bad  counter = ' + $scope.badImageCounter + ')');*/
        $scope.stopAudio();
      });

      showGoalSummary();
      $state.go('technics');
      $scope.showNextButton = true;

	  // VARIABLES ADD TO GOALS BUTTONS
	  $scope.showIndecisionAddToGoals = false;
	  $scope.showProblemAddToGoals = false;
	  $scope.showProcastinationAddToGoals = false;
	  $scope.showRuminativeAddToGoals = false;

    }, function(error){
      console.log(error);
    });
  };

  var showGoalSummary = function(){
    if (!$scope.technic.data){
      return;
    }
    if ($scope.technic.id == 'T14'){
      $scope.step = 7;
      $scope.problem = $scope.technic.data;
    } else if ($scope.technic.id == 'T10'){
      $scope.step = 8;
      $scope.procastination = $scope.technic.data;
    } else if ($scope.technic.id == 'T7'){
      $scope.step = 7;
      $scope.indecision = $scope.technic.data;
    } else if ($scope.technic.id == 'T19'){
      $scope.step = 8;
      $scope.rumitative = $scope.technic.data;
    }
  };

  // for rumitative thoughs (rumi-8.html)
  // for procatination (proca-6.htmlm, proca-9.html)
  // for indecision (inde-8.html)
  $scope.getFormatedDate = function(dateAsString){
    var parsedDate = dateAsString.split("-");
    if (parsedDate.length == 0){
      parsedDate = dateAsString.split("/");
    }
    return parsedDate[2] + "/" + parsedDate[1] + "/" + parsedDate[0];
  }

  $scope.changeInputType = function($event, toggleInputType){
    var elem = $event.currentTarget || $event.srcElement;
    elem.setAttribute('type',toggleInputType);
  }
  $scope.restoreInputType = function($event, toggleInputType){
    var elem = $event.currentTarget || $event.srcElement;
    if(elem.value == '') {
      elem.setAttribute('type','text');
      return;
    }
    if (elem.type === 'date' && toggleInputType === 'text') {
      elem.setAttribute('type',toggleInputType);
      elem.value = $scope.getFormatedDate(elem.value);
    }
  }

  $scope.goToWizardNext = function(){
    if (isValidState()){
  	  $scope.showIndecisionAddToGoals = false;
  	  $scope.showProblemAddToGoals = false;
  	  $scope.showProcastinationAddToGoals = false;
  	  $scope.showRuminativeAddToGoals = false;
      $scope.technic.description = '';
      $scope.technic.url = $scope.technic.urls[$scope.step];
      if ($scope.technic.urls.length == ($scope.step +1)){
        GoalsService.doneTechnic($scope.technics[$scope.technicNumber]);
      } else {
        $scope.step += 1;
  			if($scope.technic.id == 'T7' && $scope.step == 7) {
					$scope.showIndecisionAddToGoals = true;
				} else if ($scope.technic.id == 'T14' && $scope.step == 7) {
					$scope.showProblemAddToGoals = true;
				} else if($scope.technic.id == 'T10' && $scope.step == 8) {
					$scope.showProcastinationAddToGoals = true;
				} else if($scope.technic.id == 'T19' && $scope.step == 8) {
					$scope.showRuminativeAddToGoals = true;
				}
      }
      evaluateWizardFlow();
    } else {
      $ionicPopup.alert({
        title: 'Promood',
        template: 'Please, fill all inputs before continue.'
      });
    }
    $ionicScrollDelegate.scrollTop();
  };

  $scope.goToTechnicNext = function(){

    //if ($scope.audio){
    //  console.log("releasing audio");
    //  $scope.audio.release();
    //}

	  $scope.showIndecisionAddToGoals = false;
	  $scope.showProblemAddToGoals = false;
	  $scope.showProcastinationAddToGoals = false;
	  $scope.showRuminativeAddToGoals = false;

    $scope.onGotMoreTime = false;
    $scope.onTechnic = true;
    $scope.technicNumber += 1;
    $scope.step = 0;


    if ($scope.technics.length == $scope.technicNumber){
      $state.go('welcome');
    } else {
      $scope.technic = $scope.technics[$scope.technicNumber];
    }
    $ionicScrollDelegate.scrollTop();
  };
    
  $scope.noSharing = function(){
      $scope.goToCongratulations();
  }

  $scope.goToCongratulations = function(){
    if ($scope.technics.length == $scope.technicNumber+1){
			  $state.go('welcome');
    } else{
  		if($scope.levelCount) {
  			$scope.nextStepTechniqueString = $scope.levelCount;
  		} else {
  			$scope.nextStepTechniqueString = $scope.technicNumber+1;
  		}
		/*console.log('$scope.levelCount',$scope.levelCount);
		console.log('$scope.technicNumber',$scope.technicNumber);
		console.log('$scope.nextStepTechniqueString',$scope.nextStepTechniqueString);*/
  		if($scope.nextStepTechniqueString === 1) {
  				$scope.nextStepTechniqueString = 'Second';
			} else if($scope.nextStepTechniqueString === 2) {
  				$scope.nextStepTechniqueString = 'Third';
  		} else if($scope.nextStepTechniqueString === 3) {
  				$scope.nextStepTechniqueString = 'Fourth';
  		} else if($scope.nextStepTechniqueString === 4) {
  				$scope.nextStepTechniqueString = 'Training';
  		}
  		$scope.success = {url:"views/congratulations.html"}
  		$scope.onGotMoreTime = true;
  		$ionicScrollDelegate.scrollTop();
	   }
  };

  $scope.goToSuccess = function(){

    if ($scope.audio){
      $scope.audio.release();
    }

    $scope.showNextButton = true;
    if ($scope.technic.title === 'Abdominal Breath'){
      breathingNextStepKillTimer();
    } else if ($scope.technic.title === 'Training'){
      TrainingsService.doneMindfulness($scope);
    }

    // save technic done
    $scope.onTechnic = false;
    $scope.shareMessage = "Things are going better, I just completed the " + $scope.technic.title + " technique on proMOOD!"
    
    if(localStorage.getItem('socialMediaCheckboxValue') == null)
    {
      localStorage.setItem('socialMediaCheckboxValue',true);
    }
    
    $scope.socialMediaEnabled = localStorage.socialMediaCheckboxValue;
    
    $scope.success = {url:"views/success.html"}
    $ionicScrollDelegate.scrollTop();

    $scope.stopAudio();
  };

  $scope.postpone = function(technic){
    if (!$scope.technics.wasPostponed){
      $ionicPopup.confirm({
        title: 'Confirm',
        template: "Would you like to do this later? Click 'Yes' and we'll add it to Goals. ",
        cancelText: 'No',
        okText: 'Yes'
      }).then(function(result) {
        if(result) {
          if ($scope.audio){
            $scope.stopAudio();
          }
          if ($scope.technic.id === "T30_BIS"){
            var dayNumber = TrainingsService.getCurrentDayNumber();
            $scope.technic.goalDescription = "Day " + dayNumber + " of you Mindfulness trainning.";
          }
          FeelingService.saveGoals($scope.technic);
          $scope.goToTechnicNext();
        }
      });
    }
  };

  var removeEmptyValues = function(array, propertyName){
    var nonEmptyArray = [];
    for (var i = 0; i < array.length; i++){
      if (array[i][propertyName] !== ''){
        nonEmptyArray.push(array[i]);
      }
    }
    return nonEmptyArray;
  };


  var isValidState = function(){

    if ($scope.technic.title === 'Jealousy'){
      if ($scope.step === 1){
        $scope.jelousy.auras = removeEmptyValues($scope.jelousy.auras,'name');
        if ($scope.jelousy.auras.length == 0) {
          $scope.jelousy.auras.push({name:''});
          return false;
        }
      }
    } else if ($scope.technic.title === ' Worry '){
      if (($scope.step === 0 && $scope.worry2.feelingText === '') || ($scope.step === 2 && $scope.worry2.memoriesText === '')) {
        return false;
      }
    } else if ($scope.technic.title === 'EMDR'){
      /*if ($scope.step === 0 && $scope.emdr.negativeThoughts === ''){
        return false;
      }*/
    } else if ($scope.technic.title === 'Guilt'){
      if (($scope.step === 0 && $scope.guilty.why === '') || ($scope.step === 3 && $scope.guilty.presentPast === '')){
        return false;
      }
    } else if ($scope.technic.title === "Worry" || $scope.technic.title === "Suspicion"){
      if ($scope.step === 0){
        $scope.worry1.worries = removeEmptyValues($scope.worry1.worries,'name');
        if ($scope.worry1.worries.length == 0) {
          $scope.worry1.worries.push({name:''});
          return false;
        }
        $scope.worry1.referents = [];
        for (var i = 0; i < $scope.worry1.worries.length; i++){
          $scope.worry1.referents.push({name:''});
        }
      } else if ($scope.step === 1){
        if ($scope.worry1.worries.length == 0){
            $scope.step = 0;
            $scope.technic.url = $scope.technic.urls[$scope.step];
        }
      } else if ($scope.step === 2){
        $scope.worry1.referents = removeEmptyValues($scope.worry1.referents,'name');
        if ($scope.worry1.referents.length == 0) {
          $scope.worry1.referents.push({name:''});
          return false;
        }

        $scope.worry1.diff = [];

        for (var i = 0; i < $scope.worry1.worries.length; i++) {
          $scope.worry1.diff.push({worry : $scope.worry1.worries[i], referent: $scope.worry1.referents[i]});
        }
      } else if ($scope.step === 3){
        if ($scope.worry1.differences === '') {
          return false;
        }
      }
    } else if ($scope.technic.title === "Problem Solving"){
      if ($scope.step === 1 && $scope.problem.vision === ''){
        return false;
      } else if ($scope.step === 2 && $scope.problem.challenge === ''){
        return false;
      } else if ($scope.step === 3){
        $scope.problem.ideas = removeEmptyValues($scope.problem.ideas,'name');
        if ($scope.problem.ideas.length == 0) {
          $scope.problem.ideas.push({name:'', selected: false});
          return false;
        }
      } else if ($scope.step === 4 && $scope.problem.bestIdea === ''){
        return false;
      } else if ($scope.step === 5){
        $scope.problem.solutions = removeEmptyValues($scope.problem.solutions,'name');
        if ($scope.problem.solutions.length == 0) {
          $scope.problem.solutions.push({name:''});
          return false;
        }
      } else if ($scope.step === 6){
        $scope.problem.actions = removeEmptyValues($scope.problem.actions,'name');
        if ($scope.problem.actions.length == 0) {
          $scope.problem.actions.push({name:''});
          return false;
        }
      }
    } else if ($scope.technic.title === "Procastination"){
      if ($scope.step === 1){
        $scope.procastination.tasks = removeEmptyValues($scope.procastination.tasks,'name');
        if ($scope.procastination.tasks.length == 0) {
          $scope.procastination.tasks.push({name:'', a:false, b:false, c:false, date: null, subtasks:[{name:'', a:false, b:false, c:false, date:null}]});
          return false;
        }
      } else if ($scope.step === 2) {
        for (var i = 0; i < $scope.procastination.tasks.length; i ++){
          $scope.procastination.tasks[i].subtasks = removeEmptyValues($scope.procastination.tasks[i].subtasks,'name');
          if ($scope.procastination.tasks[i].subtasks.length === 0) {
            $scope.procastination.tasks[i].subtasks.push({name:'', a:false, b:false, c:false, date:null});
            return false;
          }
        }
      } else if ($scope.step === 4) {
        var isValid = true;
        for (var i = 0; i < $scope.procastination.tasks.length; i ++){
          var task = $scope.procastination.tasks[i];
          if (!task.a && !task.b && !task.c){
            return false;
          }
          for (var j = 0; j < task.subtasks.length; j ++){
            var subTask = task.subtasks[j];
            if (!subTask.a && !subTask.b && !subTask.c){
              return false;
            }
          }
        }
      } else if ($scope.step === 5) {
        var isValid = true;
        for (var i = 0; i < $scope.procastination.tasks.length; i ++){
          var task = $scope.procastination.tasks[i];
          if (task.date === '' || task.date === null){
            return false;
          }
          for (var j = 0; j < task.subtasks.length; j ++){
            var subTask = task.subtasks[j];
            if (subTask.date === '' || subTask.date === null){
              return false;
            }
          }
        }
      } else if ($scope.step === 6) {
        $scope.procastination.persons = removeEmptyValues($scope.procastination.persons,'name');
        if ($scope.procastination.persons.length == 0) {
          $scope.procastination.persons.push({name:''});
          return false;
        }
      } else if ($scope.step === 7) {
        if ($scope.procastination.reward === ''){
          return false;
        }
      }
    } else if ($scope.technic.title === "Indecision"){
      if ($scope.step === 0 && $scope.indecision.decision === ''){
        return false;
      } else if ($scope.step === 1 && $scope.indecision.realGoal === ''){
        return false;
      } else if ($scope.step === 2){
        $scope.indecision.options = removeEmptyValues($scope.indecision.options, 'name')
        if ($scope.indecision.options.length == 0) {
          $scope.indecision.options.push({name:'', pros:[{name:''}], contras:[{name:''}], selected:false});
          return false;
        }
      } else if ($scope.step === 3){
        var isNotValid = false;
        for (var i = 0; i < $scope.indecision.options.length; i ++){
          $scope.indecision.options[i].pros = removeEmptyValues($scope.indecision.options[i].pros,'name');
          if ($scope.indecision.options[i].pros.length == 0){
            $scope.indecision.options[i].pros.push({name:''});
            isNotValid = true;
          }
          $scope.indecision.options[i].contras = removeEmptyValues($scope.indecision.options[i].contras,'name');
          if ($scope.indecision.options[i].contras.length == 0){
            $scope.indecision.options[i].contras.push({name:''});
            isNotValid = true;
          }
        }
        if (isNotValid) return false;
      } else if ($scope.step === 4){
        $scope.indecision.persons = removeEmptyValues($scope.indecision.persons, 'name')
        if ($scope.indecision.persons.length == 0) {
          $scope.indecision.persons.push({name:''});
          return false;
        }
      } else if ($scope.step === 6){
        var isAnOptionSelected = false;
        for (var i = 0; i < $scope.indecision.options.length; i++) {
          isAnOptionSelected = isAnOptionSelected || $scope.indecision.options[i].selected;
        }
        if (!isAnOptionSelected){
          return false;
        }
      } else if ($scope.step === 7 && $scope.indecision.date === ''){
        return false;
      }
    } else if ($scope.technic.title === "Ruminative Thoughts"){
      if ($scope.step === 0 && $scope.rumitative.fear === ''){
        return false;
      } else if ($scope.step === 1 && $scope.rumitative.worstCase === ''){
        return false;
      } else if ($scope.step === 5 && $scope.rumitative.changeDescription.search('Let go') == -1){
        $scope.rumitative.tasks = removeEmptyValues($scope.rumitative.tasks, 'name')
        if ($scope.rumitative.tasks.length == 0) {
          $scope.rumitative.tasks.push({name:''});
          return false;
        }
      } else if ($scope.step === 7 && ($scope.rumitative.break === '' || $scope.rumitative.breakTime === '')){
        return false;
      }
    }
    return true;
  };

  $scope.technicsOnLoad = function(){
    if ($scope.technic.id === "T1"){
      breathingInitialize();
    } else if ($scope.technic.id === "T2"){
      bodyScanInitialize();
    } else if ($scope.technic.id === "T12"){
      worry1Initialize();
    } else if ($scope.technic.id === "T13"){
      worry1Initialize();
    } else if ($scope.technic.id === "T16"){
      worry2Initialize();
    } else if ($scope.technic.id === "T5"){
      jelousyInitialize();
    } else if ($scope.technic.id === "T6"){
      emdrInitialize();
    } else if ($scope.technic.id === "T15"){
      guiltyInitialize();
    } else if ($scope.technic.id === "T14"){
      problemInitialize();
    } else if ($scope.technic.id === "T10"){
      procastinationInitialize();
    } else if ($scope.technic.id === "T7"){
      indecisionInitialize();
    } else if ($scope.technic.id === "T19"){
      rumitativeInitialize();
    } else if ($scope.technic.id === "T62"){
      if ($scope.proclivityTestAlreadyEjecuted){
        $scope.goToTechnicNext();
        $ionicPopup.alert({
          title: 'Promood',
          template: 'You can check your Stress Proclivity Test result anytime in the Profile section.'
        });
      }
      stressInitialize();
    } else if ($scope.technic.id === "T61"){
      if ($scope.lonelinessTestAlreadyEjecuted){
        $scope.goToTechnicNext();
        $ionicPopup.alert({
          title: 'Promood',
          template: 'You can check your Loneliness Test result anytime in the Profile section.'
        });
      } else {
        lonelinessInitialize();
      }
    } else if ($scope.technic.id === "T30"){
      $state.go('trainings');
    }else if ($scope.technic.id === "T30_BIS"){
      $scope.trainingInitialize();
    }
  };

  var evaluateWizardFlow = function(){
    if ($scope.technic.id === "T6"){
      // EMDR
      emdrFlowChange();
    } else if ($scope.technic.id === "T4" && $scope.step === 0){
      // EFT
      //$scope.showNextButton = true;
    } else if ($scope.technic.title === 'Guilt' && ($scope.step === 1 || $scope.step === 4 || $scope.step === 6)){
      // Guilt
      hideButton();
    } else if ($scope.technic.title === 'Worry' || $scope.technic.title === 'Suspicion'){
      // Worry 1
      if ($scope.step === 6 ){
        hideButton();
      } else if ($scope.step === 1){
        if ($scope.worry1.worries.length === 0){
          $scope.step = 0;
          $scope.technic.url = $scope.technic.urls[$scope.step];
        }
      }
    } else if ($scope.technic.title === 'Problem Solving' && $scope.step === 7 ){
      // Problem Solving
      hideButton();
    } else if ($scope.technic.title === 'Procastination' && $scope.step === 8 ){
      // Procastination
      hideButton();
    } else if ($scope.technic.title === 'Ruminative Thoughts' && ($scope.step === 2 || $scope.step ===4 || $scope.step === 8)){
      // Ruminative
      hideButton();
    } else if ($scope.technic.title === 'Test Loneliness'){
      // Loneliness
      if ($scope.step === 1) {
        hideButton();
      }
    } else if ($scope.technic.title === 'Indecision'){
      // Indecision
      if ($scope.step === 7) {
        hideButton();
      }
    } else if ($scope.technic.title === 'Color Awareness') {
      if ($scope.step === 1){
        angular.element(document.querySelector("#ionNavBar")).hide();
        angular.element(document.querySelector("ion-content")).removeClass('has-header');
        hideButton();
        $interval(changeColor, 20000);
      }
    }
  };

  $scope.goToGoals = function(){
    $state.go('goals');
  }

  // Color awareness START
  $scope.closeColorAwareness = function(){
    angular.element(document.querySelector("#ionNavBar")).show();
    angular.element(document.querySelector("ion-content")).addClass('has-header');
    $scope.showButton = true;
    $scope.goToSuccess();
  }
  var changeColor = function(){
    var rgb = getRandomColor();
    angular.element(document.querySelector("#colors")).css({ "background-color": rgb });;
  }
  var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // Color Awarness END

  var hideButton = function(){
    $scope.showNextButton = false;
  };

  var nextStepAndShowButton = function(){
    $scope.step += 1;
    $scope.technic.url = $scope.technic.urls[$scope.step];
    $scope.showNextButton = true;
    $ionicScrollDelegate.scrollTop();
  };

  $scope.nextStepAndShowButton = function(){
    nextStepAndShowButton();
  }

  var nextTechnicAndShowButton = function(){

    $scope.showNextButton = true;
    $scope.goToTechnicNext();
  };

  // Breathing
  var breathingInitialize = function(){
    if ($scope.step === 0){
      $scope.breathing = {speed:'normal', remaining:/*90000*/ 180};
    }
    if ($scope.step === 1){
      $scope.normalSelected = true;
      $scope.breathingStart();
    }
  };

  var breathingNextStepKillTimer = function(){
    $scope.step++;
    $timeout.cancel(technicTimer);
  };

  $scope.breathingStart = function (){
    //$scope.showNextButton = false;
    technicTimer = $timeout(function() {
      if ($scope.breathing.remaining > 0){
        $scope.breathing.remaining--;
      } else {
        $scope.blurElements('goToSuccess');
      }
      if ($scope.step == 1){
        $scope.breathingStart();
      }
    }, 1000);

  };

  $scope.breathingNormal = function(){
    $scope.breathing.speed = 'normal';
    $scope.normalSelected = true;
    $scope.slowSelected = false;
    $scope.slowerSelected = false;
    //console.log($scope.breathing);
  };
  $scope.breathingSlow = function(){
    $scope.breathing.speed = 'slow';
    $scope.normalSelected = false;
    $scope.slowSelected = true;
    $scope.slowerSelected = false;
    //console.log($scope.breathing);

  };
  $scope.breathingSlower = function(){
    $scope.breathing.speed = 'slower';
    $scope.normalSelected = false;
    $scope.slowSelected = false;
    $scope.slowerSelected = true;
    //console.log($scope.breathing);
  };

  // End Breathing

  // Worry2

  var worry2Initialize = function(){
    $scope.initializeAudio('data/beep.mp3', false);
    if ($scope.step == 0){
      $scope.showNextButton = true;
      $scope.worry2 = {countdown:20, feelingText:"", memoriesText:""};
      $scope.tton = true;
      $scope.showButton = true;
    }
  };

  var worry2NextStepKillTimer = function(){
    var cancel = $timeout.cancel($scope.technicTimer);
    $scope.audio.play();
  };

  $scope.worry2Start = function (){
    $scope.showButton = false;
    $scope.technicTimer = $timeout(function() {

      if ($scope.worry2.countdown > 0){
        $scope.worry2.countdown-=1;
      } else {
        $scope.showNextButton = true;
      }
      if ($scope.step == 1){
        $scope.worry2Start();
      }
    }, 1000);
    if ($scope.worry2.countdown == 0 && $scope.showNextButton){
      worry2NextStepKillTimer();
    }
  };


  $scope.worry2OnLoad = function (){
    $scope.showNextButton = false;
    $scope.showButton = true;
  };

  $scope.worry2FeltBetter = function(){
    $scope.worry2.finalFeeling = "You Felt Better";
    $scope.worry2.finalDescription = "<p>As you can see, <strong>worry is linked to your thoughts, and it's up to you  to decide what you want to think.</strong></p><p>When a thought replaces another, the emotion that accompanies the first is also replaced by the emotion caused by the second. In this way we can manipulate our emotions at will, until we address the real problem behind it.</p>";
    $scope.step += 1;
    $scope.technic.url = $scope.technic.urls[$scope.step];

  };

  $scope.worry2StillWorried = function(){
    $timeout.cancel(technicTimer);
    $scope.worry2.finalFeeling = "Still Worried?";
    $scope.worry2.finalDescription = "<p>You probably didn't focus your whole attention to the pleasant memory, thus, gicing space to worry to alter your emotions.</p><p><strong>Worry is linked to your thoughts, and it's up to you to decide what you want to think.</strong></p><p>When a thought replaces another, the emotions that accompanies the first is also replaced by the emotion caused by the second. In this way can manipulate our emotions at will, until we address the real problem behind it.</p>";
    $scope.step += 1;
    $scope.technic.url = $scope.technic.urls[$scope.step];
  };


  // End Worry2

  // Jelousy
  var jelousyInitialize = function(){
    if ($scope.step == 0){
      $scope.showNextButton = true;
      $scope.jelousy = {auras: [{name:''}]};
    }
  };

  $scope.jelousyAdd = function(){
    $scope.jelousy.auras.push({name:''});
  };
  // End Jelousy


  // BodyScan
  var bodyScanInitialize = function(){
    //$scope.initializeAudio('data/mindfulness/02.bodyscan_session A_1min.mp3', true);
    if ($scope.step == 0){
        $scope.showNextButton = true;
    }
  }

  // End BodyScan

  // EMDR
  var emdrInitialize = function(){
    //console.log("EMDR init");
    //$scope.initializeAudio('data/EMDR/EMDR_1min.mp3');
    if ($scope.step == 0){
      $scope.showNextButton = true;
      $scope.emdr = {imageFirstScore: 8, imageSecondScore: 8};
      $scope.goodImageStillDisturbedCounter = 0;
      $scope.badImageCounter = 0;
    }
  }

  var emdrFlowChange = function(){
    if ($scope.step == 2){
      hideButton();
    } else if ($scope.step == 4){
      hideButton();
      if (parseInt($scope.emdr.imageSecondScore) >= parseInt($scope.emdr.imageFirstScore)) {
        $scope.step += 1; // = 5, and with another increase will go to 6
        $scope.showNextButton = true;
      } //else with another increase will go to 5
      $scope.technic.url = $scope.technic.urls[$scope.step];
    } else if ($scope.step == 6){
      $scope.goodImageStillDisturbedCounter++;
      if ($scope.goodImageStillDisturbedCounter < 6){
        $scope.step = 2;
        $scope.technic.url = $scope.technic.urls[$scope.step];
        hideButton();
      } else {
        $scope.step = 7;
        $scope.technic.url = $scope.technic.urls[$scope.step];
      }
    } else if ($scope.step == 7){ // step already incremented in 'goToWizardNext'
      $scope.badImageCounter++;
      if ($scope.badImageCounter < 6){
        $scope.step = 2;
        $scope.technic.url = $scope.technic.urls[$scope.step];
        hideButton();
      } else {
        $scope.step = 7;
        $scope.technic.url = $scope.technic.urls[$scope.step];
      }
    }
  };

  $scope.emdrYes = function(){
    nextStepAndShowButton();
  }

  $scope.emdrNo = function(){
    $scope.showNextButton = true;
    $scope.step = 6;
    $scope.technic.url = $scope.technic.urls[$scope.step];
  }

  $scope.emdrKeepGoing = function(){
    $scope.showNextButton = true;
    $scope.step = 1;
    $scope.technic.url = $scope.technic.urls[$scope.step];
  }

  $scope.emdrEndProcess = function(){
    $scope.goToSuccess();
  }

  // End EMDR


  // Guilty
  var guiltyInitialize = function(){
    if ($scope.step == 0){
      $scope.showNextButton = true;
      $scope.guilty = {why:'', yesNo:'', description:'', presentPast:''};
    }
  };



  $scope.guiltyYes = function(){
    $scope.guilty.yesNo = 'Wrong';
    $scope.guilty.description = "<p>Guilt only frustrates and weaken you. " +
    "Start looking at the past as something that can never be changed, however and whatever you feel about it." +
    " It's over! Keep this message in your conscience:</p> <p></p>" +
    "<p><strong><quote>My feelings of guilt will not change the past nor they will make me a better person</quote></strong></p>";
    nextStepAndShowButton();
  };

  $scope.guiltyNo = function(){
    $scope.guilty.yesNo = "That's Right!";
    $scope.guilty.description = "<p>Guilt only frustrates and weaken you. " +
    "Start looking at the past as something that can never be changed, however and whatever you feel about it." +
    " It's over! Keep this message in your conscience:</p> <p></p>" +
    "<p><strong><quote>My feelings of guilt will not change the past nor they will make me a better person</quote></strong></p>";
    nextStepAndShowButton();
  };

  $scope.guiltyInfluenceYes = function(){
    $scope.guilty.yesNo = 'Accept Yourself';
    $scope.guilty.description = "<p>Start accepting in yourself things that you've chosen but that may upset other people." +
    " So, if your parents, boss, neighbor or even your partner take a position contrary to yours on something you may think is very natural, you won't be feeling guilty by that thought.</p>" +
    " <p></p><p>Try to teach the people who cares about you but tries to manipulate you through guilt, that you are well able to face the disappointment which your behavior inflicts in them. When you become able to disconnect the guilt, the ability to manipulate and control you emotionally will be gone forever.</p>";
    nextStepAndShowButton();
  };

  $scope.guiltyInfluenceNo = function(){
    $scope.guilty.yesNo = "That's Good";
    $scope.guilty.description = "<p>Start accepting in yourself things that you've chosen but that may upset other people." +
    " So, if your parents, boss, neighbor or even your partner take a position contrary to yours on something you may think is very natural, you won't be feeling guilty by that thought.</p>" +
    " <p></p><p>Try to teach the people who cares about you but tries to manipulate you through guilt, that you are well able to face the disappointment which your behavior inflicts in them. When you become able to disconnect the guilt, the ability to manipulate and control you emotionally will be gone forever.</p>";
    nextStepAndShowButton();
  };

  $scope.guiltyStillYes = function(){
    $scope.guilty.yesNo = "It's your choice";
    $scope.guilty.description = "<p>Now, we must consider that guilt is a self-annulling emotion, " +
    "<strong>it's a personal choice.</strong> It's a reaction that we can control if we understand the mechanism that produces it." +
    " You can live a lifetime feeling guilty, but the excitement of being free from all guilt is like having regained the innocence and creativity, as when the sun finally shines after a long storm.</p>" +
    " <p></p><p>Guilt is a waste of time, but it's also used in our culture as a tool to manipulate others. Once you've disconnected the mechanism of guilt, the possibility of being controlled and manipulated emotionally disappears.</p>";
    nextStepAndShowButton();
  };

  $scope.guiltyStillNo = function(){
    $scope.guilty.yesNo = "Final Recommendations";
    $scope.guilty.description = "<p>Now, we must consider that guilt is a self-annulling emotion, " +
    "<strong>it's a personal choice.</strong> It's a reaction that we can control if we understand the mechanism that produces it." +
    " You can live a lifetime feeling guilty, but the excitement of being free from all guilt is like having regained the innocence and creativity, as when the sun finally shines after a long storm.</p>" +
    " <p></p><p>Guilt is a waste of time, but it's also used in our culture as a tool to manipulate others. Once you've disconnected the mechanism of guilt, the possibility of being controlled and manipulated emotionally disappears.</p>";
    nextStepAndShowButton();
  };

  // End Guilty

  // Worry
  var worry1Initialize = function(){
    if ($scope.step == 0){
      $scope.showNextButton = true;
      var worry = {name:''};
      var referent = {name:''};
      $scope.worry1 = {worries:[worry] /*, referents:[referent]*/, value:92, title:'', description:'',
      diff:[{worry:worry, referent:referent}], differences:''};
      $scope.worry1.title = 'Accept the situation';
      $scope.worry1.description = "<p>With such a high percentage it's likely going to happen or it's already happening, so the best thing to do is to accept the situation.</p>" +
      "<p>Don't be angry at what's happening. Do not label it as unfair or as something that shouldn't be happening. If it's happening, it's happening, whether you agree or not.</p>" +
      "<p>When we accept a situation, the emotional charge decreases and we can focus on the solution. Remember that <strong>accepting does not mean agreeing.</strong></p>";
    }
  };

  /*$scope.worry1RemoveWorryByIndex = function(index){
    $scope.worry1.worries.shift();
  }*/

  $scope.worry1Add = function(){
    $scope.worry1.worries.push({name:""});
    //$scope.worry1.referents.push({name:''});
    //for (var i = 0; i < $scope.worry1.worries.length; i++) {
    //  $scope.worry1.diff[i] = {worry:$scope.worry1.worries[i]};
    //, referent:$scope.worry1.referents[i]};
    //}
  };


  $scope.worry1SetResults = function(){
    if ($scope.worry1.value > 50 ){
      $scope.worry1.title = 'Accept the situation';
      $scope.worry1.description = "<p>With such a high percentage it's likely going to happen or it's already happening, so the best thing to do is to accept the situation.</p>" +
      "<p>Don't be angry at what's happening. Do not label it as unfair or as something that shouldn't be happening. If it's happening, it's happening, whether you agree or not.</p>" +
      "<p>When we accept a situation, the emotional charge decreases and we can focus on the solution. Remember that <strong>accepting does not mean agreeing.</strong></p>"
    } else {
      $scope.worry1.title = 'Let go';
      $scope.worry1.description = "<p>With such a low probability of happening do you think is it worth the weariness and suffering you are going through?</p></div></div>" +
      '<div class="row height40"> <div class="col col-bottom"><span class="fsize-big pink">' + $scope.worry1.value +
      '%</span><div class="range range-positive"></div></div></div><div class="row row-bottom fsize-small"><div class="col">' +
      '<strong>Not Likely to Happen</strong></div></div>'
    }
  };

  $scope.worry1Yes = function(){
    $scope.worry1.title = 'Time To Act';
    $scope.worry1.description = "<p>If the solution is up to you, then it's time to act. Analyze the problem and elaborate a solution, or use our problem solving technique:</p>" +
    '<div class="btn-answer uppercase pink" ng-click="startProblemSolvingTechnic()">Start Problem Solving Technique</div>'+
    '<div class="btn-answer uppercase violet" ng-click="goToSuccess()">Finish, I can solve it by my own</div>';
    nextStepAndShowButton();
    hideButton();
  };

  $scope.worry1No = function(){
    $scope.worry1.title = "Stop Thinking about it";
    $scope.worry1.description = "<p>If the solution is not up to you, then think which options you have to protect and strengthen yourself, and once you do whatever you can do, stop thinking about it.</p>" +
    "<p><strong>Think on something else</strong> or start an activity that demands your full attention. Make twice a day the mindfulness training or start the 8-week mindfulness program.</p>" +
    "<p><strong>Share your worry</strong> with someone that helps you to be objective and find a solution, and not with someone who boosts your worry.</p> <p></p>" +
    "<p><strong>Put a time limit</strong> to worry and analyze the problem. Don't pay attention to unimportant details and don't come back to points or thoughts you already had.</p>";
    nextStepAndShowButton();
  };

  $scope.startProblemSolvingTechnic = function(){
    $scope.technicNumber = 0;
    $scope.technics = [{}, $scope.problemSolving];
    $scope.goToTechnicNext();
  }
  // End Worry

  // Problem Solving
  var problemInitialize = function(){
    if ($scope.step=== 0){
      $scope.showNextButton = true;
      $scope.problem = {vision:'', challenge:'', ideas:[{name:'', selected: false}], solutions:[{name:''}], actions:[{name:''}], bestIdea:'' };
    }
  };

  $scope.problemAddIdea = function(){
    $scope.problem.ideas.push({name:""});
  };

  $scope.problemAddSolution = function(){
    $scope.problem.solutions.push({name:""});
  };

  $scope.problemAddAction = function(){
    $scope.problem.actions.push({name:""});
  };

  $scope.problemSelectIdea = function(index){
    for (var i = 0; i < $scope.problem.ideas.length; i++) {
      $scope.problem.ideas[i].selected = false;
    }
    $scope.problem.ideas[index].selected = true;
    $scope.problem.bestIdea = $scope.problem.ideas[index];
  };

  //addProblemToGoals
  $scope.problemAddToGoals = function(){

    var technic = $scope.technic;
    technic.goalTitle = 'Solution to my problem (' + moment().format('MM-DD-YYYY') + ')';
    technic.goalDescription = $scope.problem.vision;
    technic.data = $scope.problem;
    technic.isGoal = true;
    FeelingService.saveGoals(technic);
    technic.isGoal = false;
    $ionicPopup.show({
      template: 'Problem (' + moment().format('MM-dd-YYYY') + ') Has Been Added to Goals.',
      title: '',
      subTitle: '',
      scope: $scope,
      buttons: [

      {
        text: '<b>Ok</b>',
        type: 'button-positive',
        onTap: function(e) {
          nextTechnicAndShowButton();
        }
      }
      ]
    });
	$scope.showProblemAddToGoals = false;

  };

  // End Problem Solving

  // Procastination
  var procastinationInitialize = function(){
    if ($scope.step=== 0){
      $scope.showNextButton = true;
      $scope.procastination = {
        tasks:[{
          name:'',
          a:false,
          b:false,
          c:false,
          date: null,
          subtasks: [{name:'', a:false, b:false, c:false, date:null}]}],
          persons: [{name:''}],
          reward:''};
        }
      };

      $scope.procastinationAddTask = function(){
        $scope.procastination.tasks.push({
          name:'',
          a:false, b:false, c:false, date: null,
          subtasks:[{name:'', a:false, b:false, c:false, date:null}]
        });
      };

      $scope.procastinationAddSubtask = function(task){
        task.subtasks.push({name:'', a:false, b:false, c:false, date:null});
      };

      $scope.procastinationRemoveTask = function(index){
        if ($scope.procastination.tasks.length > 1){
          $scope.procastination.tasks.splice(index, 1);
        }
      };

      $scope.procastinationRemoveSubtask = function(task, index){
        task.subtasks.splice(index,1);
      };

      $scope.procastinationAddPerson = function(){
        $scope.procastination.persons.push({name:''});
      }

      $scope.getTasksAndSubTasks = function(importanceValue){
        var tasksWithImportance = [];
        var subtasksWithImportance = [];
        if (importanceValue === 'a'){
          tasksWithImportance = _.where($scope.procastination.tasks,{a:"true"});
          for (var i = 0; i < $scope.procastination.tasks.length; i++){
            subtasksWithImportance = subtasksWithImportance.concat(_.where($scope.procastination.tasks[i].subtasks,{a:"true"}));
          }
          return tasksWithImportance.concat(subtasksWithImportance);
        } else if (importanceValue === 'b'){
          tasksWithImportance = _.where($scope.procastination.tasks,{b:"true"});
          for (var i = 0; i < $scope.procastination.tasks.length; i++){
            subtasksWithImportance = subtasksWithImportance.concat(_.where($scope.procastination.tasks[i].subtasks,{b:"true"}));
          }
          return tasksWithImportance.concat(subtasksWithImportance);
        } else if (importanceValue === 'c'){
          tasksWithImportance = _.where($scope.procastination.tasks,{c:"true"});
          for (var i = 0; i < $scope.procastination.tasks.length; i++){
            subtasksWithImportance = subtasksWithImportance.concat(_.where($scope.procastination.tasks[i].subtasks,{c:"true"}));
          }
          return tasksWithImportance.concat(subtasksWithImportance);
        }
      }

      $scope.procastinationToggleTaskImportance = function(task,importance){
        if (importance === 'a'){
          task['a'] = "true";
          task['b'] = "false";
          task['c'] = "false";
        } else if (importance === 'b'){
          task['b'] = "true";
          task['a'] = "false";
          task['c'] = "false";
        } else if (importance === 'c'){
          task['c'] = "true";
          task['b'] = "false";
          task['a'] = "false";
        }
      }

    var addProcastinationToCalendar = function (){
      CalendarService.clearEventsArray();
      for (var i = 0; i < $scope.procastination.tasks.length; i++) {
        var task = $scope.procastination.tasks[i];
        //if (NotificationsService.getNotificationsEnableValue()) {
        //CalendarService.addEventToCalendar(task.date, '', 'Pracastination Task ' + task.name, '', $scope.technic.goalDescription);
        CalendarService.pushEventToBeAdded(task.date, '', 'Pracastination Task ' + task.name, '', $scope.technic.goalDescription);
        //}
        for (var j = 0; j < task.subtasks.length; j++) {
          var subTask = task.subtasks[j];
          //if (NotificationsService.getNotificationsEnableValue()) {
          //CalendarService.addEventToCalendar(subTask.date, '', 'Pracastination Sub Task ' + subTask.name, '', $scope.technic.goalDescription);
          CalendarService.pushEventToBeAdded(subTask.date, '', 'Pracastination Sub Task ' + subTask.name, '', $scope.technic.goalDescription);
          //}
        }
      }
      CalendarService.addEventsToCalendar();
    };

      $scope.procastinationAddToGoals = function(){
        $ionicPopup.confirm({
          title: 'Procastination',
          template: "Would you like to add to calendar?",
          cancelText: 'No',
          okText: 'Yes'
        }).then(function(result) {
          if(result) {
            addProcastinationToCalendar();
          }
        });

        var technic = $scope.technic;
        technic.isGoal = true;
        technic.goalTitle = 'Procastination Tasks (' + moment().format('MM-DD-YYYY') +')';
        technic.goalDescription = 'Continue your work to fight against procrastination.';
        technic.data = $scope.procastination;
        FeelingService.saveGoals(technic);
        technic.isGoal = false;
        $ionicPopup.show({
          template: 'Procastination Tasks has been added to your goals',
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [

          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              nextStepAndShowButton();
            }
          }
          ]
        });
		$scope.showProcastinationAddToGoals = false;
      };

      // End Procastination

      // Indecision
      var indecisionInitialize = function(){
        if ($scope.step=== 0){
          $scope.showNextButton = true;
          $scope.indecision = { decision:'', realGoal:'', options:[{name:'', pros:[{name:''}], contras:[{name:''}], selected:false}], persons:[{name:''}], date:'' };
          $scope.sortedOptions = [];
        }
      };

      $scope.indecisionAddOption = function(){
        $scope.indecision.options.push({name:'', pros:[{name:''}], contras:[{name:''}], selected:false});
      };

      $scope.indecisionAddPro = function(index){
        $scope.indecision.options[index].pros.push({name:''});
      };

      $scope.indecisionAddContra = function(index){
        $scope.indecision.options[index].contras.push({name:''});
      };

      $scope.indecisionAddPerson = function(){
        $scope.indecision.persons.push({name:''});
      }
      
      $scope.sortOptions = function (){  
        console.log('sorting options...');
        $scope.indecision.options = $scope.indecision.options.sort(function(optionA, optionB) {
            return (optionB.pros.length - optionB.contras.length) - (optionA.pros.length - optionA.contras.length);
        });
      }

      $scope.indecisionOptionSelected = function(index){
        for (var i = 0; i < $scope.indecision.options.length; i++) {
          $scope.indecision.options[i].selected = false;
        }
        $scope.indecision.options[index].selected = true;
      };

      $scope.indecisionAddToGoals = function(){
        var datoToDecision = $scope.indecision.date;
        //if (NotificationsService.getNotificationsEnableValue()) {

        //}

        $ionicPopup.confirm({
          title: 'Procastination',
          template: "Would you like to add to calendar?",
          cancelText: 'No',
          okText: 'Yes'
        }).then(function(result) {
          if(result) {
            CalendarService.clearEventsArray();
            CalendarService.pushEventToBeAdded(datoToDecision, '', 'Deal with your Indecision', '', $scope.technic.goalDescription);
            CalendarService.addEventsToCalendar();
          }
        });

        var technic = $scope.technic;
        technic.isGoal = true;
        technic.goalTitle = "Working on my Decision ("+ moment().format('MM-DD-YYYY')+ ")";
        technic.goalDescription = $scope.indecision.decision;
        technic.data = $scope.indecision;
        FeelingService.saveGoals(technic);
        technic.isGoal = false;
        $ionicPopup.show({
          template: 'Decision Has Been Added to Goals',
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [

          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              nextStepAndShowButton();
            }
          }
          ]
        });
		$scope.showIndecisionAddToGoals = false;
      };
      // End Indecision

      // Ruminative Thoughts
      var rumitativeInitialize = function(){
        if ($scope.step=== 0){
          $scope.showNextButton = true;
          $scope.rumitative = { fear:'', worstCase:'', tasks:[{name:''}], break:'', breakTime:''};
        }
      };

      $scope.rumitativeNo = function(){
        $scope.rumitative.handleTitle = 'Think Again';
        $scope.rumitative.handleDescription = '<p>And Remember, sometimes our biggest hardships can turn into our biggest growth experiencies. Human beings are very resilient.</p><p>For example, I once worked with a client who was devastated after losing his job. He survived it, and as it turned out, this ended up being a blessing in disguise. It allowed him to find a position that fit his interests and lifestyle, leading to a more fulfilling and meaningful career.</p>';
        nextStepAndShowButton();
      };

      $scope.rumitativeYes = function(){
        $scope.rumitative.handleTitle = 'Your Are Correct';
        $scope.rumitative.handleDescription = '<p>Human beings are very resilient. Remember, sometimes our biggest hardships can turn into our biggest growth experiences. </p><p>For example, I once worked with a client who was devastated after losing his job. He survived it, and as it turned out, this ended up being a blessing in disguise. It allowed him to find a position that fit his interests and lifestyle, leading to a more fulfilling and meaningful career.</p>';
        nextStepAndShowButton();
      };

      $scope.rumitativeChangeNo = function(){
        $scope.rumitative.changeTitle = 'Then Let Go';
        $scope.rumitative.changeDescription = "<p>Let go of that you can't control. Ask yourself \"what can I change, if anything?\". If you cannot change the situation, let it go.</p>";
        nextStepAndShowButton();
      };

      $scope.rumitativeChangeYes = function(){
        $scope.rumitative.changeTitle = 'Then Make Changes';
        $scope.rumitative.changeDescription = '<p>For things you can change, set up a list of small goals and make the appropriate changes.</p>'+
        '<p>Write each task on different fields:</p></div></div><div class="row row-bottom height40" ng-repeat="task in rumitative.tasks" on-last-repeat><div class="col col-bottom">'+
        '<textarea class="msd-elastic bottom-line violet text-size tcenter" ng-model="task.name" placeholder="Task" rows="1"></textarea></div></div><div class="row row-top height7">'+
        '<div class="col col-top height100"><p class="height100 tcenter" ng-click="rumitativeAddTaks()"><img class="pink" src="svg/circle-plus.svg" alt="+"></p>'+
        '</div>';
        nextStepAndShowButton();
      };

      $scope.rumitativeAddTaks = function(){
        $scope.rumitative.tasks.push({name:''});
      };

      $scope.rumitativeAddToGoals = function(){

        //if (NotificationsService.getNotificationsEnableValue()) {
          //startDate, endDate, eventTitle, location, notes
          var starDate = new Date();
          var parsedTime = $scope.rumitative.breakTime.split(":");
          starDate.setHours(parsedTime[0]);
          starDate.setMinutes(parsedTime[1].valueOf());
          starDate.setSeconds(0);
          //console.log("starDate: " + starDate);

          var endDate = new Date();
          endDate.setHours(parsedTime[0]);
          endDate.setMinutes(parseInt(parsedTime[1]) + $scope.rumitative.break.valueOf());
          starDate.setSeconds(0);
          //console.log("endDate: " + endDate);

          var callOptions = {};
          callOptions.recurrence = "daily";
          var recurrenceEndDate = endDate;
          recurrenceEndDate.setDate(endDate.getDate() + 30 ); //Add the event for 30 days from the day was create

          //console.log ("recurrenceEndDate: " + recurrenceEndDate);
          callOptions.recurrenceEndDate  = recurrenceEndDate;
          //console.log("starDate: " + starDate);


        //}

        $ionicPopup.confirm({
          title: 'Procastination',
          template: "Would you like to add to calendar?",
          cancelText: 'No',
          okText: 'Yes'
        }).then(function(result) {
          if(result) {
            CalendarService.clearEventsArray();
            CalendarService.pushEventToBeAdded(starDate, endDate, 'Worry break ' + $scope.rumitative.break + "'" + ' at ' + $scope.rumitative.breakTime,
              '', $scope.technic.goalDescription, callOptions);
            CalendarService.addEventsToCalendar();
          }
        });

        var technic = $scope.technic;
        technic.isGoal = true;
        technic.goalTitle = 'Worry break ' + $scope.rumitative.break + "'" + ' at ' + $scope.rumitative.breakTime;
        technic.goalDescription = '';
        technic.data = $scope.rumitative;
        FeelingService.saveGoals(technic);
        technic.isGoal = false;
        $ionicPopup.show({
          template: 'Worry Break Has Been Added to Goals',
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [

          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              $scope.goToSuccess();
            }
          }
          ]
        });
		$scope.showProcastinationAddToGoals = false;
      };
      // End Ruminative Thoughts

      // Stress
      var stressInitialize = function (){

        $ionicSlideBoxDelegate.stop();
        $timeout(function(){
          $ionicSlideBoxDelegate.enableSlide(0);
        },0);

        $scope.stressQuestionNumber = 1;

        if ($scope.step == 0){
          hideButton();
          PersonalityService.getStressProclivityTest().then(function(data){
            $scope.stress = {index:0, questions:data, activeQuestions: data.risk, question: data.risk[0], risk:true, riskValue: 0, protectorValue:0};
          }, function(error){
            console.log(error);
          });
        }

        $scope.stressProclivityOnSwipeRight = function(){

            if($scope.stress.index > 0 && $scope.stressQuestionNumber > 1)
            {
              $scope.stressQuestionNumber--;
              $scope.stress.index--;
              $ionicSlideBoxDelegate.previous();
            }
          }



      };

      var stressAnswer = function(value){

        $scope.stressQuestionNumber++;
        $scope.stress.index++;

        if (!$scope.stress.risk && $scope.stress.index >= 26){
          var result = $scope.stress.protectorValue - ($scope.stress.riskValue * 2);
          if (result >= 10){
            $scope.stress.result = {title: "Very Low", description: "You have a high psychological protection against stress, this is very good news for you. If you are currently feeling a little stressed, it's a natural part of the development of life. Remember that it's impossible to live without some stress. The techniques that we've recommended you will undoubtedly help you to alleviate your current stress state. "};
          } else if (result >= 5 && result < 10){
            $scope.stress.result = {title: "Low", description: "Your natural protection against stress is functional enough to preserve you from your current stress state. Remember that it's impossible to live without some stress, this is called eustress or positive stress. The techniques that we've recommended you will undoubtedly help you to alleviate your current stress state."};
          } else if (result >= -5 && result < 5){
            $scope.stress.result = {title: "Moderate", description: "You have a proclivity to get stressed often. In your case, you should always remember a principle about stress that is extremely useful: 'Stress is not what happens, it's what I think happens'. You feel stressed because you are either living mentally in the past, which will generate complaints or guilt, or in the future, which will generate anticipatory anxiety. In either of the two places you are in, you should know that this is only an illusion created by your brain. It's a proper moment to remind you a famous quote by Buddha: 'Rejoice, that every place is here and all time is now'. To protect yourself from this moderate proclivity to stress, we recommend you our 8-week guided Mindfulness training. You will notice how it will change your way of thinking, reacting and living. Go forward, improve."};
          } else if (result < -5){
            $scope.stress.result = {title: "High", description: "You have a high proclivity to get stressed. This can be very detrimental and should not be overlooked, you life quality is at stake. In your case, you should always remember a principle about stress that is extremely useful: 'Stress is not what happens, it's what I think happens'. You feel stressed because you are either living mentally in the past, which will generate complaints or guilt, or in the future, which will generate anticipatory anxiety. In either of the two places you are in, you should know that this is only an illusion created by your brain. It's a proper moment to remind you a famous quote from by Buddha: 'Rejoice, that every place is here and all time is now'. In general, people with high stress proclivity must be careful of their reactions and its consequences. To protect yourself from this high proclivity to stress, we recommend you our 8-week guided Mindfulness training. You will notice how it will change your way of thinking, reacting and living. Go forward, improve."};
          }
          PersonalityService.saveStressProclivityResults($scope.stress.result);
          window.localStorage['proclivityTestAlreadyEjecuted'] = angular.toJson(true);
          nextStepAndShowButton();
        } else {
          if ($scope.stress.risk && $scope.stress.index >= 26){
            $scope.stress.risk = false;
            $scope.stress.activeQuestions = $scope.stress.questions.protector;
            $scope.stress.index = 0;
          }
          $scope.stress.question = $scope.stress.activeQuestions[$scope.stress.index];
          if ($scope.stress.risk && value){
            $scope.stress.riskValue++;
          }
          if (!$scope.stress.risk && value){
            $scope.stress.protectorValue++;
          }
        }
      };

      $scope.stressAnswerYes = function(){
        stressAnswer(true);
        $ionicSlideBoxDelegate.next();
      };

      $scope.stressAnswerNo = function(){
        stressAnswer(false);
        $ionicSlideBoxDelegate.next();
      };

      // End Stress

      // Loneliness

      var resultValues = [
      { name: 'Never', value: 5 },
      { name: 'Rarely', value: 4 },
      { name: 'Sometimes', value: 3 },
      { name: 'Often', value: 2 },
      { name: 'Always', value: 1 }
      ];

      var lonelinessInitialize = function(){

        $ionicSlideBoxDelegate.stop();
        $timeout(function(){
          $ionicSlideBoxDelegate.enableSlide(0);
        },0);
        //$scope.loneliness.newResult = {'family':0,'couple':0,'social':0, 'crisis':0};

        if ($scope.step == 0){
          PersonalityService.getLonelinessTest().then(function(data){
            //console.log(data);
            $scope.loneliness = {values: resultValues, valueSelected:0, questions:data.questions, scores: data.scores, puntuation: data.punctuation,
              index:0, question:data.questions[0], result : 0, kind:'', message:'', degree:'', results:{'family':0,'couple':0,'social':0, 'crisis':0},
              familyAnswers:data.family, coupleAnswers:data.couple, socialAnswers:data.social,crisisAnswers:data.crisis};
            });
          }
        }

        $scope.lonelinessAnswer = function(index, value, name){
          $scope.loneliness.index++;
          if ($scope.loneliness.questions[$scope.loneliness.index]){

			// VISUAL EFFECTS OVER CHOSEN ANWSER
			// Remove class before animation ended or cleaning visuals
			var removeClass = function(){angular.element(document.querySelectorAll('#'+name)).removeClass('selected-loneliness');}
			// ====
			if(angular.element(document.querySelector('#'+name)).hasClass('selected-loneliness'))
				{
					clearTimeout();
					removeClass();
				}
			angular.element(document.querySelector('#'+name)).addClass('selected-loneliness');
			setTimeout(removeClass,1500);
			// ===========

            $ionicSlideBoxDelegate.next();

            var points = (_.where($scope.loneliness.scores, {id: index + 1}))[0].value*value;

            if (_.contains($scope.loneliness.familyAnswers, $scope.loneliness.index)){
              $scope.loneliness.results.family = $scope.loneliness.results.family + points;
            } else if (_.contains($scope.loneliness.coupleAnswers, $scope.loneliness.index)){
              $scope.loneliness.results.couple = $scope.loneliness.results.couple + points;
            } else if(_.contains($scope.loneliness.socialAnswers, $scope.loneliness.index)){
              $scope.loneliness.results.social = $scope.loneliness.results.social + points;
            } else if(_.contains($scope.loneliness.crisisAnswers, $scope.loneliness.index)){
              $scope.loneliness.results.crisis = $scope.loneliness.results.crisis + points;
            }
            $scope.loneliness.question = $scope.loneliness.questions[$scope.loneliness.index];
          } else {
            lonelinessCalculateResult();
            nextStepAndShowButton();
          }

          $scope.testLonelinessOnSwipeRight = function(){
            if($scope.loneliness.index > 0)
                {
                    $scope.loneliness.index--;
                    $ionicSlideBoxDelegate.previous();
                }
          }



        };

        var lonelinessCalculateResult = function(){

          /*console.log('Family: ' + $scope.loneliness.results.family);
          console.log('Couple: ' + $scope.loneliness.results.couple);
          console.log('Social: ' + $scope.loneliness.results.social);
          console.log('Crisis: ' + $scope.loneliness.results.crisis);*/

          var resultFamily = _.where($scope.loneliness.puntuation[0].family, {value:$scope.loneliness.results.family});
          var resultCouple = _.where($scope.loneliness.puntuation[1].couple, {value:$scope.loneliness.results.couple});
          var resultSocial = _.where($scope.loneliness.puntuation[2].social, {value:$scope.loneliness.results.social});
          var resultCrisis = _.where($scope.loneliness.puntuation[3].crisis, {value:$scope.loneliness.results.crisis});

          var result = {};

          if (resultFamily.length > 0){
            $scope.loneliness.kind = resultFamily[0].kind;
            $scope.loneliness.degree = resultFamily[0].degree;
            $scope.loneliness.message = resultFamily[0].message;
            result = resultFamily;
          } else if (resultCouple.length > 0) {
            $scope.loneliness.kind = resultCouple[0].kind;
            $scope.loneliness.degree = resultCouple[0].degree;
            $scope.loneliness.message = resultCouple[0].message;
            result = resultCouple;
          } else if (resultSocial.length > 0) {
            $scope.loneliness.kind = resultSocial[0].kind;
            $scope.loneliness.degree = resultSocial[0].degree;
            $scope.loneliness.message = resultSocial[0].message;
            result = resultSocial;
          } else if (resultCrisis.length > 0) {
            $scope.loneliness.kind = resultCrisis[0].kind;
            $scope.loneliness.degree = resultCrisis[0].degree;
            $scope.loneliness.message = resultCrisis[0].message;
            result = resultCrisis;
          }

          window.localStorage['lonelinessTestAlreadyEjecuted'] = angular.toJson(true);
          PersonalityService.saveLonelinessTestResults(result);
        };
        // End Loneliness

        // Start mindfulness
        // initialize mindfulness view state
        $scope.trainingInitialize = function() {

          var mindfulnessUserData = angular.fromJson(window.localStorage['mindfulnessUserData']) || [];
          if (mindfulnessUserData.length == 0){

            $ionicPopup.alert({
              title: 'Promood',
              template: 'You have 2 audio sessiones per day, one between 2:00 p.m and 2:00 a.m. and other between 2:00 a.m. and 2:00 p.m. '
            });
          }
          TrainingsService.startMindfulness($scope, $state, ngAudio, onAudioSuccess, onAudioError, onAudioStatusChange);
          console.log('mindfulness init audio: ' + $scope.mindfulnessAudioUrl);
          $scope.initializeAudio($scope.mindfulnessAudioUrl, true);
        }
        // End mindfulness
        if(!$rootScope.technicsLocationChangeStartAdded) {
          $rootScope.$on("$locationChangeStart", function(event, next, current) {
            $scope.stopAudio();
          });

          $rootScope.technicsLocationChangeStartAdded = true;
        }

// AUDIO CONTROLS STARTS - Plugin wrapper - shoul be moved to SERVICE
    $scope.initializeAudio = function(url, updatePlayer) {

      if (window.plugins && window.plugins.streamingMedia){
        $scope.audioIsCompleted = false;
        if ($scope.audio){
          $scope.audio.release();
        }
        $scope.audio = {};
        $scope.audio = new Media(url, onAudioSuccess, onAudioError, onAudioStatusChange);
          
        if (updatePlayer) {
          $scope.audioTimer = $interval(function () {
            $scope.audio.getCurrentPosition(
              function (position) {
                //console.log("updating audio plauer ui");
                if ($scope.audioStatus != 3){
                  if (position == -1){
                    $scope.audioCurrentTime = 0;
                    $scope.audioProgress = 0;
                  } else  {
                    $scope.audioCurrentTime = position;
                    $scope.audioProgress = $scope.audioCurrentTime / $scope.audio.getDuration();
                  }
                }
                if ($scope.audioProgress >= 0.999){
                  $scope.audioIsCompleted = true;
                }

              },
              function (e) {
                  console.log("Error getting pos=" + e);
              }
            );
          }, 100);
        }
      }
    }
    $scope.playAudio = function(){
      if ($scope.audio){
        $scope.audio.play({ playAudioWhenScreenIsLocked : true });
        if(window.plugins && window.plugins.insomnia) {
          window.plugins.insomnia.keepAwake();
        }
      }
    }
    $scope.isAudioPlaying = function(){
      return $scope.audioStatus == 2;
    }
    $scope.isAudioCompleted = function() {
      return $scope.audioIsCompleted;
    }
    $scope.stopAudio = function(){
      if ($scope.audio){
        if ($scope.audioTimer){
          $interval.cancel($scope.audioTimer);
        }
        $scope.audio.stop();
        $scope.audioIsCompleted = false;
      }
    }
    var onAudioSuccess = function(){
      //console.log("audio should be initialized: " + $scope.updatePlayer);
    }
    var onAudioError = function(error){
      //console.log('audio error: ' + error);
    }
    var onAudioStatusChange = function(status){
      $scope.audioStatus = status;
      if (status == 2){
        $scope.audioIsCompleted = false;
      }
    }
// AUDIO CONTROLS ENDS

    $scope.$on('onRepeatLast', function(scope, element, attrs){
      var textareas = element.find("textarea");
      if(textareas && textareas.length > 0) {
        textareas[0].focus();
      }
    });

		$scope.blurElements = function(goto) {
		  var activeElement = document.activeElement;
		  //console.log('Active Element:',activeElement);
		  if(activeElement) {
			     activeElement.blur();
		  }
			//console.log(goto);

			//La Regla del Delay de 300ms en App Phonegap para fixear la vista
		  if(goto == 'goToWizardNext'){setTimeout($scope.goToWizardNext,500);}
		  if(goto == 'goToSuccess'){setTimeout($scope.goToSuccess,500);}
		  if(goto == 'goToGoals'){setTimeout($scope.goToGoals,500);}
		};

    /*var onDeviceReady = function () {
      console.log('media: ' + Media);
    }*/

    initialize();
  });
