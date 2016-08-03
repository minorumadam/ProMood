'use strict';

angular.module('promoodApp')

.controller('HomeController', function ($scope, $rootScope, $state, $ionicSlideBoxDelegate, UserService, $ionicPopup, $interval, $ionicScrollDelegate, PersonalityService) {
  $rootScope.showHomeButton = false;
  var showAchievements = function(achievements){
    for (var i = 0, len = achievements.length; i < len; i++) {
      $ionicPopup.alert({
        title: 'New Achievement',
        subTitle: 'Congratulations!',
        template: achievements[i].name,
        //templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
        okText: 'OK',
        okType: ''
      });
    }
  };

  var initialize = function() {
    $scope.slideContinue = false;
    $scope.step = 1;
    $scope.genders = UserService.getGenders();
    $scope.gender = $scope.genders[0].value;
    $scope.canUseInputDate = Modernizr.inputtypes.date;
      
    // var newAchievements = UserService.calculateNewAchievements();
    // if (newAchievements.length > 0){
    //   showAchievements(newAchievements);
    // }
  };

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
  
  $scope.continueWelcome = function() {
    $scope.step = 1;
    $ionicSlideBoxDelegate.enableSlide(true);
    $ionicSlideBoxDelegate.next();
  }

  var toDate = function(value) {
    if(!value) return null;

    var date,
    monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(angular.isString(value)) {
      date = new Date(value);
    }
    else {
      if(!value.year || !value.month || !value.day) return null;
      if(value.year < 1000 || value.year > 3000 || value.month < 1 || value.month > 12) return null;

      if(value.year % 400 == 0 || (value.year % 100 != 0 && value.year % 4 == 0)) {
        monthLength[1] = 29;
      }

      if(value.day <= 0 || value.day > monthLength[value.month - 1]) return null;

      date = new Date(value.year, value.month, value.day);
    }

    return date;
  };

  var isValidName = function(value) {
    return !!value;
  };

  var isValidDate = function(value) {
    var date = toDate(value),
    now = new Date();

    return date && !isNaN(date.getTime()) && date < now;
  };

  var isValidGender = function(value) {
    return !!value;
  };

  var getStep = function() {
    if(!isValidName($scope.name)) return 1;
    if(!isValidDate($scope.bornDate))  return 2;
    if(!isValidGender($scope.gender))  return 3;
    return 4;
  };

  $scope.changeName = function(value) {
    $scope.name = value;
    $scope.step = getStep();
    $ionicSlideBoxDelegate.update();

  };

  $scope.changeNameAndSwipe = function(value) {
    $scope.name = value;
    $scope.step = getStep();
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.next();
  };

  $scope.changeBornDate = function(value) {
    $scope.bornDate = value;
    $scope.step = getStep();
    $ionicSlideBoxDelegate.update();
  };

  $scope.changeBornDateAndSwipe = function(value) {
    $scope.bornDate = value;
    $scope.step = getStep();
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.next();
  };

  $scope.changeGender = function(value) {
    $scope.gender = value;
    $scope.step = getStep();
    $ionicSlideBoxDelegate.update();
  };

  $scope.changeGenderAndSwipe = function(value) {
    $scope.gender = value;
    $scope.step = getStep();
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.next();
  };

  $scope.slideChanged = function($index) {
    if($index === 4) {
      UserService.savePersonal({
        name: $scope.name,
        date: toDate($scope.bornDate),
        gender: $scope.gender
      });

      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };

  if(/*!UserService.getPersonal().name*/!PersonalityService.getState()) {
    initialize();
  }
  else {
    $state.go("welcome");
  }

  ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    //StatusBar.hide();

    $ionicSlideBoxDelegate.enableSlide(false);
      
    // intro animation scroll down starts

    setTimeout(function() {
      //console.log("Hide splash");
      navigator.splashscreen.hide();
    }, 500);

    /*setTimeout(function(){
      angular.element(document.querySelector(".logo-intro")).addClass('animate');
    },500)*/

    $scope.countDown = 2;
    var myTimer = $interval(function(){
      $scope.countDown--;
      if ($scope.countDown == 0) {

        var scrollToElement = document.querySelector("#welcomeTitle");
        if(scrollToElement) {
          var finalPosition = scrollToElement.getBoundingClientRect().top;

          $ionicScrollDelegate.scrollTo(0, finalPosition, true);
        }
        $interval.cancel(myTimer);
        myTimer = undefined;
      }
    },500,0);
    // intro animation scroll down ends

  });
});
