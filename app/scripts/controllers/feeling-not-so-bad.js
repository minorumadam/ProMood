'use strict';

angular.module('promoodApp')

.controller('FeelingNotSoBadController', function ($scope, $rootScope, $state, $timeout, $ionicPopup, $ionicScrollDelegate, $ionicViewService, $ionicNavBarDelegate, FeelingService, PersonalityService, GoalsService, UserService) {
  var selected = [],
  level = {
    title: 'Improvement time',
    subtitle: 'So this isn\'t such a bad day, but there\'s room for improvement.',
    description: 'Then let\'s see what we can do to improve it, please tell us which of these states is closer to how you feel now:',
    options: ['', 'indecision', 'stressed', 'reluctance', '']
  },
  pathologySwiper;
  $scope.levelCount = 0;

  var pathlogiesReplayesMessages = [  "This is the second consecutive time that you are in this mood. We strongly recommend that you carefully read again the reflection we have provided. We will also add a third technique for you to carry out.",
  "It is the third consecutive time you are in this mood. If you agree, we will propose a more comprehensive plan to try your relieve your discomfort. To this ends, you need to follow the plan strictly, because it is the only way to change your mood. If you decide not to accept this training, repeat the techniques we have already suggested once again.",
  "If you have reached this stage, it is because all of the former options have not helped you. Perhaps it is the right time for you to look for a more personalized professional help. In case you decide not to look for professional help for whatever reason, we recommend that you continue practicing the technics."];

/* ANIMATIONS SETTINGS */
var animationSet = localStorage.animationsCheckboxValue;

  var onSlideClick = function(swiper) {
    pathologySwiper.swipeTo(swiper.clickedSlideIndex - 1);

    $scope.$apply(function() {
      $scope.pathologySelected = swiper.clickedSlideIndex;
    });
  };

  var onTouchEnd = function(swiper, direction) {
    $scope.$apply(function() {
      $scope.pathologySelected = swiper.activeIndex + 1;
    });
  };

  var createSwiper = function() {
    $timeout(function() {
      pathologySwiper = new Swiper('.swiper-container', {
        mode: 'vertical',
        slidesPerView: 3,
//        onSlideClick: onSlideClick,
        onTouchEnd: onTouchEnd
      });
    if ($scope.stateStatus.currentState != "not-so-bad.pathology-description"){
      pathologySwiper.swipeTo($scope.pathologySelected - 1);
    }
      // WRITTEN BY L-C-BA
	  if(animationSet == 'true')
	  	{
		      angular.element(document.querySelector("#second-animations")).addClass("second-animations");
		}
      // ending by l-c-ba

    });
  };


  var loadPathology = function(pathology) {
    FeelingService.getPathology(pathology)
    .then(function(result) {
      $scope.pathology = result;
      $scope.pathology.description = $scope.pathology.description.replace(/Usuario:\r\n/i, "");
      $scope.pathology.description = $scope.pathology.description.replace(/\r\n/g, "<br>");
      $scope.pathologyName = pathology;
      $scope.pathologyTechnical = result.technical[0];
      $scope.pathologyTechnics = result.technical;

      if (pathology === 'ruminative thoughts'){
        $scope.verb = 'are';
      }

      FeelingService.getPathologyReplays('not-so-bad', pathology).then(function(pathologyReplays){
        $scope.pathologyReplays = pathologyReplays;
        if (pathologyReplays > 0) {
          if (pathologyReplays > 3){
            pathologyReplays = 3;
          }
          var message = pathlogiesReplayesMessages[pathologyReplays-1];
          $ionicPopup.alert({
            title: 'ProMood\'s advice',
            template: message,
            //templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
            okText: 'OK',
            okType: ''
          });
        }
      });

    });
  };

  var initialize = function(){
    $scope.pathologySelected = 1;
    $scope.user = UserService.getPersonal();
    $scope.biorhythm = PersonalityService.getBiorhythm();
    $scope.title = 'So So';
    $scope.level = level;
    createSwiper();
    UserService.saveFeelingSoSoCounter();

    if ($rootScope.returningFromBioRhythmAbout){
      $scope.verb = $rootScope.savedScope.verb;
      $scope.pathology = $rootScope.savedScope.pathology;
      $scope.pathologyName = $rootScope.savedScope.pathologyName;
      $scope.pathologyTechnics = $rootScope.savedScope.technics;
      $scope.pathologyReplays = $rootScope.savedScope.pathologyReplays;

    }
  };

  $scope.gotoBioRithym = function(){
    $rootScope.savedScope = {};
    $rootScope.savedScope.verb = $scope.verb;
    $rootScope.savedScope.pathology = $scope.pathology;
    $rootScope.savedScope.pathologyName = $scope.pathologyName;
    $rootScope.savedScope.technics = $scope.pathologyTechnics;
    $rootScope.savedScope.pathologyReplays = $scope.pathologyReplays;
    $rootScope.savedScope.returnTo = "not-so-bad.pathology-description";
    $state.go("about-biorhythm");
  }

  /*
  $pink: #e6274c;
  $yellow: #d3c92f;
  $blue: #007096;
  $violet: #586b9a;
  */
  var effect_view = document.getElementById('effect-view-yellow');
  effect_view.style.backgroundColor = '#d3c92f';
  var div_transition = document.getElementById('div-transition');

		  angular.element(document.querySelector("#leftMenutButton")).removeClass("pink");
		  angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
		  angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
		  angular.element(document.querySelector("#leftMenutButton")).addClass("yellow");

if(animationSet == 'true')
	{
		  var tl_2 = new TimelineLite();
		  //tl_2.from('.div-transition', 0.1, {autoAlpah:1})
		  tl_2.from('#main-view', 0, {autoAlpha:0})
		  tl_2.from('#triangulo-next', 0.5, {scale:0, autoAlpha:1})
		  tl_2.to('#triangulo-next', 0.7, {scale:10, autoAlpha:1}, 'same-keyframe')
		  tl_2.to('.div-transition', 0.25, {autoAlpha:0}, 'same-keyframe')
		  tl_2.to('#effect-view-yellow', 0.5, {autoAlpha:0}, 'same-keyframe+=0.25')
		  tl_2.to('#main-view', 0.5, {autoAlpha:1}, 'same-keyframe+=0.12');
		  angular.element(document.querySelector("#ionNavView")).attr("animation","slide-left-right");
		  angular.element(document.querySelector("#ionNavBar")).removeClass("no-animation");
		  angular.element(document.querySelector("#ionNavBar")).addClass("nav-title-slide-ios7");
		  /* Be aware that there is piece of code at line 72*/
	}
	else
	{
		angular.element(effect_view).addClass('ng-hide');
		angular.element(div_transition).addClass('ng-hide');
	}
  // ----- by L-C-BA ----- //

  var next;

  $scope.nextPathology = function() {

    var optionSelected = $scope.level.options[$scope.pathologySelected];

    if(optionSelected) {
      selected.push(optionSelected);
      $scope.levelCount++;

      if(!next) {
        loadPathology(optionSelected);


        FeelingService.saveFeeling('not-so-bad', {
          date: new Date(),
          pathology: optionSelected
        });

        $state.go('not-so-bad.pathology-description');
      }else {
        $scope.level = next;
        $scope.level.title = optionSelected;
        $scope.pathologySelected = 1;

        $timeout(function() {
          pathologySwiper.reInit();
          pathologySwiper.swipeTo($scope.pathologySelected - 1);
        });
      }

      optionSelected = null;
    }
  };

  $scope.goToDescriptionNext = function() {
    var good = FeelingService.getFeeling('good');

    if(good.length > 0) {
      $scope.goodData = good[Math.floor(Math.random() * good.length)];

      $state.go('not-so-bad.technical');
    } else {
      $scope.goToTechnicNext();
    }
  };

  $scope.goToTechnicNext = function(from){
    if ($scope.pathologyReplays == undefined){
      $scope.pathologyReplays = 0;
    }
    if ($scope.pathologyReplays > 3){
      $state.go('welcome');
      return;
    }
    GoalsService.getTechnics().then(function(result){
      var technics = result;
      if ($scope.pathologyTechnics){
        var technic;
        $rootScope.technicsToDo = [];
        for (var i = 0; i <= $scope.pathologyReplays; i++) {
          var technicsToDo = $scope.pathologyTechnics[i] ? $scope.pathologyTechnics[i].split(',') : [];
          if (technicsToDo == undefined){
            $state.go('welcome');
          }
          for (var j = 0; j < technicsToDo.length; j++) {
            var technic = _.where(technics, {id: technicsToDo[j]});
            if (technic.length > 0){
              $rootScope.technicsToDo.push(technic[0]);
            }
          }
        }
        $state.go('technics');
      }
    });
  };

  $scope.getLevel = function() {
    return this.level;
  }

  $scope.onSwipeRight = function() {
    FeelingService.swipeRightPathology('not-so-bad.pathology', 'not-so-bad.pathology-description', $scope, $rootScope, selected);
  }

  $scope.$on('$stateChangeStart', function(e) {
    $ionicScrollDelegate.scrollTop();
  });

  initialize();
});
