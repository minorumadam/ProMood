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
