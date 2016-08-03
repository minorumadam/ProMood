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
'pascalprecht.translate',
'ngIOS9UIWebViewPatch'
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
  .state('techniques', {
    url: '/techniques',
    templateUrl: 'views/technics.html',
    controller: 'TechniquesController'
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

.run(function($rootScope, $ionicPlatform, $ionicSideMenuDelegate, $ionicPopup, $state, $ionicNavBarDelegate, $window, StateService) {
  $ionicPlatform.ready(function() {
    $window.viewportUnitsBuggyfill.init({ hacks: $window.viewportUnitsBuggyfillHacks});
  })
  //$window.viewportUnitsBuggyfill.refresh();

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

  //$rootScope.skipWarning = false;


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

'use strict';
angular.module('ngAudio', [])
.directive('ngAudio', ['$compile', '$q', 'ngAudio', function($compile, $q, ngAudio) {
    return {
        restrict: 'AEC',
        scope: {
            volume: '=',
            start: '=',
            currentTime: '=',
            loop: '=',
            clickPlay: '='
        },
        controller: function($scope, $attrs, $element, $timeout) {

            var audio = ngAudio.load($attrs.ngAudio);
            $scope.$audio = audio;
            // audio.unbind();

            $element.on('click', function() {
                if ($scope.clickPlay === false) {
                    return;
                }

                audio.audio.play();

                audio.volume = $scope.volume || audio.volume;
                audio.loop = $scope.loop;
                audio.currentTime = $scope.start || 0;

                $timeout(function() {
                    audio.play();
                }, 5);
            });
        }
    };
}])

.service('localAudioFindingService', ['$q', function($q) {

    this.find = function(id) {
        var deferred = $q.defer();
        var $sound = document.getElementById(id);
        if ($sound) {
            deferred.resolve($sound);
        } else {
            deferred.reject(id);
        }

        return deferred.promise;
    };
}])

.service('remoteAudioFindingService', ['$q', function($q) {

    this.find = function(url) {
        var deferred = $q.defer();
        var audio = new Audio();

        audio.addEventListener('error', function() {
            deferred.reject();
        });

        audio.addEventListener('loadstart', function() {
            deferred.resolve(audio);
        });

        // bugfix for chrome...
        setTimeout(function() {
            audio.src = url;
        }, 1);

        return deferred.promise;

    };
}])

.service('cleverAudioFindingService', ['$q', 'localAudioFindingService', 'remoteAudioFindingService', function($q, localAudioFindingService, remoteAudioFindingService) {
    this.find = function(id) {
        var deferred = $q.defer();

        id = id.replace('|', '/');

        localAudioFindingService.find(id)
            .then(deferred.resolve, function() {
                return remoteAudioFindingService.find(id);
            })
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };
}])

.value('ngAudioGlobals', {
    muting: false,
    songmuting: false
})

.factory('NgAudioObject', ['cleverAudioFindingService', '$rootScope', '$interval', '$timeout', 'ngAudioGlobals', function(cleverAudioFindingService, $rootScope, $interval, $timeout, ngAudioGlobals) {
    return function(id) {

        window.addEventListener("click",function twiddle(){
            if (audio) {
              audio.play();
              audio.pause();
            }
            window.removeEventListener("click",twiddle);
        });


        var $audioWatch,
            $willPlay = false,
            $willPause = false,
            $willRestart = false,
            $volumeToSet,
            $looping,
            $isMuting = false,
            $observeProperties = true,
            audio,
            audioObject = this;

        this.id = id;
        this.safeId = id.replace('/', '|');
        this.loop = 0;

        this.unbind = function() {
            $observeProperties = false;
        };

        this.play = function() {
            $willPlay = true;
        };

        this.pause = function() {
            $willPause = true;
        };

        this.restart = function() {
            $willRestart = true;
        };

        this.stop = function() {
            this.restart();
        };

        this.setVolume = function(volume) {
            $volumeToSet = volume;
        };

        this.setMuting = function(muting) {
            $isMuting = muting;
        };

        this.setProgress = function(progress) {
            if (audio && audio.duration) {
                audio.currentTime = audio.duration * progress;
            }
        };

        this.setCurrentTime = function(currentTime) {
            if (audio && audio.duration) {
                audio.currentTime = currentTime;
            }
        };

        function $setWatch() {
            $audioWatch = $rootScope.$watch(function() {
                return {
                    volume: audioObject.volume,
                    currentTime: audioObject.currentTime,
                    progress: audioObject.progress,
                    muting: audioObject.muting,
                    loop: audioObject.loop,
                };
            }, function(newValue, oldValue) {
                if (newValue.currentTime !== oldValue.currentTime) {
                    audioObject.setCurrentTime(newValue.currentTime);
                }

                if (newValue.progress !== oldValue.progress) {
                    audioObject.setProgress(newValue.progress);
                }
                if (newValue.volume !== oldValue.volume) {
                    audioObject.setVolume(newValue.volume);
                }

                if (newValue.volume !== oldValue.volume) {
                    audioObject.setVolume(newValue.volume);
                }

                $looping = newValue.loop;

                if (newValue.muting !== oldValue.muting) {
                    audioObject.setMuting(newValue.muting);
                }
            }, true);
        }

        cleverAudioFindingService.find(id)
            .then(function(nativeAudio) {
                audio = nativeAudio;
                audio.addEventListener('canplay', function() {
                    audioObject.canPlay = true;
                });
            }, function(error) {
                audioObject.error = true;
                console.warn(error);
            });


        $interval(function() {
            if ($audioWatch) {
                $audioWatch();
            }
            if (audio) {

                if ($isMuting || ngAudioGlobals.isMuting) {
                    audio.volume = 0;
                } else {
                    audio.volume = audioObject.volume !== undefined ? audioObject.volume : 1;
                }

                if ($willPlay) {
                    audio.play();
                    $willPlay = false;
                }

                if ($willRestart) {
                    audio.pause();
                    audio.currentTime = 0;
                    $willRestart = false;
                }

                if ($willPause) {
                    audio.pause();
                    $willPause = false;
                }

                if ($volumeToSet) {
                    audio.volume = $volumeToSet;
                    $volumeToSet = undefined;
                }

                if ($observeProperties) {
                    audioObject.currentTime = audio.currentTime;
                    audioObject.duration = audio.duration;
                    audioObject.remaining = audio.duration - audio.currentTime;
                    audioObject.progress = audio.currentTime / audio.duration;
                    audioObject.paused = audio.paused;
                    audioObject.src = audio.src;

                    if ($looping && audioObject.currentTime >= audioObject.duration) {
                        if ($looping !== true) {
                            $looping--;
                            audioObject.loop--;
                            // if (!$looping) return;
                        }
                        audioObject.setCurrentTime(0);
                        audioObject.play();

                    }
                }

                if (!$isMuting && !ngAudioGlobals.isMuting) {
                    audioObject.volume = audio.volume;
                }

                audioObject.audio = audio;
            }

            $setWatch();
        }, 25);
    };
}])
.service('ngAudio', ['NgAudioObject', 'ngAudioGlobals', function(NgAudioObject, ngAudioGlobals) {
    this.play = function(id) {

        var audio = new NgAudioObject(id);
        audio.play();
        return audio;
    };

    this.load = function(id) {
        return new NgAudioObject(id);
    };

    this.mute = function() {
        ngAudioGlobals.muting = true;
    };

    this.unmute = function() {
        ngAudioGlobals.muting = false;
    };

    this.toggleMute = function() {
        ngAudioGlobals.muting = !ngAudioGlobals.muting;
    };
}]);

/// <reference path="underscore.js" />

//mustache style templating
if (_ != null)
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
var extendWebSocketProto = function() {
    WebSocket.prototype.sendObject = function (command, obj) {
        if (this.readyState != WebSocket.OPEN)
            throw "Invalid connection state: " + this.readyState;
        this.send(command + " " + obj);
    }

    WebSocket.prototype.sendTextMessage = function (text) {
        var data = { Type: 'Regular', Data: text };
        
        this.sendObject("Message", JSON.stringify(data));
    }
    
    WebSocket.prototype.sendProfile = function (text) {
        this.sendObject("Profile", text);
    }
 
    WebSocket.prototype.sendLogout = function () {
        this.sendObject("Logout", "");
    }
    
    WebSocket.prototype.sendWait = function () {
        this.sendObject("Wait", "");
    }
    
        
    WebSocket.prototype.sendAccepted = function () {
        this.sendObject("Accept", "");
    }
        
    WebSocket.prototype.sendDeclined = function (reason) {
        this.sendObject("Decline", reason);
    }
    
    WebSocket.prototype.getStatus = function () {
        var me = this;
        var prop = Object.getOwnPropertyNames(WebSocket).filter(function (name) {
            return me.readyState === me[name];
        });
        if (prop.length === 0)
            throw "Invalid State Value";
        return prop[0];
    };

    WebSocket.prototype.attachEvents = function (options) {
        if (options.onopen)
            this.onopen = options.onopen;
        if (options.onerror)
            this.onerror = function (evt) {
                options.onerror(evt.message);
            };
        if (options.onclose)
            this.onclose = options.onclose;
        this.onmessage = function (evt) {
            if (!evt.data)
                return console.log("Event with empty data");
            var msg = JSON.parse(evt.data);
            var onMessageTypeEvent = options["on" + msg.TypeName]; //registered callback for message type event
            if (onMessageTypeEvent != null)
                return onMessageTypeEvent(msg);
            if (options.onmessage != null)
                return options.onmessage(msg);
            return null;
        };
    }
}();

var app = app || {};
app.createUserWebSocket = function (options) {
    var socket = new WebSocket(options.url);
    socket.attachEvents(options);
    return socket;
};
/// <reference path="../underscore.js" />
/// <reference path="../jquery-2.1.1.min.js" />
var app = app || {};

app.ChatWebApi = function () {
    var me = {
        baseUrl: "http://" + window.server_url + ":" + window.http_port,
        setErrorCallback: function (onerror) {
            $jq.error = onerror;
        }
    };
    var call = function (url, method, data) {
        /// <summary>Call web api</summary>
        /// <param name="url" type="String">url of web api call</param>
        /// <param name="method" type="String">default get</param>
        /// <param name="data" type="Object">json object, default null</param>
        /// <returns type="Object"></returns>

        $jq.support.cors = true;

        return $jq.ajax({
            type: method || "GET",
            url: me.baseUrl + url,
            data: data
        });
    }

    var populateApi = function () {
        var populateConversations = function () {
            var resource = "/api/Conversations/";
            var getConversationTemplate = _.template("Create/{{partyId}}/With/{{otherPartyId}}");
            var findFriendsTemplate = _.template("AvailableFriendsOf/{{userId}}?myRole={{userRole}}");
            me.conversations = {
                registerPartyInformation: function (conversationPartyInformation) {
                    return call(resource + "RegisterPartyInformation", "PUT", conversationPartyInformation);
                },
                getRandomConversation: function (partyId) {
                    return call(resource + "Random/" + partyId, "POST");
                },
                getConversation: function (partyId, otherPartyId) {
                    return call(resource + getConversationTemplate({
                        partyId: partyId,
                        otherPartyId: otherPartyId
                    }), "POST");
                },
                findAvailableOnlineFriendsOf: function (userId, userRole) {
                    return call(resource + findFriendsTemplate({ userId: userId, userRole: userRole }));
                }
            };
        }();
        var populateUsers = function () {
            var resource = "/api/Users/";
            me.users = {
                get: function (id) {
                    var data = id == null ? null : { id: id };
                    return call(resource, "GET", data);
                },
                create: function (user) {
                    return call(resource, "POST", user);
                },
                update: function (user) {
                    return call(resource, "PUT", user);
                },
                "delete": function (id) {
                    return call(resource + id, "DELETE");
                },
                sampleUser: function() {
                    return call(resource + "sampleUser");
                }
            };
        }();
    }();
    return me;
}();

/// <reference path="../jquery-2.1.1.min.js" />
/// <reference path="ChatWebApi.js" />
/// <reference path="UserWebSocket.js" />

var $jq = jQuery.noConflict();

app.ConversationManager = function () {
    var configuration = {
        chatWebSocketServerUrl: null,
        onerror: function (error) { console.log(error); },
        onstatusChange: function () { },
        onmessage: null,
        onclose: null,
        onopen: null,
        onConversationStablished: function () { },
        onConversationRequest: function () { }
    };

    var createConversationAndRegisterUserInfo = function (options) {
        var conversation = {};
        conversation.userRole = options.userRole; 

        var openPromise = $jq.Deferred();
        var connectionStablishedPromise = $jq.Deferred();

        var setupConversation = function () {
            conversation.ws = app.createUserWebSocket({
                url: configuration.chatWebSocketServerUrl,
                onopen: function () {
                    conversation.ws.send("Login " + options.userRole);
                    openPromise.resolve();
                },
                onConnectionStablished: function (msg) {
                    connectionStablishedPromise.resolve(msg.PartyId);
                },
                onConversationStablished: function (msg) {
                    conversation.otherUser = msg.OtherUser.Id;
                    configuration.onstatusChange("Talking");
                    configuration.onConversationStablished(msg);
                },
                onConversationRequest: function (msg){
                    configuration.onConversationRequest(msg);
                },
                onProfileReceived: function (msg){
                    configuration.onProfileReceived(msg);
                },
                onmessage: configuration.onmessage,
                onclose: configuration.onclose,
            });
            conversation.sendMessage = function (msg) {
                conversation.ws.sendTextMessage(msg);
            }
            conversation.sendProfile = function (msg) {
                conversation.ws.sendProfile(msg);
            }
            conversation.sendLogout = function (){
                conversation.ws.sendLogout();
            }
            conversation.sendAccepted = function (){
                conversation.ws.sendAccepted();
            }
            conversation.sendDeclined = function (reason){
                conversation.ws.sendDeclined(reason);
            }
            conversation.sendWait = function (){
                conversation.ws.sendWait();
            }
            
            conversation.close = function () {

              if(conversation.ws && conversation.ws.getStatus()!="CLOSED") {
                conversation.ws.close();
                console.log('conversation WS close');
              }
            }
            ;
        }();

        var userRegisteredPromise = connectionStablishedPromise.
            then(function (partyId) {
                conversation.partyInfo = {
                    Id: partyId,
                    User: options.user,
                    Role: options.userRole
                };
                return app.ChatWebApi.conversations.registerPartyInformation(conversation.partyInfo);
            }, configuration.onerror).
            then(function () {
                configuration.onstatusChange("information provided properly");
            }, configuration.onerror);

        return {
            conversation: conversation,
            userRegisteredPromise: userRegisteredPromise
        };
    };

    var validateCreatedConversation = function(conversationCreatedPromise) {
        return conversationCreatedPromise.
            then(function (conversation) {
            configuration.onstatusChange("conversation information: " + conversation.Status);
        }, configuration.onerror);
    }

    var connectToRandomConversation = function (options) {
        var result = createConversationAndRegisterUserInfo(options);

        var conversationCreatedPromise = result.userRegisteredPromise.
            then(function() {
                return app.ChatWebApi.conversations.getRandomConversation(result.conversation.partyInfo.Id);
            }, configuration.onerror);
        validateCreatedConversation(conversationCreatedPromise);

        return result.conversation;
    };

    var watiForFriendsToTalkTo = function (options) {
        var result = createConversationAndRegisterUserInfo(options);

        var conversationCreatedPromise = result.userRegisteredPromise.
            then(function () {
                return app.ChatWebApi.conversations.getRandomConversation(result.conversation.partyInfo.Id);
            }, configuration.onerror);
        validateCreatedConversation(conversationCreatedPromise);

        return result.conversation;
    };

    var connectToSpecificParty = function (options) {
        var result = createConversationAndRegisterUserInfo(options);

        var conversationCreatedPromise = result.userRegisteredPromise.
            then(function() {
                return app.ChatWebApi.conversations.getConversation(result.conversation.partyInfo.Id, options.otherPartyId);
            }, configuration.onerror);
        validateCreatedConversation(conversationCreatedPromise);

        return result.conversation;
    };
    return {
        configuration: configuration,
        connectToRandomConversation: connectToRandomConversation,
        connectToSpecificParty: connectToSpecificParty,
        watiForFriendsToTalkTo: watiForFriendsToTalkTo
    };
}();

app.ChatProfile = function (){
    this.name           = "none";
    this.id             = "none";
    this.age            = "none";
    this.gender         = "none";
    this.personalityType= "none";
    this.personalityInfo= "none";
    this.achievements   = "none";
    this.averageMood    = "none";
    this.bornCountry    = "none";
    this.livingCountry  = "none";
    this.maritalStatus  = "none";
    this.job            = "none";
    this.words          = "none";
    this.quote          = "none";
    this.hobbies        = "none";
}

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

  //default animation set to false;
  if(localStorage.getItem('animationsCheckboxValue') == null)
  {
    localStorage.setItem('animationsCheckboxValue', false);
  }

  //skipped personality test case
  $scope.skip = function(){
    localStorage.setItem('PersonalityTestSkip', "true");
    var ans = [];
    for (var i=0; i<72; i++){
      ans[i] = true;
    }
    
    PersonalityService.saveAnswers(ans); 
    PersonalityService.resolveTest();

    //localStorage.setItem('personalityInfo', "");
    $state.go("welcome");
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

'use strict';

angular.module('promoodApp')

.controller('IntroController', function ($scope, $rootScope, $state, GoalsService) {
  
  ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    //StatusBar.hide();
  });
  
  $scope.redirectToMindfulness = function() {
    GoalsService.getTechnics().then(function(result){
      $scope.technics = result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;
      
      var oneTechnic = _.where($scope.technics, {title:'Training'});
//    $scope.technics = [{}, oneTechnic[0]];
        
      var technic = oneTechnic[0];
      technic.id = "T30_BIS";
        
      $rootScope.technicsToDo = [];
      $rootScope.technicsToDo.push(technic);
      $state.go('technics');
    });
  }
});

'use strict';

angular.module('promoodApp')

.controller('PersonalityTestController', function ($scope, $state, $ionicSlideBoxDelegate, $ionicPopup, $timeout, PersonalityService, $ionicViewService) {
  $scope.questions = [];
  var answers = PersonalityService.getAnswers();
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
      $scope.questions = data;
      $scope.question = $scope.questions[$scope.index];
      //console.log($scope.question);
    });
  };

    $scope.currentSlide = 0;
    $scope.slideChanged = function() {
        $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
        //console.log('Active Slide=' + $scope.currentSlide);
    };

  $scope.onSwipeRight = function () {
    $scope.index = $scope.index - 1 ;
    if($scope.questions[$scope.index]) {
      $ionicSlideBoxDelegate.previous();
    }
  };    

  var answer = function(value) {
    answers[$scope.index] = value;
    $scope.index++;

    if($scope.questions[$scope.index]) {
      // Commment to not save MK
      PersonalityService.saveAnswers(answers);
      $scope.question = $scope.questions[$scope.index];
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
             localStorage.setItem('PersonalityTestSkip', "false");
             //location.href = "./index.html"
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
    initialize();
  }
  else {
    $state.go("welcome");
  }
});

'use strict';

angular.module('promoodApp')

  .controller('WelcomeController', function ($scope, $rootScope, $state, NotificationsService, CalendarService, FeelingService, UserService, $ionicPopup, $ionicViewService, $ionicPlatform) {
    $rootScope.showHomeButton = false;
    var feelingActive;

    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");


    

    var personalityTestSkip;
    personalityTestSkip = localStorage.getItem('PersonalityTestSkip', "false");
    //if personalityTestSkip is true (skipped) user gets popup alert.
    if (personalityTestSkip === "true") {
      if (!sessionStorage.getItem('skipWarning', 'true') || sessionStorage.getItem('skipWarning', 'true') === 'true')  {
        sessionStorage.setItem('skipWarning', 'false');
        $ionicPopup.alert({
          title: 'Attention!',
          subTitle: 'Skipping personality test...',
          template:  'We will not be able to provide accurate suggestions until you complete the personality test! Please Redo the Personality Type Test later from Settings!',
          okText: 'OK',
          okType: ''
        });
      }
    }

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

'use strict';

angular.module('promoodApp')
.controller('SettingsController', function ($scope, $rootScope, $ionicPopup, $state, NotificationsService, UserService, PersonalityService, GoalsService, StateService) {
    $rootScope.showHomeButton = true;
    var initialize = function(){
    if(localStorage.getItem('socialMediaCheckboxValue') == null)
    {
      localStorage.setItem('socialMediaCheckboxValue',true);
    }
        
    if(localStorage.getItem('notificationsCheckboxValue') == null)
    {
      localStorage.setItem('notificationsCheckboxValue',true);
    }
        
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
      
    $scope.passcodeSaved = angular.fromJson(window.localStorage['passcodeSaved']);
    $scope.passwordCheckboxValue = angular.fromJson(window.localStorage['passwordCheckboxValue']);
    $scope.notificationsCheckboxValue = NotificationsService.getNotificationsEnableValue();
    $scope.animationsCheckboxValue = angular.fromJson(window.localStorage['animationsCheckboxValue']);
    $scope.socialMediaCheckboxValue = angular.fromJson(window.localStorage['socialMediaCheckboxValue']);
    $scope.genders = UserService.getGenders();
    $scope.user = UserService.getPersonal();
    $scope.user.sex = $scope.user.gender == "1" ? "Male" : "Female";
    $scope.state = PersonalityService.getState();
    $scope.canUseInputDate = Modernizr.inputtypes.date;
    $scope.lonelinessTestResult = PersonalityService.getLonelinessTestResults();

    $scope.debug = window.debug;
      
    $scope.lonelinessTestResultToShow = '';
    if ($scope.lonelinessTestResult){
      $scope.lonelinessTestResultToShow = $scope.lonelinessTestResult[0].degree;
    }

    if ($scope.user.date.indexOf("T") > 0) {
      var dateArray = $scope.user.date.split("T")[0].split("-");
      var year = dateArray[0];
      var month = dateArray[1];
      var day = dateArray[2];
    } else {
      var date = new Date($scope.user.date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
    }
    $scope.bornDate = year + "-"
        + (month.length < 2 && month < 10 ? "0" : "") + month + "-"
        + (day.length < 2 && day < 10 ? "0" : "") + day;
  };

  var isValidGender = function(value) {
    return !!value;
  };

  var isValidName = function(value) {
    return !!value;
  };

  var isValidDate = function(value) {
    var date = toDate(value),
    now = new Date();

    return date && !isNaN(date.getTime()) && date < now;
  };

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

  $scope.showChangeSex = function(){
    $scope.gender = $scope.genders[0].value;
    $state.go('settings-change-gender');
  };

  $scope.changeGender = function(gender){
    UserService.savePersonal({
      name: $scope.user.name,
      date: $scope.user.date,
      gender: gender
    });
    $state.go('settings');
  };

  $scope.changeNotificationsCheckbox = function (){
    //console.log ("$scope.notificationsCheckboxValue: " + $scope.notificationsCheckboxValue);
    if ($scope.notificationsCheckboxValue){
      $scope.notificationsCheckboxValue = false;
      NotificationsService.setNotificationsEnableValue (false);
      //$scope.notificationsCheckboxValue = NotificationsService.getNotificationsEnableValue();
     }else{
      $scope.notificationsCheckboxValue = true;
      NotificationsService.setNotificationsEnableValue (true);
      //$scope.notificationsCheckboxValue = NotificationsService.getNotificationsEnableValue();
     }
    /*if ($scope.notificationsCheckboxValue){
      $scope.notificationsCheckboxValue = false;
      window.localStorage['notificationsCheckboxValue'] = angular.toJson($scope.notificationsCheckboxValue);
    }else{
      //window.plugin.notification.local.registerPermission(function (granted) {
        //if (granted){
          $scope.notificationsCheckboxValue = true;
          window.localStorage['notificationsCheckboxValue'] = angular.toJson($scope.notificationsCheckboxValue);
        //}
      //});
    }*/
  };

  $scope.changeAnimationsCheckbox = function(){
    if ($scope.animationsCheckboxValue){
      $scope.animationsCheckboxValue = false;
      window.localStorage['animationsCheckboxValue'] = angular.toJson($scope.animationsCheckboxValue);
    } else {
      $scope.animationsCheckboxValue = true;
      window.localStorage['animationsCheckboxValue'] = angular.toJson($scope.animationsCheckboxValue);
    }
  }
  
  $scope.changeSocialMediaCheckbox = function(){
    if ($scope.socialMediaCheckboxValue){
      $scope.socialMediaCheckboxValue = false;
      window.localStorage['socialMediaCheckboxValue'] = angular.toJson($scope.socialMediaCheckboxValue);
    } else {
      $scope.socialMediaCheckboxValue = true;
      window.localStorage['socialMediaCheckboxValue'] = angular.toJson($scope.socialMediaCheckboxValue);
    }
  }

  $scope.changePasswordCheckbox = function (){
    if ($scope.passwordCheckboxValue){
      $scope.passwordCheckboxValue = false;
      window.localStorage['passwordCheckboxValue'] = angular.toJson($scope.passwordCheckboxValue);
    }else{
      $scope.passwordCheckboxValue = true;
      $rootScope.createPassword = true;
      $state.go('passcode');
    }
  };

  $scope.passcode = {};
  var temporalyPasscode;
  $scope.onChangePasscodeInput = function (value){
    angular.element(document.querySelector("#passField")).focus();
    if (value.length === 4){
      angular.element(document.querySelector("#passField")).blur();
      if ($rootScope.createPassword){
        temporalyPasscode = value;
        $rootScope.createPassword = false;
        $rootScope.confirmPassword = true;
        $scope.passcode = {};
      } else if ($rootScope.confirmPassword){
        if (temporalyPasscode === value){
          $rootScope.confirmPassword = false;
          $rootScope.unlockApp = true;
          window.localStorage['passwordCheckboxValue'] = angular.toJson(true);
          window.localStorage['passcodeSaved'] = angular.toJson(value);
          $state.go('settings');
        } else {
          var popup = $ionicPopup.alert({
            title: 'Promood',
            template: 'Passcode does not match.'
          });
          popup.then(function(res) {
            $rootScope.createPassword = true;
            $rootScope.confirmPassword = false;
            $scope.passcode = {};
            $state.go('passcode');
          });
        }
      }else if($rootScope.askForPassword) {
        if ($scope.passcodeSaved === value){
          $rootScope.askForPassword = false;
          $rootScope.unlockApp = true;
          $scope.passcode = {};
          StateService.returnToPreviousState($rootScope.stateStatus);
          angular.element(document.querySelector("#leftMenutButton")).show();
        } else {
//          cordova.plugins.Keyboard.close();
          var popup = $ionicPopup.alert({
            title: 'Promood',
            template: 'Passcode is incorrect.'
          });
          popup.then(function(res) {
            $rootScope.askForPassword = true;
            $scope.passcode = {};
            $state.go('passcode');
          });
        }
      }
    }
  }

  $scope.showChangeName = function(){
    console.log($scope.user);
    $scope.name = $scope.user.name;
    $state.go('settings-change-name');

  };

  $scope.changeName = function(name){
    if (isValidName(name)){
      UserService.savePersonal({
        name: name,
        date: $scope.user.date,//toDate($scope.bornDate),
        gender: $scope.user.gender
      });
      $state.go('settings');
    };

  };

  $scope.showChangeBirthday = function(){
    $scope.birthday = $scope.user.birthday;
    $state.go('settings-change-birthday');
  };

  $scope.changeBirthday = function(bornDate){
    UserService.savePersonal({
      name: $scope.user.name,
      date: toDate(bornDate),
      gender: $scope.user.gender
    });
  };

  $scope.goToSettings = function(bornDate){
    $scope.changeBirthday(bornDate);
    $state.go('settings');
  };

  $scope.reDoTest = function(testName){
    console.log("red test:" + testName);
    $state.go(testName);
  };

  $scope.technics = function(){
    $rootScope.technicsToDo = null;
    $state.go('technics');
  };

  $scope.mindfulness = function(){
    GoalsService.getTechnics().then(function(result){

      // needs to be saved
      var problemSolving = _.where(result, {title:'Problem Solving'});
      $scope.problemSolving = problemSolving[0];
      $scope.technicNumber = 0;

      $scope.technics = $rootScope.technicsToDo ? $rootScope.technicsToDo : result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;
      // ****
      var oneTechnic = _.where($scope.technics, {title:'Training'});
      $scope.technics = [{}, oneTechnic[0]];
      // *****
      

      $scope.technic = $scope.technics[$scope.technicNumber];
      $scope.onTechnic = true;
      $scope.step = 0;

      $state.go('technics');

      $scope.showNextButton = true;

    }, function(error){
      console.log(error);
    });
  };

  $scope.contactSupportByEmail = function (){
    window.plugins.socialsharing.canShareViaEmail(
      canShareViaEmailSuccess,
      function(e){
        $ionicPopup.alert({
          title: 'Promood',
          template: 'You don\'t have your email configured in your phone. Please add your mail account in settings.'
          //template: 'You don\'t have your email configured in your phone. Send an email to support@promoodapp.com with the subject "support".'
        });
      });
    };
    var canShareViaEmailSuccess = function (e){
      console.log("canShareViaEmailSuccess");
      window.plugins.socialsharing.shareViaEmail(
        '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
        'Contact Support',
        ['support@promoodapp.com'], // TO: must be null or an array
        null, // CC: must be null or an array
        null, // BCC: must be null or an array
        null, // FILES: can be null, a string, or an array
        function() {console.log('share ok')},
        function(errormsg){/*alert(errormsg)
          ;*/
          console.log (errormsg);
        } // called when sh*t hits the fan
      );
    };

  initialize();
});

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
    } else {
      //alert('no photo');
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
  $scope.state = PersonalityService.getState() || 'unknown';

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

'use strict';

angular.module('promoodApp')

.controller('FeelingGoodController', function ($scope, $rootScope, $ionicScrollDelegate, CameraService, $state, $ionicPopup, $ionicNavBarDelegate, FeelingService, UserService) {
  
  var personalityTestSkip;
  personalityTestSkip = localStorage.getItem('PersonalityTestSkip', "false");
    //if personalityTestSkip is true (skipped) user gets popup alert.
  if (personalityTestSkip === "true") {
    $scope.personalitySkip = true;
  } else {
    $scope.personalitySkip = false;
  }


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
    
    //window.localStorage['goodPhoto'] = 'ProMoodData/' + photoFinalURL;

    $scope.data.photographyURI = cordova.file.documentsDirectory + photoFinalURL;//photoFinalURL;procommented this
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

'use strict';

angular.module('promoodApp')

.controller('FeelingNotSoGoodController', function ($scope, $rootScope, $state, $timeout, $ionicPopup,  $ionicScrollDelegate, $ionicNavBarDelegate, FeelingService, PersonalityService, GoalsService, UserService) {
  var selected = [],
  levels = [{
    title: "Primary Emotion",
    subtitle: "We're sorry " + UserService.getPersonal().name,
    description: "Let's take action and try to change this, please specify which word depicts more accurately how you feel:"
  }, {
    subtitle: "Let's get more detail",
    description: 'Please select the option that describes more accurately how you feel now:'
  }, {
    subtitle: 'We are almost done.',
    description: 'Between this two, which one would you say is closer to your current state:'
  }],
  pathologies = {
    fear: {
      insecurity: ['suspicion', 'concern'],
      anxiety: ['restlessness', 'phobia']
    },
    sadness: ['guilt', 'sorrow', 'ruminative thoughts', 'loneliness', 'shame'],
    anger: {
      'toward myself': ['anger', 'ruminative thoughts', 'contempt'],
      'toward others': ['jealousy', 'ruminative thoughts', 'hostility']
    }
  },
  pathologySwiper;

  var pathlogiesReplayesMessages = [  "This is the second consecutive time that you are in this mood. We strongly recommend that you carefully read again the reflection we have provided. We will also add a third technique for you to carry out.",
  "It is the third consecutive time you are in this mood. If you agree, we will propose a more comprehensive plan to try your relieve your discomfort. To this ends, you need to follow the plan strictly, because it is the only way to change your mood. If you decide not to accept this training, repeat the techniques we have already suggested once again.",
  "If you have reached this stage, it is because all of the former options have not helped you. Perhaps it is the right time for you to look for a more personalized professional help. In case you decide not to look for professional help for whatever reason, we recommend that you continue practicing the technics."];

  $scope.levelCount = 0;


  var personalityTestSkip;
  personalityTestSkip = localStorage.getItem('PersonalityTestSkip', "false");
    //if personalityTestSkip is true (skipped) user gets popup alert.
  if (personalityTestSkip === "true") {
    $scope.personalitySkip = true;
  } else {
    $scope.personalitySkip = false;
  }


  var initialize = function(){

    $scope.verb = 'is';
    $scope.pathologySelected = 1;
    $scope.user = UserService.getPersonal();
    $scope.biorhythm = PersonalityService.getBiorhythm();
    $scope.title = 'Not Good';
    $scope.level = $scope.getLevel();
    createSwiper();
    UserService.saveFeelingBadCounter();

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
    $rootScope.savedScope.returnTo = "not-so-good.pathology-description";
    $state.go("about-biorhythm");
  }

/* ANIMATIONS SETTING */
var animationSet = localStorage.animationsCheckboxValue;

  /*
  $pink: #e6274c;
  $yellow: #d3c92f;
  $blue: #007096;
  $violet: #586b9a;
  */
  var effect_view = document.getElementById('effect-view-blue');
  effect_view.style.backgroundColor = '#007096';
  var div_transition = document.getElementById('div-transition');


  angular.element(document.querySelector("#leftMenutButton")).removeClass("pink");
  angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
  angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
  angular.element(document.querySelector("#leftMenutButton")).addClass("violet");

if(animationSet == 'true'){
  var tl_2 = new TimelineLite();
  //tl_2.from('.div-transition', 0.1, {autoAlpah:1})
  tl_2.from('#main-view', 0, {autoAlpha:0})
  tl_2.from('#triangulo-next', 0.5, {scale:0, autoAlpha:1})
  tl_2.to('#triangulo-next', 0.7, {scale:10, autoAlpha:1}, 'same-keyframe')
  tl_2.to('.div-transition', 0.25, {autoAlpha:0}, 'same-keyframe')
  tl_2.to('#effect-view-blue', 0.5, {autoAlpha:0}, 'same-keyframe+=0.25')
  tl_2.to('#main-view', 0.5, {autoAlpha:1}, 'same-keyframe+=0.12');
  angular.element(document.querySelector("#ionNavView")).attr("animation","slide-left-right");
  angular.element(document.querySelector("#ionNavBar")).removeClass("no-animation");
  angular.element(document.querySelector("#ionNavBar")).addClass("nav-title-slide-ios7");
  /* Be aware that there is piece of code at line 110*/
}
else{
		angular.element(effect_view).addClass('ng-hide');
		angular.element(div_transition).addClass('ng-hide');
}
  // ----- by L-C-BA ----- //

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

      if ($scope.stateStatus.currentState != "not-so-good.pathology-description"){
        pathologySwiper.swipeTo($scope.pathologySelected - 1);
      }

      // WRITTEN BY L-C-BA
	  if(animationSet == 'true'){
		  angular.element(document.querySelector("#second-animations")).addClass("second-animations");
	  }
      // ending by l-c-ba

    });
  };

  $scope.getLevel = function() {
    var level, options = pathologies;

    for(var i = 0; i < selected.length; i++) {
      options = options[selected[i]];

      if(!options) {
        return null;
      }
    }

    level = angular.copy(levels[this.levelCount]),
    level.options = angular.isArray(options) ? options : Object.keys(options);
    level.options = [''].concat(level.options).concat(['']);

    return level;
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

      FeelingService.getPathologyReplays('not-so-good', pathology).then(function(pathologyReplays){
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


  var next;

  $scope.nextPathology = function() {
    //var next,
    var optionSelected = $scope.level.options[$scope.pathologySelected];

    if(optionSelected) {
      selected.push(optionSelected);
      $scope.levelCount++;

      next = $scope.getLevel();

      if(!next) {
        loadPathology(optionSelected);

        FeelingService.saveFeeling('not-so-good', {
          date: new Date(),
          pathology: optionSelected
        });

        $state.go('not-so-good.pathology-description');
      }
      else {
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
    var good = FeelingService.getFeeling('completeGoodHistory');

    if(good.length > 0) {
      $scope.goodData = good[Math.floor(Math.random() * good.length)];
      $state.go('not-so-good.technical');
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

  $scope.onSwipeRight = function() {
    FeelingService.swipeRightPathology('not-so-good.pathology', 'not-so-good.pathology-description', $scope, $rootScope, selected);
  }

  $scope.$on('$stateChangeStart', function(e) {
    $ionicScrollDelegate.scrollTop();
  });

  initialize();
});

'use strict';

angular.module('promoodApp')

.controller('FeelingNotSoBadController', function ($scope, $rootScope, $state, $timeout, $ionicPopup, $ionicScrollDelegate, $ionicViewService, $ionicNavBarDelegate, FeelingService, PersonalityService, GoalsService, UserService) {
  var personalityTestSkip;
  personalityTestSkip = localStorage.getItem('PersonalityTestSkip', "false");
    //if personalityTestSkip is true (skipped) user gets popup alert.
  if (personalityTestSkip === "true") {
    $scope.personalitySkip = true;
  } else {
    $scope.personalitySkip = false;
  }

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

'use strict';

angular.module('promoodApp')
.controller('TechniquesController', function ($scope, $rootScope, $state, FeelingService, GoalsService) {
  $rootScope.showHomeButton = true;
  $rootScope.showNoTechniques = false;
  $scope.techniques = [];



  var initialize = function() {
    //fixit
    GoalsService.getTechnics().then(function(result){
      $scope.techniques = result;
      console.log("Getting techniques: "+$scope.techniques); 
      //$scope.goals = FeelingService.getGoals();

      if($scope.techniques.length == 0)
        {
          $rootScope.showNoTechniques = true;
        }

      angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
      angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
      angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
      angular.element(document.querySelector("#leftMenutButton")).addClass("pink");

    });

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
    $rootScope.technicsToDo.wasPostponed = false;
    $scope.goals = FeelingService.getGoals();
    $state.go('technics');
  };

  $scope.showTechniqueDescription = function(idDOM) {
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
      $scope.audio.stop();
      //$scope.audio.release();
    }

    $scope.showNextButton = true;
    if ($scope.technic.title === 'Abdominal Breathing'){
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
    console.log('going success via done btn '+$scope.technic.title);
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
            if($scope.technic.id == "T2"){
                if ($scope.audioTimer){
                    $interval.cancel($scope.audioTimer);
                }
                $scope.audio.stop();
                $scope.audioIsCompleted = false;
            }
            else{
                $scope.stopAudio();
            }
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
    $scope.initializeAudio('data/panic_audio.mp3', true);
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
          setTimeout(function(){
            console.log('mindfulness init audio: ' + $scope.mindfulnessAudioUrl);
            //$scope.initializeAudio($scope.mindfulnessAudioUrl, true);
            $scope.initializeAudio1($scope.mindfulnessAudioUrl, true);
          }, 1000);
          
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
      $scope.initialAudioDelay = 0;
        /*
      $scope.audio = {};
      $scope.audio = ngAudio.load(url);
      $scope.audioIsCompleted = false;
      $scope.audioStatus = 3;

        if (updatePlayer) {
            $scope.audioTimer = $interval(function () {
              $scope.audioCurrentTime = $scope.audio.currentTime;
              $scope.audioProgress = $scope.audio.progress;
              if ($scope.audioProgress >= 0.999){
                $scope.audioIsCompleted = true;
                //$scope.audioStatus = 3;
              }
            }, 100);
        }*/
      if (window.plugins && window.plugins.streamingMedia){
        //alert("audio available");
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

    $scope.initializeAudio1 = function(url, updatePlayer) {
        $scope.initialAudioDelay = 0;

        $scope.audio = {};
        $scope.audio = new Media('data/beep.mp3', onAudioSuccess, onAudioError, onAudioStatusChange);
        $scope.audio.play({ playAudioWhenScreenIsLocked : true });
        $scope.audio.stop();

        $scope.audio = ngAudio.load(url);
        $scope.audioIsCompleted = false;
        $scope.audioStatus = 3;

        if (updatePlayer) {
            $scope.audioTimer = $interval(function () {
                if ($scope.audioStatus != 3){
                    $scope.audioCurrentTime = $scope.audio.currentTime;
                    $scope.audioProgress = $scope.audio.progress;
                    if ($scope.audioProgress >= 0.999){
                        $scope.audioIsCompleted = true;
                        //$scope.audioStatus = 3;
                    }
                }
            }, 100);
        }
    }

    $scope.playAudio = function(){
      if ($scope.audio){
        console.log('audio exist');
        $scope.audio.play({ playAudioWhenScreenIsLocked : true });
        $scope.audioStatus = 2;
        if(window.plugins && window.plugins.insomnia) {
          window.plugins.insomnia.keepAwake();
        }
      } else {
        console.log('audio not exist');
      }
    }
    $scope.pauseAudio = function(){
      if ($scope.audio){
        $scope.audio.pause();
        $scope.audioStatus = 4;
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
        $scope.audio.unbind();
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

'use strict';

angular.module('promoodApp')
.controller('TrainingsController', function ($scope, $rootScope, $cordovaFile, $cordovaFileTransfer, $state, $cordovaMedia, $ionicPopup, $ionicLoading) {
  $rootScope.trainingDescriptionVisible = true;

  var trainingFile = "mindfulness.zip";
  var trainingDir  = "Trainings/Mindfulness/";
  var trainingUrl  = "http://d3hr4akwcd3lu9.cloudfront.net/";
  //var trainingUrl  = "http://pro-mood.s3.eu-central-1.amazonaws.com/trainings/";

    
  var initialize = function() {
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
  };
    
  $scope.startTraining = function (){
   
    $cordovaFile.checkDir(cordova.file.dataDirectory, trainingDir)
      .then(function (success) {
        console.log('directory exists');
        startTraining();
      }, function (error) {
        console.log('directory does not exist');
        promptDownloadFile();
      });
  }
  
  var promptDownloadFile = function (){
    if (navigator.connection.type == Connection.NONE){
        console.log('user does not have internet');
        
        $ionicPopup.alert({
          title: 'Alert',
          template: "You need internet connection to download the training.",
          okText: 'Accept'
        });
        
        return;
    }   
      
    $ionicPopup.confirm({
         title: 'Training',
         template: 'To start the training we need to download it first'
       }).then(function(res) {
         if(res) {
           console.log('User accepted training download');
           downloadFile();
         } else {
           console.log('User canceled training download');
         }
       });
  }
  
  var promptStartTraining = function (){      
    $ionicPopup.confirm({
         title: 'Training',
         template: 'Your training is ready to use, would you like to start now?'
       }).then(function(res) {
         if(res) {
           console.log('User accepted start training');
           startTraining();
         } else {
           console.log('User canceled start training');
         }
       });
  }
  
  var startTraining = function(){
    $state.go("mindfulnessSinglePage");
  }

  var removeFile = function (onsuccess, onerror){
      $cordovaFile.removeFile(cordova.file.dataDirectory, trainingFile)
      .then(function (success) {
         console.log('removing file success');
         onsuccess();
      }, function (error) {
        console.log("removing file failed");
         onerror(error);
      });
  }
  
  var unzipFile = function (){
    var src = cordova.file.dataDirectory + trainingFile;
    var dest = cordova.file.dataDirectory + trainingDir;
      
    zip.unzip(src, dest, 
              function(result){
                if (result == 0){ 
                    console.log('unzip success');
                    removeFile(function(){$scope.loading.hide();}, function(){$scope.loading.hide();});
                    promptStartTraining();
                } else {
                    console.log('unzip failure');
                }
             });
  }
      
  var downloadFile = function (){
    var url = trainingUrl + trainingFile;

    var targetPath = cordova.file.dataDirectory + trainingFile;
    var trustHosts = true;
    var options = {};
      
    $scope.downloadProgress = 0;  
    
    $scope.loading = $ionicLoading.show({
        template: 'Downloading training ... ' + window.Math.round($scope.downloadProgress) + '% <ion-spinner icon="circles"></ion-spinner>',
        showBackdrop: true,
        scope: $scope
   }); 
      
    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
       // alert('download success');
        console.log('download success');
        unzipFile();
      }, function(err) {
        //    alert(targetPath);
        console.log('download failure');
        $ionicLoading.hide();
      }, function (progress) {
        //$timeout(function () {
          //console.log('Download progress: ' + ((progress.loaded / progress.total) * 100) + '%');
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        
          $scope.loading = $ionicLoading.show({
                template: 'Downloading training ... ' + window.Math.round($scope.downloadProgress) + '% <ion-spinner icon="circles"></ion-spinner>',
                showBackdrop: true,
                scope: $scope
           }); 
        //})
      });
  }


  $scope.showTrainingDescription = function() {
    	if($rootScope.trainingDescriptionVisible == false){
			$rootScope.trainingDescriptionVisible = true;
		}else{
			$rootScope.trainingDescriptionVisible = false;
		}
  };


  initialize();
});

'use strict';

var app = app || {};

angular.module('promoodApp')

.controller('ChatController', function ($scope, $ionicScrollDelegate, $rootScope, $state, $window, $timeout, $ionicPopup, UserService, FeelingService, ChatService, PersonalityService, StateService) {

    var onError = function (error) {
        console.log(error);
    };

    var timer;

    var initialize = function () {

        angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
        angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
        angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
        angular.element(document.querySelector("#leftMenutButton")).addClass("pink");

        $rootScope.isWaiting = false;

        $rootScope.showChatSettingMenu = true;
        $rootScope.user = UserService.getPersonal();
        $rootScope.messages = $rootScope.messages || [];
        $rootScope.chatPrivacy = ChatService.getPrivacy();
        $rootScope.anonymously === undefined ? true : $rootScope.anonymously;
        $rootScope.party = $rootScope.party === undefined ? {
            name: 'Anonymous'
        } : $rootScope.party;
        
        ChatService.createChatUser().then(function (result) {
            $rootScope.chatUser = ChatService.getChatUser();
            if ($rootScope.chatUser === null) {
                $rootScope.chatUser = result.data;
                ChatService.saveChatUser($rootScope.chatUser);
            }
        }, function (e) {
            console.log(e);
        });
    
        var server = window.server_url + ":" + window.ws_port;
        app.ChatWebApi.setErrorCallback(onError);
        app.ConversationManager.configuration.chatWebSocketServerUrl = "ws://" + server;
        app.ConversationManager.configuration.onerror = onError;
        app.ConversationManager.configuration.onstatusChange = function (status) {
            console.log('on status change: ' + status);
            if (status == "Talking") {
                $rootScope.chatting = true;
                $rootScope.messages = [];
                $scope.chatSource = {};
                $timeout.cancel(timer);
                timer = undefined;
                $state.go("chat-start");
                
                if (!$rootScope.anonymously) {
                    var profile = getChatProfile();
                
                    console.log('requesting profile');

                    $rootScope.getConversation().sendProfile(angular.toJson(profile));
                }
            }
        };
        /*app.ConversationManager.configuration.onConversationStablished = function (msg) {
            console.log('conversation established');

            $rootScope.chatting = true;
            $rootScope.messages = [];
            $scope.chatSource = {};
            $timeout.cancel(timer);
            timer = undefined;
            $state.go("chat-start");
        };*/
        
        app.ConversationManager.configuration.onConversationRequest = function (msg) {  
            var autoClosing = false;
            
            var currentPopup = $ionicPopup.confirm({
                title: 'Alert',
                template: "A user wants to chat with you, would you like to connect now?",
                cancelText: 'No',
                okText: 'Yes'
            });
            
            currentPopup.then(function (result) {
                if (!autoClosing){
                    $timeout.cancel($rootScope.waitingTimer);

                    if (result) {
                        $rootScope.getConversation().sendAccepted();
                    } else {
                        $rootScope.getConversation().sendDeclined("Rejected");
                        $rootScope.closeConversation($rootScope.getConversation());
                    }
                }
                
                $rootScope.isWaiting = false;
            });
            
            $rootScope.waitingTimer = $timeout(function(){
                currentPopup.close(); 
                $rootScope.getConversation().sendDeclined("Timeout");
                $rootScope.isWaiting = true;
                autoClosing = true;
            }, 10000);
        };

        app.ConversationManager.configuration.onmessage = function (msg) {
            processMessage(msg.Data);
        };
        
        app.ConversationManager.configuration.onProfileReceived = function (msg) {
            processProfile(msg.Data);
        };

        app.ConversationManager.configuration.onclose = function () {
            if ($rootScope.stateStatus.currentState == "chat-connecting"){
                $ionicPopup.alert({
                    title: 'Info',
                    template: "The chat is not available at the moment, please try again later.",
                    cancelText: 'No',
                    okText: 'OK'
                }).then(function (result) {
                    if (result) {
                        $state.go('chat');
                    }
                });
            }
            
            $rootScope.messages = [];
            //$rootScope.anonymously = true;
            $rootScope.party = {
                name: 'Anonymous'
            };
            $rootScope.chatting = false;

            if ($rootScope.stateStatus.currentState == "chat-start" || 
                $rootScope.stateStatus.currentState == "chat-settings" ||
                $rootScope.stateStatus.currentState == "chat-profile") {
                $ionicPopup.alert({
                    title: 'Disconnected',
                    template: "It seems the other user has closed the connection, we will redirect you back home.",
                    cancelText: 'No',
                    okText: 'OK'
                }).then(function (result) {
                    if (result) {
                        $state.go('welcome');
                    }
                });
            }

        };

        app.ConversationManager.configuration.onConversationStablished = function (msg) {
            $timeout.cancel($rootScope.chatTimer);

            $rootScope.isWaiting = false;
            
            if ($rootScope.chatRole == 'helpme') {
                ChatService.saveChatReceivedHelp();
            } else {
                ChatService.saveChatHelpedUser();
            }
        };
    };
    
    var getChatProfile = function (){
        var conversation = $rootScope.getConversation();
        var user = $scope.user;
        var rootUser = $rootScope.user;
        var privacy = $rootScope.chatPrivacy;
        var personal = UserService.getPersonal();

        var chatProfile = {};

        chatProfile.name = user.name;
        chatProfile.id = $rootScope.chatUser.Id;
        
        if (privacy.age)            { chatProfile.age               = moment().diff(rootUser.date, 'years'); }
        if (privacy.gender)         { chatProfile.gender            = rootUser.gender == "1" ? "Male" : "Female"; }
        if (privacy.personalityType){ chatProfile.personalityType   = PersonalityService.getState(); } 
        if (privacy.personalityType){ chatProfile.personalityInfo   = PersonalityService.getPersonalInfo(); } 
        if (privacy.achievements)   { chatProfile.achievements      = UserService.getAchievements(); }
        if (privacy.averageMood)    { chatProfile.averageMood       = UserService.calculateAverageMood(); }
        if (privacy.bornCountry)    { chatProfile.bornLocation      = personal.bornLocation; }
        if (privacy.livingCountry)  { chatProfile.livingCountry     = personal.location; }
        if (privacy.maritalStatus)  { chatProfile.maritalStatus     = personal.maritalStatus; }
        if (privacy.job)            { chatProfile.job               = personal.job; }
        if (privacy.words)          { chatProfile.words             = personal.words; }
        if (privacy.quote)          { chatProfile.quote             = personal.quote; }
        if (privacy.hobbies)        { chatProfile.hobbies           = personal.hobbies; }

        
        return chatProfile;
    };

    var processProfile = function(msg){
        var chatProfile = angular.fromJson(msg);

        chatProfile.feelings = {};

        if (chatProfile.averageMood){
            chatProfile.feelings['good'] = chatProfile.averageMood.good;
            chatProfile.feelings['not-so-bad'] = chatProfile.averageMood.notSoBad;
            chatProfile.feelings['not-so-good'] = chatProfile.averageMood.notSoGood;
            chatProfile.averageMood = chatProfile.averageMood.averageMood;
        }
        
        $rootScope.party = chatProfile;
        
        $rootScope.$apply();

        console.log($rootScope.party);
    };
    
    var processMessage = function (msg) {
        console.log(msg);
 
        $rootScope.messages.push({
            data: msg,
            origin: 'receive',
            time: moment().format("HH:mm")
        });
        $rootScope.$apply();
    };

    var getUserData = function (role) {
        var userRole;
        
        if (role == 'helpme') {
            userRole = 'Patient';
        } else if (role == 'helper') {
            userRole = 'Psychoanalyst';
        }

        if (!$rootScope.anonymously) {
            var userDataId = 1; //why is this even used? $rootScope.chatUser.Id;
            var userDataName = $scope.user.name;
            var userDataFriendOf = [];
        } else {
            var userDataId = 0;
            var userDataName = 'Anounymous';
            var userDataFriendOf = [];
        }

        var userData = {
            user: {
                id: userDataId,
                name: userDataName,
                FriendOf: userDataFriendOf
            },
            userRole: userRole
        };

        return userData;
    };

    $scope.connect = function (role) {
        if (!ChatService.hasAcceptedTerms()){
            var currentPopup = $ionicPopup.confirm({
                title: 'DISCLAIMER',
                template: "Promood takes no responsibility whatsoever for opinions expressed or actions taken by users. Promood is not liable for how anyone reacts to any content found within the chat rooms. Use at your own risk and without liability to us (the provider), in any shape or form.",
                cancelText: 'Quit',
                okText: 'I agree'
            }).then(function (result) {
                if (result) {
                    ChatService.saveAcceptedTerms();
                    $scope.connect(role);
                }
            });
            
            return;
        }
        
        if (navigator.connection != null && navigator.connection.type == Connection.NONE) {
            console.log('user does not have internet');

            $ionicPopup.alert({
                title: 'Alert',
                template: "You need internet connection to be able to use the chat.",
                okText: 'Accept'
            });

            return;
        }
        
        $state.go("chat-connecting");

        console.log('connect ' + role);

        $rootScope.isWaiting = false;
        $rootScope.lastConnectedRole = role;

        $rootScope.closeConversation();

        $rootScope.chatRole = role;
        
        $rootScope.chatTimer = $timeout(function () {
             $rootScope.setConversation(app.ConversationManager.connectToRandomConversation(getUserData(role)));
        }, 1000);
        
        $rootScope.chatTimer = $timeout(function () {
            if (!$rootScope.chatting) {
                if ($rootScope.getConversation()) {
                   $rootScope.getConversation().sendLogout();
                   //$rootScope.closeConversation($rootScope.getConversation());
                }
            }

            $ionicPopup.confirm({
                title: 'Alert',
                template: "There are no other users connected at the moment, would you like to be notified when someone is available?",
                cancelText: 'No',
                okText: 'Yes'
            }).then(function (result) {
                if (result) {
                    $rootScope.getConversation().sendWait();
                    $rootScope.isWaiting = true;
                } else {
                    $rootScope.closeConversation($rootScope.getConversation());
                }
                
                $state.go('chat');
            });
        }, 30000);
    };


    $rootScope.getConversation = function () {
        //we remove closed connections
        if ($rootScope.conversations && $rootScope.conversations.ws && "CLOSED" == $rootScope.conversations.ws.getStatus()) {
            $rootScope.conversations = null;
        }

        return $rootScope.conversations;
    };

    $rootScope.setConversation = function (conversation) {
        $rootScope.conversations = conversation;
    };

    $rootScope.closeConversation = function (conversation) {
        conversation.close();
    };
    
    $rootScope.startWaiting = function (){
    };

    $rootScope.closeConversation = function () {
        if ($rootScope.conversations) {
            $rootScope.conversations.close();
            $rootScope.conversations = null;
        }
    };

    $scope.send = function (msg) {

        var scrollToElement = document.querySelector("#chat-messeges");
        if (scrollToElement) {
            var finalPosition = scrollToElement.getBoundingClientRect().bottom;
            $ionicScrollDelegate.scrollTo(0, finalPosition, true);
        }

        if (!msg || msg == '') {
            return;
        }
        try {
            $rootScope.getConversation().sendMessage(msg);
            $rootScope.messages.push({
                data: msg,
                origin: 'send',
                time: moment().format("HH:mm")
            });
            $scope.chatSource = {};
            angular.element("#textInput").val('');
        } catch (error) {
            console.log(error);
        }

    };

    $scope.disconnect = function () {
        if ($rootScope.getConversation()) {
            $rootScope.closeConversation($rootScope.getConversation());
            $rootScope.chatting = false;
        }
        $state.go('welcome');
    };

    $scope.chatAnonymously = function () {
        $rootScope.anonymously = !$rootScope.anonymously;
    };

    $scope.chatViewProfile = function () {
        $state.go('chat-profile');
    };

    $scope.closeProfile = function () {
        StateService.returnToPreviousState($rootScope.stateStatus);

    };

    $scope.isFriend = function () {
        return _.where($rootScope.chatUser.FriendOf, {
            Id: $rootScope.party.id
        }).length > 0
    }

    var saveFriend = function () {
        var existingFriend = _.where($rootScope.chatUser.FriendOf, {
            Id: $rootScope.party.id
        });
        if (existingFriend.length == 0) {
            $rootScope.chatUser.FriendOf.push({
                Id: $rootScope.party.id,
                name: $rootScope.party.name
            });
            ChatService.updateChatUser($rootScope.chatUser).then(function (data) {
                console.log(data, '- OK')
            });
            ChatService.saveChatUser($rootScope.chatUser);
        }
    };

    $scope.addFriend = function () {
        var existingFriend = _.where($rootScope.chatUser.FriendOf, {
            Id: $rootScope.party.id
        });
        if (existingFriend.length == 0) {
            $rootScope.getConversation().sendMessage("##addfriend:");
            $rootScope.waitingPopup = $ionicPopup.alert({
                title: 'Info',
                template: 'Waiting the other party friendship response.',
                cancelText: 'No',
                okText: 'Yes'
            });
        } else {
            $ionicPopup.alert({
                title: 'Alert',
                template: $rootScope.party.name + ' is already friend of you.',
                cancelText: 'No',
                okText: 'Yes'
            });
        }
        $state.go('chat-start');
    };

    $scope.isConnected = function (friend) {
        if ($rootScope.availableFriendsOnlinePartyIds && friend) {
            return $rootScope.availableFriendsOnlinePartyIds[friend.Id];
        }
        return false;
    };


    $scope.viewFriends = function () {
        app.ChatWebApi.conversations.findAvailableOnlineFriendsOf($rootScope.chatUser.Id, null)
            .then(function (result) {
                $rootScope.availableFriendsOnlinePartyIds = []; //we store the party id associated to the user id
                for (var i = 0; i < result.length; i++) {
                    var element = result[i];
                    $rootScope.availableFriendsOnlinePartyIds[element.User.Id] = element.Id;
                }
            });
        $state.go('chat-friends');
    };

    $scope.viewChatSettings = function () {
        $state.go('chat-settings');
    };

    // saving personal privacy toggle
    $scope.changePrivacy = function () {
        ChatService.savePrivacy($rootScope.chatPrivacy);
    }


    $scope.changeAgePrivacy = function () {
        $rootScope.chatPrivacy.age = !$rootScope.chatPrivacy.age;
        $scope.changePrivacy();
    };

    $scope.changeGenderPrivacy = function () {
        $rootScope.chatPrivacy.gender = !$rootScope.chatPrivacy.gender;
        $scope.changePrivacy();
    };

    $scope.changePersonalityTypePrivacy = function () {
        $rootScope.chatPrivacy.personalityType = !$rootScope.chatPrivacy.personalityType;
        $scope.changePrivacy();
    };

    $scope.changeAverageMoodPrivacy = function () {
        $rootScope.chatPrivacy.averageMood = !$rootScope.chatPrivacy.averageMood;
        $scope.changePrivacy();
    };
    $scope.changeAchievementsPrivacy = function () {
        $rootScope.chatPrivacy.achievements = !$rootScope.chatPrivacy.achievements;
        $scope.changePrivacy();
    };
    // end

    $scope.unfriend = function (friend) {
        var friendToDelete = _.where($rootScope.chatUser.FriendOf, {
            Id: friend.Id
        });
        if (friendToDelete.length > 0) {
            var index = $rootScope.chatUser.FriendOf.indexOf(friendToDelete[0]);
            $rootScope.chatUser.FriendOf.splice(index, 1);
            ChatService.saveChatUser($rootScope.chatUser);
            ChatService.updateChatUser($rootScope.chatUser).then(function (data) {
                console.log(data, '- OK')
            });
            $state.go('chat');
        }
    };

    $scope.setFocusOnTextarea = function (textAreaIsFocused, focusedTextareaId) {

        var elementId = '#' + focusedTextareaId;
        var el = angular.element(elementId);

        if (textAreaIsFocused) {
            el.addClass('chatFooter');
            el.removeClass('chatFooterOut');
        } else {
            el.addClass('chatFooterOut');
            el.removeClass('chatFooter');
        }

        if (textAreaIsFocused == 'Send') {
            el.removeClass('chatFooterOut');
            el.removeClass('chatFooter');
        }
        console.log('funcion setFocusOnTextarea:', textAreaIsFocused);
    };

    $scope.showChangeBornCountry = function () {
        $scope.name = $rootScope.user.bornLocation;
        $state.go('chat-change-born-country');

    };

    $scope.changeBornCountry = function (name) {
        $rootScope.user.bornLocation = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.bornCountry = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');
    };

    $scope.showChangeCountry = function () {
        $scope.name = $rootScope.user.location;
        $state.go('chat-change-country');

    };

    $scope.changeCountry = function (name) {
        $rootScope.user.location = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.livingCountry = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');

    };

    $scope.showChangeJob = function () {
        $scope.name = $rootScope.user.job;
        $state.go('chat-change-job');

    };

    $scope.changeJob = function (name) {
        $rootScope.user.job = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.job = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');

    };

    $scope.showChangeMaritalStatus = function () {
        $scope.name = $rootScope.user.maritalStatus;
        $state.go('chat-change-marital-status');

    };

    $scope.changeMaritalStatus = function (name) {
        $rootScope.user.maritalStatus = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.maritalStatus = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');

    };

    $scope.showChangeHobbies = function () {
        //        $scope.name = $rootScope.user.hobbies;
        $state.go('chat-change-hobbies');

    };

    $scope.changeHobbies = function (name) {
        $rootScope.user.hobbies = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.hobbies = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');

    };

    $scope.showChangeQuote = function () {
        //  $scope.name = $rootScope.user.quotes;
        $state.go('chat-change-quote');

    };

    $scope.changeQuote = function (name) {
        $rootScope.user.quote = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.quote = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');

    };

    $scope.showChangeWords = function () {
        //        $rootScope.name = $rootScope.user.words;
        $state.go('chat-change-words');

    };

    $scope.changeWords = function (name) {
        $rootScope.user.words = name;
        UserService.savePersonal($rootScope.user);
        // for sharing info
        $rootScope.chatPrivacy.words = name != null;
        $scope.changePrivacy();
        // end
        $state.go('chat-settings');

    };

    $scope.showFullCharacteristics = function () {
        $scope.showFullCharacteristic = true;
        $ionicScrollDelegate.$getByHandle('profileScroll').resize();
    };


    if (!$rootScope.locationChangeStartListenerAdded) {

        $rootScope.$on("$locationChangeStart", function (event, next, current) {

            if (next.indexOf('#/chat') == -1) {
                //navigating outside chat pages
                $rootScope.showChatSettingMenu = false;
            } else {
                $rootScope.showChatSettingMenu = true;
            }
        });

        $rootScope.locationChangeStartListenerAdded = true;
    }

    if (!$rootScope.locationChangeSuccessListenerAdded) {


        $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
            //console.log('FROM ' + current + ' TO '+ next);
            if (current.indexOf('#/chat') >= 0) {
                if (next.indexOf('#/chat') == -1) {
                    if (!$rootScope.isWaiting){
                        //$rootScope.closeConversation(); //leaving chat we close everything
                    }
                }
            }

            if ($rootScope.endsWith(next, '#/chat')) {
               if (!$rootScope.isWaiting){
                   // $rootScope.closeConversation();
               }
            }

        });

        $rootScope.locationChangeSuccessListenerAdded = true;
    }

    $rootScope.endsWith = function (string, ending) {
        if (!string || !ending) {
            return false;
        }
        return string.length == ending.length + string.indexOf(ending)
    }

    $scope.$on('onRepeatLast', function (scope, element, attrs) {
        /*var textareas = element.find("textarea");
        if(textareas && textareas.length > 0) {
          textareas[0].focus();
        }*/
        $ionicScrollDelegate.scrollBottom(true);
        /*console.log("element: " + element);
        console.log("attrs: " + attrs);
        console.log("new message");*/

    });

    initialize();
});
'use strict';

angular.module('promoodApp')

.controller('ChatControllerDisabled', function ($scope, $rootScope, $state, StateService, $ionicPopup) {

  var initialize = function() {
        $ionicPopup.alert({
            title: 'Coming Soon!',
            }).then(function(res) {
            $state.go('welcome');
          });
  };

  initialize();
});

'use strict';

angular.module('promoodApp')

.controller('AboutController', function ($scope, $rootScope, $ionicPopup) {

  /*var initialize = function() {
    console.log("initialize About Controller");
  };

  initialize();*/
  angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
  angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
  angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
  angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
    
  $scope.showAlert = function(title, template) {
    var alertPopup = $ionicPopup.alert({
      title: this.title,
      template: this.template
    });
    alertPopup.then(function(res) {
      console.log('After press ok');
    });
  };

  $scope.OpenUrlInExternalBrowser = function (url){
    console.log("OpenUrlInExternalBrowser: " + url);
    window.open(url, "_system");
  };

  $scope.SuggestFeatureByEmail = function (){
    console.log("SendEmalFromInApp");

    window.plugins.socialsharing.canShareViaEmail(
      canShareViaEmailSuccess,
      function(e){
        $ionicPopup.alert({
          title: 'Promood',
          template: 'You don\'t have your email configured in your phone. Please add your mail account in settings.'
        });
      });

    /*window.plugins.socialsharing.shareViaEmail(
      '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
      'Suggest a feature',
      ['suggestions@promood.com'], // TO: must be null or an array
      null, // CC: must be null or an array
      null, // BCC: must be null or an array
      null, // FILES: can be null, a string, or an array
      function() {console.log('share ok')},
      function(errormsg){alert(errormsg)
      ;
      console.log (errormsg);
      } // called when sh*t hits the fan
    );*/
  };

  var canShareViaEmailSuccess = function (e){
    console.log("canShareViaEmailSuccess");
    window.plugins.socialsharing.shareViaEmail(
      '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
      'Suggest a Feature',
      ['suggestions@promoodapp.com'], // TO: must be null or an array
      null, // CC: must be null or an array
      null, // BCC: must be null or an array
      null, // FILES: can be null, a string, or an array
      function() {console.log('share ok')},
      function(errormsg){/*alert(errormsg)
        ;*/
        console.log (errormsg);
      } // called when sh*t hits the fan
    );
  }
});

'use strict';

angular.module('promoodApp')
  .controller('PanicController', function ($scope, $rootScope, $state, $route, ngAudio, $ionicPopup, $ionicScrollDelegate) {
    var initialize = function () {
      $scope.initialAudioDelay = 0;
      $scope.startFrom4AudioDelay = -2;
      $scope.startFrom4TweensDelay = 0;

      $scope.totalDurationOfPreviewsTweens = 15.40; //duration of tweens 1, 2 and 3

      angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
      angular.element(document.querySelector("#leftMenutButton")).addClass("blue");
      angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
      angular.element(document.querySelector("#leftMenutButton")).removeClass("pink");

      console.log('initialize PanicController');
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

      if ($scope.audio){
          $scope.audio.release();
      }
      $scope.audio = {};
      $scope.audio = new Media('data/panic_audio.mp3', onAudioSuccess, onAudioError, onAudioStatusChange);
      $scope.audio.play({ playAudioWhenScreenIsLocked : true });
      $scope.audio.pause();

      $scope.audio = ngAudio.load('data/panic_audio.mp3');
    };

    var onAudioSuccess = function(){
        console.log("audio should be initialized");
    }
    var onAudioError = function(error){
        console.log('audio error: ' + error);
    }
    var onAudioStatusChange = function(status){
        console.log('audio changed');
    }

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

'use strict';

angular.module('promoodApp')

.controller('TestLonelinessController', function ($scope, $rootScope, $state, GoalsService) {

  ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    //StatusBar.hide();
  });

  $scope.redirectToLonelinessTest = function() {
    GoalsService.getTechnics().then(function(result){

      window.localStorage['lonelinessTestAlreadyEjecuted'] = angular.toJson(false);

      $scope.technics = result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;

      var oneTechnic = _.where($scope.technics, {title:'Test Loneliness'});
      //      $scope.technics = [{}, oneTechnic[0]];

      $rootScope.technicsToDo = [];
      $rootScope.technicsToDo.push(oneTechnic[0]);
      $state.go('technics');
    });
  }
});

'use strict';

angular.module('promoodApp')

.controller('AboutBiorhythm', function ($scope, $rootScope, $state, StateService, $ionicNavBarDelegate) {

  var initialize = function() {
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
  };

  $scope.goBack = function(){
    $rootScope.returningFromBioRhythmAbout = true;
    $state.go($rootScope.savedScope.returnTo);
    //ionicHistory.backView();
    //$state.go("not-so-good.pathology-description");
  }
  initialize();
});

'use strict';

angular.module('promoodApp')

.factory('UserService', function() {
  var self = {},
  genders = [
  { name: 'Select', value: 0 },
  { name: 'Male', value: 1 },
  { name: 'Female', value: 2 }
  ];

  self.getGenders = function() {
    return genders;
  };

  self.getPersonal = function() {
    return angular.fromJson(window.localStorage.personal) || {};
  };

  self.savePersonal = function(data) {
    window.localStorage.personal = angular.toJson(data);
  };

/*  self.getFeelingGood = function() {
    return angular.fromJson(window.localStorage.feelingGood) || [];
  };*/

/*  self.saveFeelingGood = function() {
    var feelings = self.getFeelingGood();
    feelings.push(data);
    window.localStorage.feelingGood = angular.toJson(feelings);
  };*/

  self.getAchievements = function(){
    return angular.fromJson(window.localStorage.achievements) || [];
  };

  self.saveAchievements = function(achievements){
    window.localStorage.achievements = angular.toJson(achievements);
  };

  self.calculateNewAchievements = function(){
    var achievements = self.getAchievements();
    var newAchievements = [];

    var newAchievement = self.getNewTrainingAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewHelpHelperAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewDaysAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewGoalsAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewShareAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }

    var newAchievement = self.getNewProclivityAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }

    return newAchievements;
  };

  self.getNewTrainingAchievements = function(achievements){
    if (getMindfulnessFinished()){
      if (_.where(achievements, {name: 'Completed Training'}).length == 0){
        return {name:"Completed Training", date:moment()};
      }
      return null;
    }
  };

  self.getNewHelpHelperAchievements = function(achievements){
    if (getChatHelpedUser()){
      if (_.where(achievements, {name: 'Helped a user'}).length == 0){
        return {name:"Helped a user", date:moment()};
      }
    }
    if (getChatReceivedHelp()){
      if (_.where(achievements, {name: 'Received help from another user'}).length == 0){
        return {name:"Received help from another user", date:moment()};
      }
    }
    return null;

  };

  self.getNewDaysAchievements = function(achievements){
    /*var history = getHistory();
    if (history){
      
      var amountOfConsecutiveDays = 0;
      var lastDate = null;
    
      for (var i = 0; i < history.length; i++) {
         var historyRecord = history[i];
         
         var dateString = historyRecord.date.substring(0, 10);
          
         var currentDate = new Date(dateString);
        
         if (currentDate != lastDate){
            amountOfDays++;
         }
          
         lastDate = dateText;
      }  
        
      if (amountOfConsecutiveDays == 10){
        if (_.where(achievements, {name: '10 consecutive days using ProMood'}).length == 0){
          return {name:"10 consecutive days using ProMood", date:moment()};
        }
      }
      if (amountOfConsecutiveDays == 30){
        if (_.where(achievements, {name: '30 consecutive days using ProMood'}).length == 0){
          return {name:"30 consecutive days using ProMood", date:moment()};
        }
      }
      if (amountOfConsecutiveDays == 60){
        if (_.where(achievements, {name: '60 consecutive days using ProMood'}).length == 0){
          return {name:"60 consecutive days using ProMood", date:moment()};
        }
      }
    }*/
    return null;
  };

  self.getNewGoalsAchievements = function(achievements){
    var technicsDone = getTechnicsDone();
    if (technicsDone){
      if (technicsDone.length == 10){
        if (_.where(achievements, {name: '10 Goals completed'}).length == 0){
          return {name:"10 Goals completed", date:moment()};
        }
      }
      if (technicsDone.length == 30){
        if (_.where(achievements, {name: '30 Goals completed'}).length == 0){
          return {name:"30 Goals completed", date:moment()};
        }
      }
      if (technicsDone.length == 60){
        if (_.where(achievements, {name: '60 Goals completed'}).length == 0){
          return {name:"60 Goals completed", date:moment()};
        }
      }
    }
    return null;
  };

  self.getNewShareAchievements = function(achievements){
    if (getShareStatus()){
      if (_.where(achievements, {name: 'Shared activity'}).length == 0){
        return {name:"Shared activity", date:moment()};
      }
    }
    return null;
  };

  self.getNewProclivityAchievements = function(achievements){
    if (getStressProclivityResults() != null){
      if (_.where(achievements, {name: 'Stress Proclivity Test completed'}).length == 0){
        return {name:"Stress Proclivity Test completed", date:moment()};
      }
    }
    return null;
  };

  // counters for AVG mood in profile
  //starts

  self.saveFeelingGoodCounter = function(){
    var counter = window.localStorage['feelingGoodCounter'];
    if (isNaN(counter)){
      counter = 0;
    }
    counter++;
    window.localStorage.feelingGoodCounter = counter;
  }

  self.saveFeelingBadCounter = function(){
    var counter = window.localStorage['feelingBadCounter'];
    if (isNaN(counter)){
      counter = 0;
    }
    counter++;
    window.localStorage.feelingBadCounter = counter;
  }

  self.saveFeelingSoSoCounter = function(){
    var counter = window.localStorage['feelingSoSoCounter'];
    if (isNaN(counter)){
      counter = 0;
    }
    counter++;
    window.localStorage.feelingSoSoCounter = counter;
  }

  self.getFeelingsCounter = function(){

    var good = window.localStorage['feelingGoodCounter'];
    var bad = window.localStorage['feelingBadCounter'];
    var soso =  window.localStorage['feelingSoSoCounter'];

    good = transformToNumber(good);
    bad = transformToNumber(bad);
    soso = transformToNumber(soso);

    return {
      'good': good,
      'not-so-bad': soso,
      'not-so-good': bad
    };
  }

  self.calculateAverageMood = function(){
    var feelings = self.getFeelingsCounter();
    var total = feelings['good'] + feelings['not-so-bad'] + feelings['not-so-good'];

    var canBeCalculated = total > 0;
    if (!canBeCalculated){
        return {good: 0, notSoBad: 0, notSoGood: 0, averageMood:''};
    }

    var values = {};
    values.good = Math.round(feelings['good'] * 100 / total);
    values.notSoBad = Math.round(feelings['not-so-bad'] * 100 / total);
    values.notSoGood = 100 - values.good - values.notSoBad;
    values.averageMood = getMax(feelings);

    return values;
  }

  var getMax = function(feelings){
    return feelings['good'] > feelings['not-so-bad'] && feelings['good'] > feelings['not-so-good']
    ? "Good" : (feelings['not-so-bad'] > feelings['good'] && feelings['not-so-bad'] > feelings['not-so-good'] ? "So-So" : "Bad");
  }


  var transformToNumber = function(numberAsString){
    if (isNaN(numberAsString)){
      numberAsString = 0;
    } else {
      numberAsString = parseInt(numberAsString);
    }
    return numberAsString;
  }
  // end
  var getMindfulnessFinished = function(){
    var sessions = angular.fromJson(window.localStorage['mindfulnessUserData']);
    if (sessions) {
      var lastSession = sessions[sessions.length - 1];
      return lastSession.day == 56;
    }
    return false;
  }

  var getStressProclivityResults = function(){
    return angular.fromJson(window.localStorage["stress"]) || null;
  };

  var getChatHelpedUser = function(){
    return angular.fromJson(window.localStorage['helped']) || null;
  };

  var getChatReceivedHelp = function(){
    return angular.fromJson(window.localStorage['helper']) || null;
  };

  var getShareStatus = function(){
    return angular.fromJson(window.localStorage['share']) || null;
  };

  var getTechnicsDone = function(){
    return angular.fromJson(window.localStorage['technics']) || null;
  };

  var getHistory = function(){
    return angular.fromJson(window.localStorage['lastMoodOfTheDay']) || null;
  };

  return self;
});

'use strict';

angular.module('promoodApp')

.factory('FeelingService', function ($http, $window, $q, $rootScope, PersonalityService, $cordovaFile) {
  var self = {};

  self.getPathology = function(pathology) {
    return $http.get('data/en/pathologies/' + pathology + '.json')
    .then(function(response) {
      var biorhythm = PersonalityService.getBiorhythmSign(),
      state = PersonalityService.getState();

      return response.data[state][biorhythm.emotional][biorhythm.intellectual][biorhythm.physical];
    });
  };

  self.getPathologyReplays = function(mood, pathology){
    var deffered = $q.defer();

    var replays = 0;
    var moodHistory = angular.fromJson(window.localStorage['lastMoodOfTheDay']).reverse();
    if (moodHistory == undefined || moodHistory.length == 0){
      defeered.resolve(0)
    } else {

      var moodCounter = 0;
      var lastMood = moodHistory[moodCounter];
      var currentMood = moodHistory[moodCounter];

      var ignore = false;
      for (var i = 1; i < moodHistory.length; i++){
        var currentMood = moodHistory[i];
        if (lastMood.pathology == currentMood.pathology && !ignore){
          replays++;
        } else {
          var ignore = true;
        }
        lastMood = currentMood;
      }
    }
    
    console.log("replay count after: " + replays);

      
    deffered.resolve(replays);
    return deffered.promise;
  };

  self.getFeeling = function(mood) {
    return angular.fromJson(window.localStorage[mood]) || [];
  };

  self.getFeelingHistory = function(){
    return angular.fromJson(window.localStorage['history']) || [];
  };

  // Method has to be rafactored.
  self.saveFeeling = function(mood, data) {

    var demo = true;
    var pathologyToSave = data.pathology || mood;

    // For production:
    //var dateToSave = self.getMoment();
    // For demo:
    var dateToSave = moment();

    var feelings = self.getFeeling('lastMoodOfTheDay');
    if (feelings == undefined){
      feelings = [];
    }
    var dayFeeling = _.where(feelings, {date:dateToSave});
    if (dayFeeling.length > 0){
      dayFeeling[0].pathology = pathologyToSave;
    } else {
      if (feelings.length > 61){
        feelings.shift();
      }
      feelings.push({date: dateToSave, pathology: pathologyToSave});
    }

    // saving last mood of the day for detecting same pathologies
    window.localStorage['lastMoodOfTheDay'] = angular.toJson(feelings);

    // saving good moood for showing as strenght
    if (mood === 'good'){

      var goodCompleteHistory = self.getFeeling('completeGoodHistory');

      if (goodCompleteHistory.length > 9) {
        goodCompleteHistory.shift();
      }
      goodCompleteHistory.push(data);
      window.localStorage['completeGoodHistory'] = angular.toJson(goodCompleteHistory);
    }
  };

  self.getGoals = function(){
    return angular.fromJson(window.localStorage['goals']) || [];
  };

  self.saveGoals = function(technic){
    var goals = self.getGoals();
    goals.push(technic);
    window.localStorage['goals'] = angular.toJson(goals);
  };

  self.removeGoal = function(index){
    var goals = self.getGoals();
    var newGoals = _.without(goals, goals[index]);
    window.localStorage['goals'] = angular.toJson(newGoals);
  };

// PHOTO PROFILE START
  var fileEntryScope = {};
  self.getPhotoProfile = function(){
    console.log('getPhotoProfile1');

    var profileUrl = window.localStorage['profile'];
    console.log('getPhotoProfile1.1: profile from localstorage ' + profileUrl);

    if (profileUrl){
      //var profile = angular.fromJson(profileUrl);
      //console.log('getPhotoProfile2');
      //console.log('getPhotoProfile3 accesing photo profile:' + profile);
      return cordova.file.documentsDirectory + profileUrl;
    } else {
      console.log('profileURL is undifined');
      return null;
    }

    
  };
  /*var onMovingFileSuccess = function(data){
    console.log('moving file success: ' + data.toURL());
    var filname = data.toURL().replace(/^.*[\\\/]/, '');
    $rootScope.photoFinalURL = filname;//data.toInternalURL();procommented this
    console.log('feelings $rootScope.photoFinalURL: ' + $rootScope.photoFinalURL);

    if ($rootScope.isProfilePhoto) {
      $rootScope.saveProfilePhotoToDataStorageAndShow($rootScope.photoFinalURL);
    } else {
      $rootScope.saveGoodPhotoToDataStorageAndShow($rootScope.photoFinalURL);
    }
  }
  var onMovingFileError = function(error){
    console.log('moving file error: ' + error);
  }
  var onGettingFinalDirSuccess = function(dirEntry){
    console.log('file entry to move: ' + fileEntryScope.fullPath);
    console.log('success getting final directory: ' + dirEntry.fullPath);
    fileEntryScope.copyTo(dirEntry, $rootScope.photoName, onMovingFileSuccess, onMovingFileError);//changed from moveTo to copyTo
  }
  var onGettingFinalDirError = function(error){
    console.log('Error getting final directory: ' + error);
  }*/
  var onSuccessGettingFile = function(fileEntry){
    console.log('success geting file:' + fileEntry.fullPath);
    fileEntryScope = fileEntry;
    /*requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
      alert('got the fs: ' + fs);
      fs.root.getDirectory("ProMoodData", {create: true}, onGettingFinalDirSuccess, onGettingFinalDirError);
    }, function(error){
      console.log('error getting fs')
    });*/

    //FeelingsService
    var name = fileEntry.fullPath.substring(fileEntry.fullPath.lastIndexOf('/')+1);
    
    $cordovaFile.moveFile(cordova.file.tempDirectory, name, cordova.file.documentsDirectory, $rootScope.photoName)
      .then(function (success) {
        // success
        console.log(cordova.file.documentsDirectory + $rootScope.photoName);
        $rootScope.photoFinalURL = $rootScope.photoName;//data.toInternalURL();procommented this
        console.log('feelings $rootScope.photoFinalURL: ' + $rootScope.photoFinalURL);

        if ($rootScope.isProfilePhoto) {
          $rootScope.saveProfilePhotoToDataStorageAndShow($rootScope.photoFinalURL);
        } else {
          $rootScope.saveGoodPhotoToDataStorageAndShow($rootScope.photoFinalURL);
        }
      }, function (error) {
        // error
        alert('moving file FeelingService');
      });
  }
  var onErrorGettingFile = function(error){
    console.log('error getting file: ' + error);
  }
  self.savePhotoProfile = function (photo){
    console.log('url received from camera: ' + photo);
    $rootScope.photoName = (new Date()).getTime() + 'profilePhoto.jpg';
    $rootScope.isProfilePhoto = true;
    if (typeof cordova !== 'undefined'){
      resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
    }
  };
// END PHOTO PROFILE

// SAVE PHOTO GOOD
  self.savePhotoGood = function (photo){
    console.log('url received from camera: ' + photo);
    $rootScope.photoName = ((new Date()).getTime())+'good.jpg';
    $rootScope.isProfilePhoto = false;
    if (typeof cordova !== 'undefined'){
      resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
    }
  };
// END SAVE GOOD


  self.getMoment = function () {
    return moment().format('DD-MM-YYYY');
  }

  self.swipeRightPathology = function(patologyStateName, patologyDescriptionStateName, scope, rootScope, selected) {
    if (rootScope.stateStatus.currentState === patologyStateName) {
      var pathologySelectedName = selected.pop();
      scope.levelCount--;
      if (scope.levelCount >= 0) {
        scope.level = scope.getLevel();
        scope.pathologySelected = scope.level.options
        .indexOf(pathologySelectedName);
      } else {
        rootScope.onSwipeRight();
      }
    } else if (rootScope.stateStatus.currentState === patologyDescriptionStateName) {
      //do nothing
    } else {
      rootScope.onSwipeRight();
    }
  }

  return self;
});

'use strict';

angular.module('promoodApp')

.factory('PersonalityService', function ($http, UserService) {
  var self = {};

  var getBirthDate = function() {
    var birthDate = new Date(UserService.getPersonal().date);

    return new Date(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate());
  };

  var getBirthDays = function() {
    return (new Date() - getBirthDate()) / (1000 * 60 * 60 * 24);
  };

  self.getQuestions = function() {
    return $http.get('data/en/personality-test.json')
      .then(function(response) {
        return response.data.questions;
      });
  };

  self.getPersonalityDescription = function(personality){
    return $http.get('data/en/personality-test.json')
    .then(function(response) {
      return response.data[personality];
    });
  }

  self.getAnswers = function(answers) {
    return angular.fromJson(window.localStorage.answers) || [];
  };

  self.saveAnswers = function(answers) {
    window.localStorage.answers = angular.toJson(answers);
  };

  self.resolveTest = function() {
    var answers = self.getAnswers();
    console.log(answers);

    $http.get('data/en/personality-test.json')
      .then(function(response) {
        console.log(response.data);
        var data = response.data,
            state = "",
            states,
            statesCounter,
            questions,
            max,
            maxIndex;

        for(var i = 0; i < data.state.length; i++) {
          states = data.state[i];
          statesCounter = [];

          for(var j = 0; j < states.length; j++) {
            questions = data[states[j]];
            statesCounter[j] = 0;

            for(var k = 0; k < questions.length; k++) {
              statesCounter[j] += answers[questions[k] - 1] ? 1 : 0;
            }
          }
          console.log(statesCounter);
          max = Math.max.apply(null, statesCounter);
          maxIndex = statesCounter.indexOf(max);
          state += states[maxIndex];
        }

        self.getPersonalityDescription(state)
          .then(function(result){
            self.savePersonalityInfo(result);
          });

        self.saveState(state);
      });
  };

  self.getState = function() {
    return window.localStorage.state;
  };

  self.savePersonalityInfo = function(info){
    var personalTestInfoAsJson = angular.toJson(info);
    window.localStorage.personalityInfo = personalTestInfoAsJson;
  }

  self.saveState = function(state) {
    window.localStorage.state = state;
  };

  self.getPersonalInfo = function(){
    return angular.fromJson(window.localStorage["personalityInfo"]) || null;
  }

  self.getBiorhythm = function() {
    var days = getBirthDays(),
        k = 2 * Math.PI * days;

    return {
      physical: Math.sin( k / 23 ),
      emotional: Math.sin( k / 28 ),
      intellectual: Math.sin( k / 33 )
    };
  };

  self.getBiorhythmSign = function() {
    var biorhythm = self.getBiorhythm();

    return {
      physical: biorhythm.physical >= 0 ? 'P' : 'N',
      emotional: biorhythm.emotional >= 0 ? 'P' : 'N',
      intellectual: biorhythm.intellectual >= 0 ? 'P' : 'N'
    };
  };

  self.getStressProclivityTest = function(){
    return $http.get('data/en/stress-test.json')
    .then(function(response) {
      return response.data.questions;
    });
  };

  self.saveStressProclivityResults = function(result){
    window.localStorage["stress"] = angular.toJson(result);
  };

  self.saveLonelinessTestResults = function(result){
    window.localStorage["loneliness"] = angular.toJson(result);
  };

  self.getStressProclivityResults = function(){
    return angular.fromJson(window.localStorage["stress"]) || null;
  }

  self.getLonelinessTestResults = function(){
    return angular.fromJson(window.localStorage["loneliness"]) || null;
  }

  self.getLonelinessTest = function(){
    return $http.get('data/en/loneliness-test.json')
    .then(function(response) {
      return response.data;
    });
  };

  return self;
});

'use strict';

angular.module('promoodApp')

.factory('StateService', function($state, $ionicNavBarDelegate) {
  var self = {};

  self.recordStateChange = function(stateStatus, from, to) {
    var previousAlreadyRecorded = false;
    if (stateStatus.previousState.length > 0) {
      var stateIndex = stateStatus.previousState.indexOf(to.name)
      if (stateIndex >= 0) {
        //if the new state is already recorded, the following states are removed to avoid loops 
        stateStatus.previousState = stateStatus.previousState.slice(0,
            stateIndex);
        previousAlreadyRecorded = true;
      }
    }

    if (!previousAlreadyRecorded) {
      stateStatus.previousState.push(from.name);
    }
    stateStatus.currentState = to.name;

    if (stateStatus.returningToPreviousState) {
      stateStatus.previousState.pop();
      stateStatus.returningToPreviousState = false;
    }
    console.log('Previous state:' + stateStatus.previousState);
    console.log('Current state:' + stateStatus.currentState);
  };
  
  self.returnToPreviousState = function(stateStatus) {
    var previousState=stateStatus.previousState.pop();
    if (previousState) {
      $state.go(previousState);
      stateStatus.returningToPreviousState = true;
    } else {
      $ionicNavBarDelegate.back();
    }
  };

  return self;
});

'use strict';

angular.module('promoodApp')

.factory('GoalsService', function ($http) {
  var self = {};

  self.getTechnics = function() {
    return $http.get('data/technics.json')
      .then(function(response) {
        return response.data.technics;
      });
  };

  self.doneTechnic = function(technic){
    var doneTechnics = angular.fromJson(window.localStorage['technics']) || [];
    doneTechnics.push(technic);
    window.localStorage['technics'] = angular.toJson(doneTechnics);
  };

  return self;
});

'use strict';

angular.module('promoodApp')

.factory('ChatService', function ($http) {
  var self = {};

  self.getChatUser = function() {
    return angular.fromJson(window.localStorage['chatUser']) || null;
  };

  self.saveChatUser = function(chatId) {
    window.localStorage['chatUser'] = angular.toJson(chatId);
  };
    
  self.saveAcceptedTerms = function() {
    window.localStorage['chatAcceptedTerms'] = angular.toJson(true);
  };
    
  self.hasAcceptedTerms = function(){
    return window.localStorage['chatAcceptedTerms'] ? true : false;
  }

  self.createChatUser = function(){
    var data = {user:moment().milliseconds()};
    
    /*if (window.device){
        data = {user:moment().milliseconds(), 
               version:window.device.version,
               model:window.device.model,
               platform:window.device.platform};
    }*/
      
    return $http.post('http://' + window.server_url + ':' + window.http_port + '/api/Users/', data);
  };

  self.updateChatUser = function(user){

    var userToUpdate = {Id: user.Id, FriendOf: []};
    return $http.put('http://' + window.server_url + ':' + window.http_port + '/api/Users/', userToUpdate);
  };

  self.saveChatHelpedUser = function(){
    window.localStorage['helper'] = angular.toJson(true);
  };

  self.saveChatReceivedHelp = function(){
    window.localStorage['helped'] = angular.toJson(true);
  };

  self.savePrivacy = function(privacy){
    window.localStorage['privacy'] = angular.toJson(privacy);
  };

  self.getPrivacy = function(){
    return angular.fromJson(window.localStorage['privacy']) || {};
  };

  return self;
});

'use strict';

angular.module('promoodApp')

.factory('TrainingsService', function ($http, $sce, $location, $rootScope, ngAudio, $cordovaFile) {
  var self = {};

  self.getMindfulnessData = function() {
    return $http.get('data/mindfulness/mindfulness.json')
      .then(function(response) {
        return response.data.mindfulness;
      });
  };

  self.doneMindfulness = function(scope){
    var mindfulnessUserData = angular.fromJson(window.localStorage['mindfulnessUserData']) || [];

    var lastTimePlayedIsToday = self.lastTimePlayedIsToday(mindfulnessUserData);
    if(!lastTimePlayedIsToday) {

      var played = {day: scope.data.currentDayNumber, date: self.newDate()};

      mindfulnessUserData.push(played);
      window.localStorage['mindfulnessUserData'] = angular.toJson(mindfulnessUserData);
    }
  };

  self.lastTimePlayedIsToday = function(mindfulnessUserData) {
    var lastElement = self.getLastTimePlayedInfo(mindfulnessUserData)
    if(!lastElement) {
      return false;
    }
    var lastTimePlayed = self.newDate(lastElement.date);
    return self.isToday(lastTimePlayed);
  }

  self.getLastTimePlayedInfo = function(mindfulnessUserData) {
    if(mindfulnessUserData.length == 0) {
      return null;
    }
    return mindfulnessUserData[mindfulnessUserData.length-1];
  }

  self.isToday = function(date) {
    var today = self.newDate();
    return self.isSameDay(today, date);
  }

  self.isSameDay = function(date1, date2) {

  return date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth()
      && date1.getDate() == date2.getDate();
  }

  self.startMindfulness = function(scope, state, audio, onAudioSuccess, onAudioError, onAudioStatusChange) {
    return self.getMindfulnessUserData(scope, audio, onAudioSuccess, onAudioError, onAudioStatusChange)/*.then(function(results) {
      var userData = results;
    })*/;
  };

  self.getMindfulnessUserData = function(scope, audio, onAudioSuccess, onAudioError, onAudioStatusChange) {
    var mindfulnessUserData = angular.fromJson(window.localStorage['mindfulnessUserData']);
    var userData = {};

    return self.getMindfulnessData().then(function(result) {

      var mindfulnessData = result;
      userData.currentDayNumber = self.calculateCurrentDayNumber(mindfulnessUserData, mindfulnessData.last);

      var templateSelector = self.chooseCurrentTemplateSelector();

      //choose morning or afternoon
//      templateSelector = 'morning';
//    templateSelector = 'afternoon';

      //choose day number from 1 to 56
//      userData.currentDayNumber = 56;

      var songId = null;
      if(mindfulnessData.first === userData.currentDayNumber) {
        songId = "first";
      } else if(mindfulnessData.last === userData.currentDayNumber) {
        songId = "last";
      } else {
        songId = ((userData.currentDayNumber + 1) % 3) + 2; //generates 2, 3, or 4 (looping)
      }

      var song = mindfulnessData.songs[songId];
      var template = null;
      if(templateSelector == 'morning') {
        template = song.morningSong;
      } else {
        template = song.afternoonSong;
      }
      var url = $location.absUrl();
      url = url.substring(0, url.indexOf($location.path()) - 1)
      userData.currentSong = url + template;
      userData.mindfulness = {url: userData.currentSong};
      scope.mindfulness = {url: template};

      console.log('url '+template);

      var name=template.substr(template.lastIndexOf('/') + 1);
      //scope.audio = audio.load(cordova.file.documentsDirectory+'Trainings/Mindfulness/'+name);
         
        
      //console.log(scope.audio);
      /*if (window.plugins && window.plugins.streamingMedia){
        scope.audio = new Media(template, onAudioSuccess, onAudioError, onAudioStatusChange);
        //procomment added below
      }*/
      scope.data = userData;
      scope.mindfulnessAudioUrl = cordova.file.documentsDirectory+'Trainings/Mindfulness/'+name;//template;//prouncommented this
    })
  }

  self.chooseCurrentTemplateSelector = function() {

    var time = self.newDate();

    var todayTimeForuteen = self.newDate();
    todayTimeForuteen.setHours(14);
    todayTimeForuteen.setMinutes(0);
    todayTimeForuteen.setSeconds(0);

    var yesterdayTimeTwo = self.newDate();
    yesterdayTimeTwo.setHours(2);
    yesterdayTimeTwo.setMinutes(0);
    yesterdayTimeTwo.setSeconds(0);
    yesterdayTimeTwo.setDate (yesterdayTimeTwo.getDate() -1);

    console.log('todayTimeForuteen: ' + todayTimeForuteen);
    console.log('yesterdayTimeTwo: ' + yesterdayTimeTwo);


    if(time.getTime() >  yesterdayTimeTwo.getTime() && time.getTime() <  todayTimeForuteen.getTime()) {
      return 'morning';
    } else {
      return 'afternoon';
    }
  }

  self.calculateCurrentDayNumber = function(mindfulnessUserData, last) {
    //if there is no data, is first date
    if(!mindfulnessUserData || mindfulnessUserData.length == 0) {
      return 1;
    }

    var lastTimePlayedInfo = self.getLastTimePlayedInfo(mindfulnessUserData)

    var isToday = self.isToday(self.newDate(lastTimePlayedInfo.date));

    if(isToday) {
      return lastTimePlayedInfo.day;
    } else {
      var currentDayNumber = lastTimePlayedInfo.day + 1;
      //if there are no more days to listen, starts over
      if(currentDayNumber > last) {

        //we clean previous data
        window.localStorage['mindfulnessUserData'] = angular.toJson([]);

        //and return to the begining
        currentDayNumber = 1;
      }
      window.localStorage['mindfulnessCurrentDayNumber'] = currentDayNumber;
      return currentDayNumber;
    }
  };

  self.getCurrentDayNumber = function(){
    var currentDayNumber = window.localStorage.mindfulnessCurrentDayNumber;
    if (currentDayNumber){
      return currentDayNumber;
    } else {
      return 1;
    }
  }

  self.newDate = function(param){
    if(!param) {
      return new Date();
    }
    return new Date(param);
  }


  return self;
});

'use strict';

angular.module('promoodApp').service('CalendarService', function ($http) {

  var eventsToAdd = [];
  var calendarName = "ProMood";

  var getDateFromStringPlus = function (dateAsString, plus) {

    if (dateAsString instanceof Date) {
      return dateAsString;
    }
    var parsedDate = null;
    if (dateAsString.search("-") > -1) {
      parsedDate = dateAsString.split("-");
    }
    if (dateAsString.search("/") > -1) {
      parsedDate = dateAsString.split("/");
    }
    if (parsedDate && parsedDate.length >= 3) {
      //console.log(parsedDate[1].valueOf());
      //console.log(parseInt(parsedDate[2].valueOf()));
      var dateAsDate = getDateFromString(dateAsString);
      var day = dateAsDate.getDate();
      day = day + plus;
      dateAsDate.setDate(day);
      return new Date(dateAsDate.getFullYear(), dateAsDate.getMonth(), dateAsDate.getDate(), 0, 0, 0, 0, 0);
      //return dateAsDate.setDate(day);
    }
    return parsedDate;
  };

  var getDateFromString = function (dateAsString) {
    if (dateAsString instanceof Date) {
      return dateAsString;
    }
    if (dateAsString.search("-") > -1) {
      var parsedDate = dateAsString.split("-");
      if (parsedDate.length >= 3) {
        return new Date(parsedDate[0], parsedDate[1].valueOf() - 1, parsedDate[2], 0, 0, 0, 0, 0);
      }
    }
    return null;
  };

  var createEventInCalendar = function (dataRecived) {
    //console.log("Success: " + JSON.stringify(message));
    //console.log("createEventInCalendar eventTitle: " + dataRecived.eventTitle);
    //window.plugins.calendar.createEventInNamedCalendar(dataRecived.eventTitle, dataRecived.location, dataRecived.notes, dataRecived.realStartDate, dataRecived.realEndDate, calendarName, dataRecived.callOptions, success, error);
    var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
    calOptions.calendarName =  calendarName;
    window.plugins.calendar.createEventWithOptions(dataRecived.eventTitle, dataRecived.location, dataRecived.notes, dataRecived.realStartDate, dataRecived.realEndDate, calOptions, success, error);
  };

  var success = function (message) {
    //console.log("Success: " + JSON.stringify(message));
  };

  var error = function (message) {
    //console.log("Error: " + JSON.stringify(message));
  };

  var index;
  var successCreateCalendar = function (message) {
    console.log("Success creating calendar: " + JSON.stringify(message));
    for	(index = 0; index < eventsToAdd.length; index++) {
      createEventInCalendar(eventsToAdd[index]);// fruits[index];
    }
  };

  var errorCreateCalendar = function (message) {
    //console.log("Error: " + JSON.stringify(message));
  };

  /*var listCalendarsSuccess = function (dataRecived) {
    //console.log("listCalendarsSuccess eventTitle: " + dataRecived.eventTitle);
    //console.log("listCalendarsSuccess: " + JSON.stringify(message));
    //console.log (JSON.parse(message));
    //currentCalendars = window.plugins.calendar.listCalendars(success, error);
    //var proMoodCalendarAlreadyExists = _.where(currentCalendars, calendarName) > 0;
    //if (!proMoodCalendarAlreadyExists) {
    window.plugins.calendar.createCalendar(calendarName, createEventInCalendar(dataRecived), error);

    //} else {
      //createEventInCalendar(dataRecived);
   // }
  };*/

  this.clearEventsArray = function () {
    eventsToAdd = [];
  };

  this.pushEventToBeAdded = function (startDate, endDate, eventTitle, location, notes, callOptions) {
    var dataRecived = {};
    dataRecived.realStartDate = getDateFromString(startDate);

    dataRecived.eventTitle = eventTitle;
    dataRecived.location = location;
    dataRecived.notes = notes;
    dataRecived.callOptions = callOptions;

    if (endDate === '') {
      // all day event
      dataRecived.realEndDate = getDateFromStringPlus(startDate, 1);
    } else {
      dataRecived.realEndDate = getDateFromString(endDate);
    }
    eventsToAdd.push(dataRecived);
  };

  this.addEventsToCalendar = function ()
  {
    if (window.plugins && window.plugins.calendar) {
      window.plugins.calendar.createCalendar(calendarName, successCreateCalendar, errorCreateCalendar);
    }
  };

  /*this.addEventToCalendar = function (startDate, endDate, eventTitle, location, notes, callOptions) {

    var dataRecived = {};
    dataRecived.realStartDate = getDateFromString(startDate);

    dataRecived.eventTitle = eventTitle;
    dataRecived.location = location;
    dataRecived.notes = notes;
    dataRecived.callOptions = callOptions;

    if (endDate === '') {
      // all day event
      dataRecived.realEndDate = getDateFromStringPlus(startDate, 1);
    } else {
      dataRecived.realEndDate = getDateFromString(endDate);
    }

    //console.log("startDate: " + dataRecived.realStartDate);
    //console.log("realEndDate: " + dataRecived.realEndDate);

    if (window.plugins && window.plugins.calendar) {
      //currentCalendars = window.plugins.calendar.listCalendars();
      window.plugins.calendar.createCalendar(calendarName, createEventInCalendar(dataRecived), error);
      //createEventInCalendar(dataRecived);
    }
  };*/
});

/**
 * Created by jcenturion on 3/3/15.
 */
'use strict';

angular.module('promoodApp').service('NotificationsService',
  ['$http', function ($http) {
    var notificationsCheckboxValue = false, localNotifGoalsCreated = false, localNotifInactiveUserCreated = false;

    this.getLocalNotifInactiveUserCreated = function () {
      return localNotifInactiveUserCreated;
    };
    this.setLocalNotifInactiveUserCreated = function (value ) {
      localNotifInactiveUserCreated = value;
    };

    this.getNotificationsEnableValue = function () {
      //console.log("getNotificationsEnableValue function");
      notificationsCheckboxValue = angular.fromJson(window.localStorage['notificationsCheckboxValue']);
      return notificationsCheckboxValue;
    };

    this.setNotificationsEnableValue = function (value) {
      //console.log("setNotificationsEnableValue function with value=" + value);
      notificationsCheckboxValue = value;
      window.localStorage['notificationsCheckboxValue'] = angular.toJson(notificationsCheckboxValue);
    };

    this.getLocalNotifGoalsCreatedValue = function () {
      return localNotifGoalsCreated;
    };
    this.setLocalNotifGoalsCreatedValue = function (value) {
      localNotifInactiveUserCreated = value;
    };

    this.createLocalNotificationInactiveUser = function () {
      localNotifInactiveUserCreated = true;
      var date = getNowPlusDays(7);
      //var date = $scope.getNowPlusTest();
      var userName = angular.fromJson(window.localStorage.personal).name;
      var message = "Hi "+ userName +"! It's been a long time, how are you feeling today?";
      createLocalNotification(date, message, 0);
    };

    this.createLocalNotificationGoals = function () {
      localNotifInactiveUserCreated = true;
      var date = getNowPlus12Hours();
      //var date = getNowPlus1Min();
      var userName = angular.fromJson(window.localStorage.personal).name;
      var message = "Hi "+ userName +"! Remember that you have pending goals!";
      createLocalNotification(date, message, 1);
    }

    var createLocalNotification = function(date, message, notificationID){
      window.plugin.notification.local.schedule({ //procomment changed from add to schedule
        id:         notificationID,  // A unique id of the notification
        at:       date,    // This expects a date object
        text:    message,
        badge:      0,
        title: 'ProMood Notification'
        //autoCancel: true // Setting this flag and the notification is automatically cancelled when the user clicks it
      });
    }

    var getNowPlus10Sec= function () {
      return new Date(new Date().getTime() + 10 * 1000);
    };

    var getNowPlus1Min= function () {
      return new Date(new Date().getTime() + 60 * 1000);
    };

    var getNowPlus12Hours= function () {
      return new Date(new Date().getTime() +  1000*60*60*12);
    };

    //every 1 hour
    var getNowPlusTest= function () {
      return new Date(new Date().getTime() + 60*1000 * 60 *5);
    };

    var getNowPlusDays= function (days) {
      return new Date(new Date().getTime() + 1000*60*60*24/*this is one day*/ * days);
    };
  }]
);

'use strict';


angular.module('promoodApp').service('CameraService',
    ['$http', '$window', '$q', '$rootScope', function ($http, $window, $q, $rootScope) {
        var photo;
        var photoName;
        var isProfilePhoto;
        var photoFinalURL;

        this.takePhotography = function(onPhotoURISuccess, onPhotoURIFail) {
            if(navigator.camera) {
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
            }
        };

        // PHOTO PROFILE START
        var fileEntryScope = {};
        this.getPhotoProfileURL = function(){
            //console.log(cordova.file.dataDirectory);
            console.log('getPhotoProfile1');

            //var profileUrl = angular.fromJson( window.localStorage['profile'] );
            var profileUrl = window.localStorage['profile'];
            console.log('getPhotoProfile1.1: profile from localstorage ' + profileUrl);

            if (profileUrl){
                /*var profile = angular.fromJson(profileUrl);
                 console.log('getPhotoProfile3 accesing photo profile:' + profile);*/
                return profileUrl;
            } else {
                console.log('profileURL is undifined');
            }
            return null;
        };

        this.savePhotoProfile = function (photo, _photoName, _isProfilePhoto){
            console.log('url received from camera: ' + photo);
            photoName = (new Date()).getTime() + _photoName;//profilePhoto.jpg;
            isProfilePhoto = _isProfilePhoto;//true;
            if (typeof cordova !== 'undefined'){
                resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
            }
        };

        var onSuccessGettingFile = function(fileEntry){
            console.log('success geting file:' + fileEntry.fullPath);
            fileEntryScope = fileEntry;
            requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
                //console.log('got the fs: ' + fs);
                fs.root.getDirectory("ProMoodData", {create: true}, onGettingFinalDirSuccess, onGettingFinalDirError);
            }, function(error){
                //console.log('error getting fs')
            });
        }

        var onErrorGettingFile = function(error){
            console.log('error getting file: ' + error);
        }

        var onGettingFinalDirSuccess = function(dirEntry){
            console.log('file entry to move: ' + fileEntryScope.fullPath);
            console.log('success getting final directory: ' + dirEntry.fullPath);
            fileEntryScope.moveTo(dirEntry, photoName, onMovingFileSuccess, onMovingFileError);
        }
        var onGettingFinalDirError = function(error){
            console.log('Error getting final directory: ' + error);
        }

        var onMovingFileSuccess = function(data){
            console.log('moving file success: ' + data.toURL());
            photoFinalURL = data.toURL();
            console.log('feelings this.photoFinalURL: ' + photoFinalURL);

            if (isProfilePhoto) {
                $rootScope.saveProfilePhotoToDataStorageAndShow(photoFinalURL);
            } else {
                $rootScope.saveGoodPhotoToDataStorageAndShow(photoFinalURL);
            }
        }
        var onMovingFileError = function(error){
            console.log('moving file error: ' + error);
        }

        this.getPhotoFinaUrl = function (){
            return photoFinalURL;
        };

        this.savePhotoGood = function (photo){
            console.log('url received from camera: ' + photo);
            photoName = ((new Date()).getTime())+'good.jpg';
            isProfilePhoto = false;
            if (typeof cordova !== 'undefined'){
                resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
            }
        };
// END PHOTO PROFILE



    }]
);

'use strict';

angular.module('promoodApp').directive('dir', function($compile, $parse) {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      scope.$watch(attr.content, function() {
        console.log(attr.content);
        element.html($parse(attr.content)(scope));
        $compile(element.contents())(scope);
      }, true);
    }
  }
})

'use strict';

angular.module('promoodApp').
directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
       ngModel: '=', // Bind the ngModel to the object given
    },
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model
      
      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };
      
      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read(); // initialize
        
      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if (html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  }
}])


angular.module('promoodApp')
.directive('onLastRepeat', function($parse) {
  return function(scope, element, attrs) {
    if (parseInt(attrs.onLastRepeat) && parseInt(attrs.onLastRepeat) > 0) {
      return;
    }
    if (scope.$last) setTimeout(function(){
      scope.$emit('onRepeatLast', element, attrs);
    }, 1);
  };
})

'use strict';

angular.module('promoodApp')
.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    if (isNaN(millseconds)){
      return '';
    }
    var milli = parseFloat(Math.round(millseconds * 100) / 100).toFixed(0);
    if (milli == 'NaN'){
      return '';
    }
    var seconds = (milli % 60).toFixed(0);
    var minutes = Math.floor(milli / 60);
    var timeString = '';
    timeString = minutes + ':' + (seconds <= 9 ? ('0' + seconds) : seconds);
    return timeString;
  }
});
