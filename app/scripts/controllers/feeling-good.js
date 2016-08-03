'use strict';

angular.module('promoodApp')

.controller('FeelingGoodController', function ($scope, $rootScope, $ionicScrollDelegate, CameraService, $state, $ionicPopup, $ionicNavBarDelegate, FeelingService, UserService) {
  var initialize = function(){
    $scope.data = {};
    $scope.dataThoughtsLimit = 140;

    $scope.user = UserService.getPersonal();

    $scope.title = 'Feeling Great!';

    UserService.saveFeelingGoodCounter();

  };
  /*
  $pink: #e6274c;
  $yellow: #d3c92f;
  $blue: #007096;
  $violet: #586b9a;
  */
  var effect_view = document.getElementById('effect-view-pink');
  effect_view.style.backgroundColor = '#e6274c';
  var div_transition = document.getElementById('div-transition');

/* ANIMATIONS SETTING */
var animationSet = localStorage.animationsCheckboxValue;


var secondAnimation = function(){
	var second_animations = document.getElementById('second-animations');
	angular.element(second_animations).addClass('second-animations');
}

if(animationSet == 'true')
{
	  angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
	  angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
	  angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
	  angular.element(document.querySelector("#leftMenutButton")).addClass("pink");

		setTimeout(secondAnimation,500);

	  var tl_2 = new TimelineLite();
	  //tl_2.from('.div-transition', 0.1, {autoAlpah:1})
	  tl_2.from('#main-view', 0, {autoAlpha:0})
	  tl_2.from('#triangulo-next', 0.5, {scale:0, autoAlpha:1})
	  tl_2.to('#triangulo-next', 0.25, {scale:10, autoAlpha:1}, 'same-keyframe')
	  tl_2.to('.div-transition', 0.25, {autoAlpha:0}, 'same-keyframe+=0.25')
	  tl_2.to('#effect-view-pink', 0.5, {autoAlpha:0}, 'same-keyframe+=0.25')
	  tl_2.to('#main-view', 0.5, {autoAlpha:1}, 'same-keyframe+=0.12');
	  angular.element(document.querySelector("#ionNavView")).attr("animation","slide-left-right");
	  angular.element(document.querySelector("#ionNavBar")).removeClass("no-animation");
	  angular.element(document.querySelector("#ionNavBar")).addClass("nav-title-slide-ios7");

	  /* Be aware that there is piece of code at introduction.html*/
	  // ----- by L-C-BA ----- //
}else{
	angular.element(effect_view).addClass('ng-hide');
	angular.element(div_transition).addClass('ng-hide');
}
  var onPhotoURIFail = function(error) {
    console.log(error);
  };

  var onPhotoURISuccess = function(imageURI) {
    console.log('temp uri: ' + imageURI);
    CameraService.savePhotoGood(imageURI);
    //console.log('photo stored in: ' + $rootScope.photoFinalURL);
    //$scope.data.photographyURI = $rootScope.photoFinalURL;
    //$scope.$apply();
    /*original
    $scope.data.photographyURI = imageURI;
    $scope.$apply();*/
  };

  $rootScope.saveGoodPhotoToDataStorageAndShow = function(photoFinalURL){
    console.log('photo stored in: ' + photoFinalURL);
    $scope.data.photographyURI = photoFinalURL;
    $scope.$apply();
  }

  $scope.goToPhotography = function() {
    if(!$scope.data.word || !$scope.data.thought || !$scope.data.sensation) {
      /*$ionicPopup.alert({
      title: 'Please fill all the fields to continue.',
      subTitle: '',
      template:  '',
      //templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
      okText: 'OK',
      okType: ''
    });*/
      angular.element(document.querySelector("#continueMessage")).addClass("hide");
      angular.element(document.querySelector("#errorContinueMessage")).addClass("show");

      return;
    }

    $state.go('good.take-photography');
  };

  $scope.goToSummary = function() {
    if(!$scope.data.thoughts) return;
    if($scope.data.thoughts.length > $scope.dataThoughtsLimit) {
      $rootScope.showErrorMessage('', 'Invalid content length', 'The maximum allowed content is ' + $scope.dataThoughtsLimit + ' characters');
      return;
    }

    FeelingService.saveFeeling('good', $scope.data);

    $state.go('good.summary');
  };

  $scope.takePhotography = function() {
    CameraService.takePhotography(onPhotoURISuccess, onPhotoURIFail);
    /*if(navigator.camera) {
      navigator.camera.getPicture(onPhotoURISuccess, onPhotoURIFail, {
        quality: 50,
        targetWidth: 1600,
        targetHeight: 900,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE
      });
    }*/
  };

  $scope.$on('$stateChangeStart', function(e) {
    $ionicScrollDelegate.scrollTop();
  });

  $scope.focusOnTextarea = false;

  $scope.setFocusOnTextarea = function(textAreaIsFocused, focusedTextareaId) {

    var elementId = '#' + focusedTextareaId;
    var el=angular.element(elementId);

    var fullscreenClass = "fullscreen";
    if (textAreaIsFocused) {
      el.addClass(fullscreenClass);
    } else {
      el.removeClass(fullscreenClass);
    }
  };

  initialize();
});
