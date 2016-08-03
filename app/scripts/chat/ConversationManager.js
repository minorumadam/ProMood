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
