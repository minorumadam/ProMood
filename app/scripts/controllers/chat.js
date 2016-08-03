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