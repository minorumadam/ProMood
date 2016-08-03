'use strict';

angular.module('promoodApp')

  .controller('WelcomeController', function ($scope, $rootScope, $state, NotificationsService, CalendarService, FeelingService, UserService, $ionicPopup, $ionicViewService, $ionicPlatform) {
    $rootScope.showHomeButton = false;
    var feelingActive;

    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");


    var initialize = function() {

      /*// should be moved to a new service
       $rootScope.platform = undefined;
       $rootScope.osVersion = undefined;
       $rootScope.osVersionAsNumber = undefined;

       if (typeof device !== 'undefined') {
       $rootScope.platform = device.platform;
       $rootScope.osVersion = device.version;
       $rootScope.osVersionAsNumber = $scope.getOSVersionNumber();
       console.log($rootScope.platform + ' - ' + $rootScope.osVersion + ' - ' + $rootScope.osVersionAsNumber);
       }*/

      if (angular.fromJson(window.localStorage['passwordCheckboxValue']) && !$rootScope.unlockApp){
        $rootScope.askForPassword = true;
        $rootScope.unlockApp = true;
        $state.go("passcode");
        angular.element(document.querySelector("#leftMenutButton")).hide();
      }
    
      //cordova.plugins.Keyboard.disableScroll(true);
        
      //$scope.notificationsCheckboxValue = angular.fromJson(window.localStorage['notificationsCheckboxValue']);
      document.addEventListener("deviceready", onDeviceReady, false);

      document.getElementById("carita").addEventListener( 'webkitTransitionEnd', webkitTransitionEnd, false );
    };


    ionic.Platform.ready(function() {
      //console.log("ionic.Platform.ready Welcome.js");

      if (typeof device !== 'undefined'){
        var numbersArray = device.version.split('.');
        var numberAsString = numbersArray[0];
        var osVersionAsNumber = numberAsString.valueOf();
        var shouldLoadNotifications = osVersionAsNumber >= 8;

        if (NotificationsService.getNotificationsEnableValue() && shouldLoadNotifications) {
          //console.log("(NotificationsService.getNotificationsEnableValue()");
          //StatusBar.hide();
          if (!NotificationsService.getLocalNotifInactiveUserCreated()) {
            //console.log("getLocalNotifInactiveUserCreated");
            NotificationsService.createLocalNotificationInactiveUser();
          }
        }
      }
    });

    var onDeviceReady = function () {
      //console.log("onDeviceReady Welcome.js");
        
      document.addEventListener("pause", function () {
        //console.log("onPause");

        if (typeof device !== 'undefined'){
          var numbersArray = device.version.split('.');
          var numberAsString = numbersArray[0];
          var numberAsInt = numberAsString.valueOf();
          var osVersionAsNumber = numberAsInt;
          var shouldLoadNotifications = osVersionAsNumber >= 8;

          if (NotificationsService.getNotificationsEnableValue() && shouldLoadNotifications) {
            console.log("FeelingService.getGoals().length " + FeelingService.getGoals().length);
            console.log ("NotificationsService.getLocalNotifGoalsCreatedValue() " + NotificationsService.getLocalNotifGoalsCreatedValue());
            if (FeelingService.getGoals().length > 0 && !NotificationsService.getLocalNotifGoalsCreatedValue()) {
              NotificationsService.createLocalNotificationGoals();
            }

          }
        }
      }, false);
    };


    // should be moved to a new service
    /*$scope.getOSVersionNumber = function() {
     if ($rootScope.osVersion) {
     var numbersArray = $rootScope.osVersion.split('.');
     var numberAsString = numbersArray[0]+numbersArray[1]+numbersArray[2];
     var numberAsInt = numberAsString.valueOf();
     $rootScope.osVersionAsNumber = numberAsInt;
     return $rootScope.osVersionAsNumber;
     }
     };*/

    $scope.user = UserService.getPersonal();

    $scope.feelings = [{
      state: 'not-so-bad.pathology',
      name: 'So-So',
      image: 'svg/not-so-good.svg',
      color: 'yellow'
    }, {
      state: 'good.introduction',
      name: 'Feeling Great!',
      image: 'svg/i-feel-good.svg',
      color: 'pink'
    }, {
      state: 'not-so-good.pathology',
      name: 'Not Good',
      image: 'svg/not-so-bad.svg',
      color: 'blue'
    }];

    var showAchievements = function(achievements){
      for (var i = 0, len = achievements.length; i < len; i++) {
        console.log(achievements);
        console.log(achievements[i]);
        $ionicPopup.alert({
          title: 'New Achievement',
          subTitle: 'Congratulations!',
          template:  achievements[i].name,
          //templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
          okText: 'OK',
          okType: ''
        });
      }
    };

    var saveAchievements = function(newAchievements){
      var achievements = UserService.getAchievements();
      for (var i = 0, len = newAchievements.length; i < len; i++) {
        achievements.push(newAchievements[i]);
      }
      UserService.saveAchievements(achievements);
    };


    var circle = function(n) {
      return n < 0 ? $scope.feelings.length - 1 : n % $scope.feelings.length;
    };

    var updateFeeling = function(n) {
      feelingActive = Math.max(Math.min(n, $scope.feelings.length - 1), 0);

      $scope.color = $scope.feelings[feelingActive].color;
    };

    $scope.left = function() {
      //console.log (feelingActive);
      if (!$scope.onTransition && feelingActive != 2) {
        $scope.onTransition = true;
        updateFeeling(feelingActive + 1);
      }
    };

    $scope.right = function() {
      //console.log (feelingActive);
      if (!$scope.onTransition && feelingActive != 0) {
        $scope.onTransition = true;
        updateFeeling(feelingActive - 1);
      }
    };

    $scope.goToState = function($index, feeling) {
      /* ANIMATIONS SETTING */
      var animationSet = localStorage.animationsCheckboxValue;
      if($index === feelingActive) {
        $scope.tweenme($index, feeling, animationSet);
        angular.element(document.querySelector("#ionNavView")).attr("animation","no-animation");
        angular.element(document.querySelector("#ionNavBar")).addClass("no-animation");
        angular.element(document.querySelector("#ionNavBar")).removeClass("nav-title-slide-ios7");
      }
      else if (!$scope.onTransition) {
        $scope.onTransition = true;
        updateFeeling($index);
      }
    };

    $scope.moveOnToState = function($index, feeling){
      //updateFeeling($index);
      $state.go(feeling.state);
    };

    var webkitTransitionEnd = function( event ) {
      //alert( "Finished transition!" );
      $scope.onTransition = false;
    };

    $scope.onTransition = false;

    $scope.tweenme = function(index, feeling, animationSet){
      if(animationSet == 'true')
      {
        var tl = new TimelineLite();
        switch(index)
        {
          // ======================
          // ANIMACION DE RAMA ROSA
          // --------- -- ---- ----
          case 1:
            tl.to('#color-bar', 1.5, {y:-1000, autoAlpha:1},'same')
              .to('h3', 1.5, {y:-500, autoAlpha:1}, 'same')
              //			.from('#feeling-text', 2, {autoAlpha:0.2},'same')
              .to('#feeling-text', 1, {autoAlpha:0},'same')
              .to('#triangulo2', 1.5, {scale:150, y:1480, autoAlpha:1},'same')
              .to('.div-transition', 1.5, {css:{display:'block'}}, 'same')
              // CARITAS
              .to('#carita0', 1.5, {x:-200, autoAlpha:1}, 'same')
              .to('#carita2', 1.5, {x:200, autoAlpha:1}, 'same')

              .to('#carita', 0.25, {scale:1.5,  y:150, autoAlpha:1, onComplete: function(){$scope.moveOnToState(index, feeling);}
              }, 'same'); // Escala a todas las caritas
            break;

          // ==========================
          // ANIMACION DE RAMA AMARILLA
          // --------- -- ---- --------
          case 0:
            tl.to('#color-bar', 1.5, {y:-1000, autoAlpha:1},'same')
              .to('h3', 1.5, {y:-500, autoAlpha:1}, 'same')
              //			.from('#feeling-text', 2, {autoAlpha:0.2},'same')
              .to('#feeling-text', 1, {autoAlpha:0},'same')
              .to('#triangulo1', 1.5, {scale:150, y:1480, autoAlpha:1},'same')
              .to('.div-transition', 1.5, {css:{display:'block'}}, 'same')

              // CARITAS

              .to('#carita1', 1.5, {x:200, autoAlpha:1}, 'same')

              .to('#carita', 0.25, {scale:1.5,  y:150, autoAlpha:1, onComplete: function(){$scope.moveOnToState(index, feeling);}}, 'same')
            ; // Escala a todas las caritas
            break;

          // ======================
          // ANIMACION DE RAMA AZUL
          // --------- -- ---- ----
          case 2:
            tl.to('#color-bar', 1.5, {y:-1000, autoAlpha:1},'same')
              .to('h3', 1.5, {y:-500, autoAlpha:1}, 'same')
              //			.from('#feeling-text', 2, {autoAlpha:0.2},'same')
              .to('#feeling-text', 1, {autoAlpha:0},'same')
              .to('#triangulo3', 1.5, {scale:150, y:1480, autoAlpha:1},'same')
              .to('.div-transition', 1.5, {css:{display:'block'}}, 'same')

              // CARITAS
              .to('#carita1', 1.5, {x:-200, autoAlpha:1}, 'same')


              .to('#carita', 0.25, {scale:1.5,  y:150, autoAlpha:1, onComplete: function(){$scope.moveOnToState(index, feeling);}
              }, 'same'); // Escala a todas las caritas
            break;

        }


      }else{$scope.moveOnToState(index, feeling);}
    }
    updateFeeling(1);
    var newAchievements = UserService.calculateNewAchievements();
    if (newAchievements.length > 0){
      showAchievements(newAchievements);
      saveAchievements(newAchievements);
    }

    $scope.$on("dragend", function(event, next, current) {
      console.log('dragend');
      console.log(event);
    });

    ionic.onGesture('dragstart', function(e) {
      //do something
      if(e && e.gesture && e.gesture.direction) {
        if("left" == e.gesture.direction) {
          $scope.left();
          //console.log('left');
        } else if("right" == e.gesture.direction) {
          $scope.right();
          //console.log('right');
        }

      }
    }, angular.element(document.querySelector("#faceSpan"))[0]);

    $scope.dragRight = function(some) {
      //nothing to do
    }

    $scope.dragLeft = function(some) {
      //nothing to do
    }

    initialize();
  });
