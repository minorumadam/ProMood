'use strict';

//window.server_url = "192.168.0.13";
window.server_url = "promoodbalancer-241746064.eu-central-1.elb.amazonaws.com";
window.http_port = "9001";
window.ws_port = "9002";
window.debug = false;

angular.module('promoodApp', [
'ngCookies',
'ngCordova',
'ngResource',
'ngSanitize',
'ionic',
'mediaPlayer',
'monospaced.elastic',
'ngAudio',
'pascalprecht.translate'
])

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  })
  .state('personality-test', {
    url: '/personality-test',
    templateUrl: 'views/personality-test.html',
    controller: 'PersonalityTestController'
  })
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'views/welcome.html',
    controller: 'WelcomeController'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'views/profile.html',
    controller: 'ProfileController'
  })
  .state('goals', {
    url: '/goals',
    templateUrl: 'views/goals.html',
    controller: 'GoalsController'
  })
  .state('trainings', {
    url: '/trainings',
    templateUrl: 'views/trainings.html',
    controller: 'TrainingsController'
  })
  .state('settings', {
    url: '/settings',
    templateUrl: 'views/settings.html',
    controller: 'SettingsController'
  })
  .state('settings-change-name', {
    url: '/settings',
    templateUrl: 'views/settings/change-name.html',
    controller: 'SettingsController'
  })
  .state('settings-change-birthday', {
    url: '/settings',
    templateUrl: 'views/settings/change-birthday.html',
    controller: 'SettingsController'
  })
  .state('settings-change-gender', {
    url: '/settings',
    templateUrl: 'views/settings/change-gender.html',
    controller: 'SettingsController'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
    controller: 'AboutController'
  })
  .state('intro', {
    url: '/intro',
    templateUrl: 'views/intro.html',
    controller: 'IntroController'
  })
  .state('disclaimer', {
    url: '/disclaimer',
    templateUrl: 'views/disclaimer.html',
    controller: ''
  })
  .state('chat', {
    url: '/chat',
    templateUrl: 'views/chat/chat.html',
    controller: 'ChatController'
  })
  .state('chat-start', {
    url: '/chat-start',
    templateUrl: 'views/chat/chat-start.html',
    controller: 'ChatController'
  })
  .state('chat-connecting', {
    url: '/chat-connecting',
    templateUrl: 'views/chat/chat-connecting.html',
    controller: 'ChatController'
  })
  .state('chat-profile', {
    url: '/chat-profile',
    templateUrl: 'views/chat/chat-profile.html',
    controller: 'ChatController'
  })
  .state('chat-friends', {
    url: '/chat-friends',
    templateUrl: 'views/chat/chat-friends.html',
    controller: 'ChatController'
  })
  .state('chat-settings', {
    url: '/chat-settings',
    templateUrl: 'views/chat/chat-settings.html',
    controller: 'ChatController'
  })
  .state('chat-change-born-country', {
    url: '/chat-change-born-country',
    templateUrl: 'views/chat/change-born-country.html',
    controller: 'ChatController'
  })
  .state('chat-change-country', {
    url: '/chat-change-country',
    templateUrl: 'views/chat/change-country.html',
    controller: 'ChatController'
  })
  .state('chat-change-job', {
    url: '/chat-change-job',
    templateUrl: 'views/chat/change-job.html',
    controller: 'ChatController'
  })
  .state('chat-change-marital-status', {
    url: '/chat-change-marital-status',
    templateUrl: 'views/chat/change-marital-status.html',
    controller: 'ChatController'
  })
  .state('chat-change-hobbies', {
    url: '/chat-change-hobbies',
    templateUrl: 'views/chat/change-hobbies.html',
    controller: 'ChatController'
  })
  .state('chat-change-quote', {
    url: '/chat-change-quote',
    templateUrl: 'views/chat/change-quote.html',
    controller: 'ChatController'
  })
  .state('chat-change-words', {
    url: '/chat-change-words',
    templateUrl: 'views/chat/change-words.html',
    controller: 'ChatController'
  })
  .state('passcode', {
    url: '/passcode',
    templateUrl: 'views/settings/passcode.html',
    controller: 'SettingsController'
  })
  .state('panic', {
    url: '/panic',
    templateUrl: 'views/vistas-estaticas/panic/panic.html',
    controller: 'PanicController'
  })
  .state('panic-redo', {
    url: '/panic-redo',
    templateUrl: 'views/vistas-estaticas/panic/panic-redo.html',
    controller: 'PanicRedoController'
  })
  .state('good', {
    abstract: true,
    url: '/good',
    templateUrl: 'views/good/index.html',
    controller: 'FeelingGoodController'
  })
  .state('good.introduction', {
    url: '/introduction',
    templateUrl: 'views/good/introduction.html'
  })
  .state('good.take-photography', {
    url: '/take-photography',
    templateUrl: 'views/good/take-photography.html'
  })
  .state('good.thoughts-sensations', {
    url: '/thoughts-sensations',
    templateUrl: 'views/good/thoughts-sensations.html'
  })
  .state('good.take-picture', {
    url: '/take-picture',
    templateUrl: 'views/good/take-picture.html'
  })
  .state('good.write-feeling', {
    url: '/write-feeling',
    templateUrl: 'views/good/write-feeling.html'
  })
  .state('good.summary', {
    url: '/summary',
    templateUrl: 'views/good/summary.html'
  })
  .state('not-so-good', {
    abstract: true,
    url: '/not-so-good',
    templateUrl: 'views/not-so-good/index.html',
    controller: 'FeelingNotSoGoodController'
  })
  .state('not-so-good.pathology', {
    url: '/pathology',
    templateUrl: 'views/not-so-good/pathology.html'
  })
  .state('not-so-good.pathology-description', {
    url: '/pathology-description',
    templateUrl: 'views/not-so-good/pathology-description.html'
  })
  .state('not-so-good.technic', {
    url: '/technic',
    templateUrl: 'views/not-so-good/technic.html'
  })
  .state('not-so-good.technical', {
    url: '/technical',
    templateUrl: 'views/not-so-good/technical.html'
  })
  .state('not-so-good.success', {
    url: '/success',
    templateUrl: 'views/not-so-good/success.html'
  })
  .state('not-so-bad', {
    abstract: true,
    url: '/not-so-bad',
    templateUrl: 'views/not-so-bad/index.html',
    controller: 'FeelingNotSoBadController'
  })
  .state('not-so-bad.pathology', {
    url: '/pathology',
    templateUrl: 'views/not-so-bad/pathology.html'
  })
  .state('not-so-bad.pathology-description', {
    url: '/pathology-description',
    templateUrl: 'views/not-so-bad/pathology-description.html'
  })
  .state('not-so-bad.technic', {
    url: '/technic',
    templateUrl: 'views/not-so-bad/technic.html'
  })
  .state('not-so-bad.technical', {
    url: '/technical',
    templateUrl: 'views/not-so-bad/technical.html'
  })
  .state('not-so-bad.success', {
    url: '/success',
    templateUrl: 'views/not-so-bad/success.html'
  })
  .state('color', {
    url: '/color',
    templateUrl: 'views/technics/color-awareness.html'
  })
  .state('success', {
    url: '/success',
    templateUrl: 'views/success.html'
  })
  .state('technics', {
    url: '/demo',
    templateUrl: 'views/technic.html',
    controller: 'TechnicsController'
  })
  .state('loneliness-test', {
    url: '/loneliness-test',
    templateUrl: 'views/technics/lonelinessTestSinglePage.html',
    controller: 'TestLonelinessController'
  })
  .state('mindfulnessSinglePage', {
    url: '/mindfulness',
    templateUrl: 'views/technics/mindfulnessSinglePage.html',
    controller: 'IntroController'
  })
  .state('about-biorhythm', {
    url: '/about-biorhythm',
    templateUrl: 'views/about-biorhythm.html',
    controller: 'AboutBiorhythm'
  })
  .state('congratulations', {
    url: '/congratulations',
    templateUrl: 'views/technics/congratulations.html',
    controller: ''
  })
  ;

  $urlRouterProvider.otherwise('/');
    
  /*$translateProvider.translations('en', {
    HEADLINE: 'Hello there, This is my awesome app!',
    INTRO_TEXT: 'And it has i18n support!'
  });*/
    
    $translateProvider.useStaticFilesLoader({
      prefix: '/data/localization/',
      suffix: '.json'
    });
    
  $translateProvider.preferredLanguage('en');
})

.run(function($rootScope, $ionicSideMenuDelegate, $ionicPopup, $state, $ionicNavBarDelegate, $window, StateService) {
  $window.viewportUnitsBuggyfill.init({hacks: $window.viewportUnitsBuggyfillHacks});
  $rootScope.menuOpened = false;
  $rootScope.menuOpenedDontAnimate = false;
  $rootScope.rightMenuOpened = false;
  $rootScope.showHomeButton = false;
  $rootScope.askForPassword = false;
  $rootScope.createPassword = false;
  $rootScope.confirmPassword = false;
  $rootScope.unlockApp = false;
  $rootScope.localNotifCreated = false;
  $rootScope.deviceReady = false;


  $rootScope.$watch(function() {
    return $ionicSideMenuDelegate.isOpenLeft()?"left":($ionicSideMenuDelegate.isOpenRight()?"right":"none");
  }, function(value) {
    if("left" == value || "right" == value) {

      if(localStorage.animationsCheckboxValue == 'true'){
      $rootScope.menuOpened = true;

		  if("left" == value) {
			$rootScope.menuOpenedLeft = true;
			$rootScope.menuOpenedRight = false;
		  }
		  if("right" == value) {
			$rootScope.menuOpenedRight = true;
			$rootScope.menuOpenedLeft = false;
		  }
	 }else{
      $rootScope.menuOpenedDontAnimate = true;


		  if("left" == value) {
			$rootScope.menuOpenedLeftDontAnimate = true;
			$rootScope.menuOpenedRightDontAnimate = false;
		  }
		  if("right" == value) {
			$rootScope.menuOpenedRightDontAnimate = true;
			$rootScope.menuOpenedLeftDontAnimate = false;
		  }
	 }

    } else {
		$rootScope.menuOpened = false;
		$rootScope.menuOpenedDontAnimate = false;
		$rootScope.menuOpenedRight = false;
		$rootScope.menuOpenedLeft = false;
		$rootScope.menuOpenedRightDontAnimate = false;
		$rootScope.menuOpenedLeftDontAnimate = false;
    }
  });
    
  $rootScope.showErrorMessage = function(title, subTitle, template) {
    $ionicPopup.alert({
      title : title,
      subTitle : subTitle,
      template : template,
      okText : 'OK',
      okType : ''
    });
  };

  if(!$rootScope.stateStatus) {
    var stateStatus = {};
    stateStatus.returningToPreviousState = false;
    stateStatus.previousState = new Array();
    stateStatus.currentState;
    $rootScope.stateStatus = stateStatus;
  }

    if(!$rootScope.appjsStateChangeSuccessListenerAdded) {
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from,
        fromParams) {
          StateService.recordStateChange($rootScope.stateStatus, from, to);
      });
      $rootScope.appjsStateChangeSuccessListenerAdded = true;
    };

    if(!$rootScope.appjsLocationChangeStartListenerAdded) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        //console.log("app location changing to:" + next);
        if (next.indexOf('#/chat') > -1){
          $rootScope.showChatSettingMenu = true;
        }
        $rootScope.blurElementsApp();
      });
      $rootScope.appjsLocationChangeStartListenerAdded= true;
    };

    $rootScope.onSwipeRight = function() {
      console.log("swipe onSwipeRight");
      StateService.returnToPreviousState($rootScope.stateStatus);
    };

    $rootScope.shareOnFacebook = function(message, image, url) {
      console.log("ShareOnFacebook " + message);
      window.plugins.socialsharing.shareViaFacebook(message, image, url, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
      window.localStorage['shared'] = angular.toJson(true);
    };
    $rootScope.shareOnTwitter = function(message, image, url) {
      console.log("ShareOnTwitter " + message);
      window.plugins.socialsharing.shareViaTwitter(message, image, url);
      window.localStorage['shared'] = angular.toJson(true);
    };
		$rootScope.blurElementsApp = function(goto) {
		  var activeElement = document.activeElement;
		  if(activeElement) {
			activeElement.blur();
		  }
			
		};

  })
  ;
