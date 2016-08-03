'use strict';

angular.module('promoodApp')

.controller('ProfileController', function ($scope, $rootScope, $state, $ionicScrollDelegate, CameraService, UserService, PersonalityService, FeelingService) {
  $rootScope.showHomeButton = true;
  var initialize = function() {

    console.log('profile0');

    var averageMood = UserService.calculateAverageMood();

    $scope.showAvgMood = averageMood.averageMood != '';

    // settings button color
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");

    console.log('profile0.5: ' + photo);
    var photo = CameraService.getPhotoProfileURL();
    console.log('profile1: ' + photo);
    if (photo){
      $scope.photo = photo;
      $scope.$apply();
    }

    if($scope.showAvgMood) {
      $scope.feelings = {};

      $scope.feelings['good'] = averageMood.good;
      $scope.feelings['not-so-bad'] = averageMood.notSoBad;
      $scope.feelings['not-so-good'] = averageMood.notSoGood
      $scope.average = averageMood.averageMood;

      // showing AVERAGE MOOD color depdening on the user's mood
      angular.element(document.querySelector("#avergaMoodText")).removeClass("blue");
      angular.element(document.querySelector("#avergaMoodText")).removeClass("pink");
      angular.element(document.querySelector("#avergaMoodText")).removeClass("yellow");

      if ($scope.average === 'Bad'){
        angular.element(document.querySelector("#avergaMoodText")).addClass("blue");
      } else if ($scope.average === 'Good') {
        angular.element(document.querySelector("#avergaMoodText")).addClass("pink");
      } else {
        angular.element(document.querySelector("#avergaMoodText")).addClass("yellow");
      }
    }

    FeelingService.getPathology('anger')
    .then(function(data) {
      $scope.characteristics = data.personality;
    });

    $scope.biorhythm = PersonalityService.getBiorhythm();

    $scope.achievements = UserService.getAchievements();
    $scope.stressProclivityTest = PersonalityService.getStressProclivityResults();
    $scope.lonelinessTest = PersonalityService.getLonelinessTestResults();

    $scope.personalityInfo = PersonalityService.getPersonalInfo();


    console.log($scope.achievements);
  };

  $scope.gotoBioRithym = function (){
    $rootScope.savedScope = {};
    $rootScope.savedScope.returnTo = "profile";
    $state.go("about-biorhythm");
  }

  var getMax = function(feelings){
    return $scope.feelings['good'] > $scope.feelings['not-so-bad'] && $scope.feelings['good'] > $scope.feelings['not-so-good']
    ? "Good" : ($scope.feelings['not-so-bad'] > $scope.feelings['good'] && $scope.feelings['not-so-bad'] > $scope.feelings['not-so-good'] ? "So-So" : "Bad");
  }

  $scope.user = UserService.getPersonal();
  $scope.state = PersonalityService.getState();

  var onPhotoURIFail = function(ex) {
    console.log(ex);
  };

  var onPhotoURISuccess = function(imageURI) {

    console.log('success CameraService.getPhotoProfileURL() ' + CameraService.getPhotoProfileURL());

    CameraService.savePhotoProfile(imageURI, "profilePhoto.jpg", true);
      //console.log('after saving  $rootScope.photoFinalURL: ' + $rootScope.photoFinalURL);
      //window.localStorage['profile'] = angular.toJson($rootScope.photoFinalURL);
      //$scope.photo = FeelingService.getPhotoProfile();
      //console.log('getting photo to show show: ' + $rootScope.photoFinalURL);
      //$scope.$apply();
  };

  $rootScope.saveProfilePhotoToDataStorageAndShow = function(photoFinalURL){
    console.log('after saving  $rootScope.photoFinalURL: ' + photoFinalURL);
    //window.localStorage['profile'] = angular.toJson(photoFinalURL);
    window.localStorage['profile'] = photoFinalURL;
    $scope.photo = null;
    $scope.$apply();
    $scope.photo = CameraService.getPhotoProfileURL();
    console.log('getting photo to show show: ' + CameraService.getPhotoProfileURL());
    $scope.$apply();
  }

  /*var saveLoadAndShowPhotoProfile = function() {
    console.log('after saving  $rootScope.photoFinalURL: ' + $rootScope.photoFinalURL);
    window.localStorage['profile'] = angular.toJson($rootScope.photoFinalURL);
    $scope.photo = FeelingService.getPhotoProfile();
    console.log('getting photo to show show: ' + $rootScope.photoFinalURL);
    $scope.$apply();
  }*/

  $scope.takePhotography = function() {
    /*if(navigator.camera) {
      navigator.camera.getPicture(onPhotoURISuccess, onPhotoURIFail, {
        quality: 50,
        targetWidth: 1600,
        targetHeight: 900,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
      });
    }*/
    CameraService.takePhotography(onPhotoURISuccess, onPhotoURIFail);
  };


  $scope.showAverageMood = function(mood) {
    return mood === $scope.average
  }

  initialize();
});
