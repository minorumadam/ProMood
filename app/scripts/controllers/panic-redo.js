'use strict';

angular.module('promoodApp')
  .controller('PanicRedoController', function ($scope, $rootScope, $state, ngAudio, $ionicPopup, $ionicScrollDelegate) {
    var initialize = function () {
      $scope.initialAudioDelay = 0;
      $scope.startFrom4AudioDelay = -2;
      $scope.startFrom4TweensDelay = 0;

      $scope.totalDurationOfPreviewsTweens = 15.40; //duration of tweens 1, 2 and 3

      angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
      angular.element(document.querySelector("#leftMenutButton")).addClass("blue");
      angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
      angular.element(document.querySelector("#leftMenutButton")).removeClass("pink");

      console.log('initialize PanicRedoController');
      $scope.audio = ngAudio.load('data/panic_audio.mp3');
    };

    $scope.startClicked = function () {
      if( startEnabled === true) {
        console.log('Start clicked');
        tl.play(); // TimelineLite created in the view
        //$scope.audio.play($scope.audio, $scope.initialAudioDelay);
        $scope.play($scope.audio, $scope.initialAudioDelay);
      }
    };

    $scope.play = function(audio) {
      audio.play();
      if( window.plugins && window.plugins.insomnia) {
        window.plugins.insomnia.keepAwake();
      }
    };

    $scope.play = function (audio, initialAudioDelay) {
      audio.play(initialAudioDelay);
      if (window.plugins && window.plugins.insomnia) {
        window.plugins.insomnia.keepAwake();
      }
    };

    $scope.startFrom4 = function() {
      console.log('startFrom4');
      //window.scope = $scope;
      $scope.audio.pause();

      setTimeout(function () {
        tl.play($scope.totalDurationOfPreviewsTweens);
        $scope.audio.setCurrentTime($scope.startFrom4AudioDelay + $scope.totalDurationOfPreviewsTweens);
        $scope.play($scope.audio);
      }, 1000);
    };
    $scope.goToWelcome = function() {
       $ionicPopup.alert({
                    title: 'Info',
                    template: "It's great that you're feeling better!If you haven't already, please check the Trainings section for our 8-Weeks Mindfulness program, which can be very helpful when dealing with anxiety and panic attacks.",
                    cancelText: 'No',
                    okText: 'Got it!'
                }).then(function (result) {
                    if (result) {
                         $state.go('welcome');
                    }
                });
    };

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      //console.log("location changing to:" + next);
      if ($scope.audio) {
        $scope.audio.stop();
        if (window.plugins && window.plugins.insomnia) {
          window.plugins.insomnia.allowSleepAgain();
        }
      }
    });
    initialize();
  });
